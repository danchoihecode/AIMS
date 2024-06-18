package com.springboot.service;

import com.springboot.common.Constant;
import com.springboot.exception.cart.CartNotFoundException;
import com.springboot.exception.order.InvalidDeliveryInfoException;
import com.springboot.model.dto.ShippingFeeDTO;
import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.DeliveryInfo;
import com.springboot.model.entity.Order;
import com.springboot.repository.CartProductRepository;
import com.springboot.repository.CartRepository;
import com.springboot.repository.DeliveryInfoRepository;
import com.springboot.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DeliveryService {
    @Autowired
    CartService cartService;
    @Autowired
    OrderService orderService;
    @Autowired
    DeliveryInfoRepository deliveryInfoRepository;

    public ShippingFeeDTO getShippingFee(Long cartId, String province, boolean isRushDelivery) {
        cartService.getCartById(cartId);
        List<CartProduct> cartProducts = cartService.getAllProductsInCart(cartId);
        List<CartProduct> rushDeliveryProducts = getRushDeliveryProducts(cartProducts);
        boolean isRushSupported = Arrays.stream(Constant.RUSH_SUPPORTED_PROVINCES).anyMatch(p -> p.equals(province)) && !rushDeliveryProducts.isEmpty();

        if (!isRushDelivery || !isRushSupported) {
            double normalShippingFee = calculateShippingFee(cartProducts, province, false);
            return new ShippingFeeDTO(normalShippingFee, 0, false);
        }

        List<CartProduct> normalDeliveryProducts = getNonRushDeliveryProducts(cartProducts);
        double normalShippingFee = calculateShippingFee(normalDeliveryProducts, province, false);
        double rushShippingFee = calculateShippingFee(rushDeliveryProducts, province, true);
        return new ShippingFeeDTO(normalShippingFee, rushShippingFee, true);

    }
    public Order saveDeliveryInfo(Long cartId, ShippingFeeDTO shippingFee, DeliveryInfo deliveryInfo) {
        Cart cart = cartService.getCartById(cartId);
        if (!deliveryInfo.isValid(shippingFee.isRushDeliveryAvailable())) throw new InvalidDeliveryInfoException("Invalid delivery information");
        deliveryInfoRepository.save(deliveryInfo);
        return orderService.createOrder(new Order(cart, shippingFee.getNormalShippingFee(), shippingFee.getRushShippingFee(), deliveryInfo));
    }
    private double calculateShippingFee(List<CartProduct> cartProducts, String province, boolean isRush) {
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

    private int getBaseShippingFee(double weight, String province) {
        if (Arrays.stream(Constant.BIG_CITIES).anyMatch(p -> p.equals(province))) {
            if (weight <= 3) return 22000;
            return 22000 + (int) Math.ceil((weight - 3) / 0.5) * 2500;
        }
        if (weight <= 0.5) return 30000;
        return 30000 + (int) Math.ceil((weight - 0.5) / 0.5) * 2500;
    }
}
