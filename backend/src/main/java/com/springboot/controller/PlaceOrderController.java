package com.springboot.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.springboot.common.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.DeliveryInfo;
import com.springboot.model.entity.Order;
import com.springboot.model.response.RushDeliveryCheckResponse;
import com.springboot.service.CartService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/delivery")
public class PlaceOrderController {

    @Autowired
    private PaymentController paymentController;
    private Order order;
    private Double normalShippingFees = 0.0;
    private Double rushShippingFees = 0.0;
    @Autowired
    private CartService cartService;

    @GetMapping("shipping-fee")
    public ResponseEntity<RushDeliveryCheckResponse> checkRushOrder(@RequestParam("cartId") Long cartId,
                                                                    @RequestParam("province") int province, @RequestParam("isRushDelivery") boolean isRushDelivery) {
        try {
            List<CartProduct> cartProducts = cartService.getAllProductsInCart(cartId);
            List<CartProduct> rushDeliveryProducts = getRushDeliveryProducts(cartProducts);
            boolean isRushSupported = Arrays.stream(Constant.RUSH_SUPPORTED_PROVINCES).anyMatch(p -> p == province) && !rushDeliveryProducts.isEmpty();

            if (!isRushDelivery || !isRushSupported) {
                double normalShippingFee = calculateShippingFee(cartProducts, province, false);
                RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(normalShippingFee, 0, false);
                return ResponseEntity.ok(response);
            }

            List<CartProduct> normalDeliveryProducts = getNonRushDeliveryProducts(cartProducts);
            double normalShippingFee = calculateShippingFee(normalDeliveryProducts, province, false);
            double rushShippingFee = calculateShippingFee(rushDeliveryProducts, province, true);
            RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(normalShippingFee,
                    rushShippingFee, true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/cart/delivery/submit")
    public ResponseEntity<String> submitDeliveryForm(@RequestBody Map<String, Object> request) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            Long cartId = Long.valueOf(request.get("cartId").toString());
            Map<String, Object> deliveryFormDTO = (Map<String, Object>) request.get("DeliveryFormDTO");
            String name = deliveryFormDTO.get("name").toString();
            String phone = deliveryFormDTO.get("phone").toString();
            String email = deliveryFormDTO.get("email").toString();
            String address = deliveryFormDTO.get("address").toString();
            Long province = Long.valueOf(deliveryFormDTO.get("province").toString());
            String instructions = deliveryFormDTO.get("note").toString();
            LocalDate date = LocalDate.parse(deliveryFormDTO.get("date").toString(), formatter);
            Boolean isRushDelivery = Boolean.valueOf(deliveryFormDTO.get("isRushDelivery").toString());

            DeliveryInfo deliveryInfo = new DeliveryInfo(name, phone, email, province, instructions, address, date,
                    isRushDelivery);

            if (!deliveryInfo.isValid()) {
                return ResponseEntity.status(404).body("Invalid delivery information");
            }

            Cart cart = cartService.findById(cartId);
            this.order = new Order(cart, this.normalShippingFees, this.rushShippingFees, deliveryInfo);
            paymentController.payOrder(order);

            return ResponseEntity.ok("Order created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body("Failed to create order");
        }
    }
    private double calculateShippingFee(List<CartProduct> cartProducts, int province, boolean isRush) {
        int cartTotal = calculateTotalPrice(cartProducts);
        double maxWeight = getMaxWeight(cartProducts);
        int baseShippingFee = getBaseShippingFee(maxWeight, province);
        if (!isRush)
            if (cartTotal > 100000) return Math.max(baseShippingFee - 25000, 0);
            else return baseShippingFee;
        return baseShippingFee + getTotalNumberOfItems(cartProducts) * 10000;
    }
    private int getTotalNumberOfItems(List<CartProduct> cartProducts) {
        return cartProducts.stream().mapToInt(CartProduct::getQty).sum();
    }
    private double getMaxWeight(List<CartProduct> cartProducts) {
        return cartProducts.stream()
                .mapToDouble(cartProduct -> cartProduct.getProduct().getWeight() * cartProduct.getQty()).max()
                .orElse(0.0);
    }

    private int calculateTotalPrice(List<CartProduct> cartProducts) {
        return (int) cartProducts.stream()
                .mapToDouble(cartProduct -> cartProduct.getProduct().getPrice() * cartProduct.getQty()).sum();
    }

    private List<CartProduct> getRushDeliveryProducts(List<CartProduct> cartProducts) {
        return cartProducts.stream().filter(cartProduct -> cartProduct.getProduct().isRushOrderEligible())
                .collect(Collectors.toList());
    }

    private List<CartProduct> getNonRushDeliveryProducts(List<CartProduct> cartProducts) {
        return cartProducts.stream().filter(cartProduct -> !cartProduct.getProduct().isRushOrderEligible())
                .collect(Collectors.toList());
    }

    private int getBaseShippingFee(double weight, int province) {
        if (Arrays.stream(Constant.BIG_CITIES).anyMatch(p -> p == province)) {
            if (weight <= 3) return 22000;
            return 22000 + (int) Math.ceil((weight - 3) / 0.5) * 2500;
        }
        if (weight <= 0.5) return 30000;
        return 30000 + (int) Math.ceil((weight - 0.5) / 0.5) * 2500;
    }
}
