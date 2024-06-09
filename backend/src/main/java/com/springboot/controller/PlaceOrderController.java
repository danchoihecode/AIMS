package com.springboot.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.springboot.common.Constant;
import com.springboot.dto.DeliveryInfoDTO;
import com.springboot.model.entity.DeliveryInfo;
import com.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.Order;
import com.springboot.model.response.RushDeliveryCheckResponse;
import com.springboot.service.CartService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/delivery")
public class PlaceOrderController {
    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;


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

    @PostMapping("")
    public ResponseEntity<Order> submitDeliveryForm(@RequestBody DeliveryInfoDTO deliveryInfoDTO) {
        System.out.println(deliveryInfoDTO);
        try {
            System.out.println(deliveryInfoDTO);
            Cart cart = cartService.getCartByCartId(deliveryInfoDTO.getCartId());
            Order order = new Order(cart, deliveryInfoDTO.getNormalShippingFee(), deliveryInfoDTO.getRushShippingFee(), deliveryInfoDTO.getDeliveryInfo());
            order = orderService.createOrder(order);
            System.out.println(order);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private double calculateShippingFee(List<CartProduct> cartProducts, int province, boolean isRush) {
        if (cartProducts.isEmpty()) return 0;
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
