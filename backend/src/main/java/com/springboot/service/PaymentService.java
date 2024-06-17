package com.springboot.service;

import com.springboot.common.Constant;
import com.springboot.exception.order.InvalidOrderCancellationException;
import com.springboot.exception.order.OrderAlreadyPaidException;
import com.springboot.model.entity.Order;
import com.springboot.model.entity.PaymentTransaction;
import com.springboot.subsystem.PaymentStrategy;
import com.springboot.subsystem.PaymentStrategyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class PaymentService {
    @Autowired
    PaymentStrategyFactory paymentStrategyFactory;
    @Autowired
    private OrderService orderService;
    @Autowired
    private InvoiceService invoiceService;
    public String generatePaymentLink(Long orderId, String paymentMethod) throws IOException {
        Order order = orderService.getOrderById(orderId);
        PaymentStrategy paymentStrategy = paymentStrategyFactory.getPaymentStrategy(paymentMethod);
        if (!order.getState().equals(Constant.ORDER_STATUS_CREATED)) {
            throw new OrderAlreadyPaidException("Order with id " + orderId + " is already paid");
        }
        return paymentStrategy.generateURL(order.getTotalAmount(), "Payment for order " + orderId);
    }
    public void savePaymentResult(Long orderId, String paymentMethod, Map<String, String> paymentResult) throws IOException {
        Order order = orderService.getOrderById(orderId);
        if (!order.getState().equals(Constant.ORDER_STATUS_CREATED)) {
            throw new OrderAlreadyPaidException("Order with id " + orderId + " is already paid");
        }
        PaymentStrategy paymentStrategy = paymentStrategyFactory.getPaymentStrategy(paymentMethod);
        PaymentTransaction paymentTransaction = paymentStrategy.getPaymentTransaction(paymentResult);
        orderService.processPaidOrder(orderId);
        invoiceService.createInvoice(order, paymentTransaction);
    }
    public void refundPayment(Long orderId) throws IOException {
        Order order = orderService.getOrderById(orderId);
        if (!order.getState().equals(Constant.ORDER_STATUS_PENDING)) {
            throw new InvalidOrderCancellationException("Order with id " + orderId + " cannot be canceled");
        }
        orderService.cancelOrder(orderId);
        PaymentTransaction paymentTransaction = invoiceService.getPaymentTransactionByOrderId(orderId);
        PaymentStrategy paymentStrategy = paymentStrategyFactory.getPaymentStrategy(paymentTransaction.getPaymentMethod());
        paymentStrategy.refund(paymentTransaction);
    }
}
