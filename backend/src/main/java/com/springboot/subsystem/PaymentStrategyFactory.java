package com.springboot.subsystem;

import com.springboot.exception.payment.PaymentMethodNotSupportedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class PaymentStrategyFactory {

    private final Map<String, PaymentStrategy> paymentStrategies;

    @Autowired
    public PaymentStrategyFactory(Map<String, PaymentStrategy> paymentStrategies) {
        this.paymentStrategies = paymentStrategies;
    }

    public PaymentStrategy getPaymentStrategy(String paymentMethod) {
        PaymentStrategy strategy = paymentStrategies.get(paymentMethod);
        if (strategy == null) {
            System.out.println("Payment method " + paymentMethod + " is not supported.");
            throw new PaymentMethodNotSupportedException("Payment method " + paymentMethod + " is not supported.");
        }
        return strategy;
    }
}
