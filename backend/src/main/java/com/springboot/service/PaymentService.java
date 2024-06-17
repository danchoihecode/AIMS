package com.springboot.service;

import com.springboot.common.Constant;
import com.springboot.exception.order.OrderAlreadyPaidException;
import com.springboot.exception.order.OrderNotFoundException;
import com.springboot.exception.payment.PaymentMethodNotSupportedException;
import com.springboot.model.entity.Order;
import com.springboot.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class PaymentService {
    @Autowired
    private OrderRepository orderRepository;
    public String generatePaymentLink(Long orderId, String paymentMethod) {
        if (Arrays.asList(Constant.SUPPORTED_PAYMENT_METHODS).contains(paymentMethod)) {
            throw new PaymentMethodNotSupportedException("Payment method " + paymentMethod + " is not supported");
        }
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Order with id " + orderId + " not found"));
        if (order.getState().equals(Constant.ORDER_STATUS_PENDING)) {
            throw new OrderAlreadyPaidException("Order with id " + orderId + " is already paid");
        }



        return "https://payment-gateway.com/payment?orderId=" + orderId + "&paymentMethod=" + paymentMethod;
    }
}
