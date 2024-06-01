package com.springboot.model.request;

public class DeliveryFormRequest {
  private Long orderId;
    private String deliveryAddress;
    private String recipientName;
    private String contactNumber;
    private boolean rushDelivery;
    private String deliveryTime; // For rush delivery
    private String deliveryInstructions; // For rush delivery

    // Getters and setters
    public Long getOrderId() {
      return orderId;
    }

    public void setOrderId(Long orderId) {
      this.orderId = orderId;
    }

    public String getDeliveryAddress() {
      return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
      this.deliveryAddress = deliveryAddress;
    }

    public String getRecipientName() {
      return recipientName;
    }

    public void setRecipientName(String recipientName) {
      this.recipientName = recipientName;
    }

    public String getContactNumber() {
      return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
      this.contactNumber = contactNumber;
    }

    public boolean isRushDelivery() {
      return rushDelivery;
    }

    public void setRushDelivery(boolean rushDelivery) {
      this.rushDelivery = rushDelivery;
    }

    public String getDeliveryTime() {
      return deliveryTime;
    }

    public void setDeliveryTime(String deliveryTime) {
      this.deliveryTime = deliveryTime;
    }

    public String getDeliveryInstructions() {
      return deliveryInstructions;
    }

    public void setDeliveryInstructions(String deliveryInstructions) {
      this.deliveryInstructions = deliveryInstructions;
    }
}
