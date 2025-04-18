package com.springboot.model.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String instructions;
    private LocalDate deliveryTime;
    @JsonProperty("isRushOrder")
    private boolean isRushOrder;
    private String province;

    public boolean isValid(boolean isRushOrder) {
        boolean normalDeliveryCondition = validateName(this.name) && validatePhoneNumber(this.phone) && validateAddress(this.address) && validateEmail(this.email);
        if (!isRushOrder) return normalDeliveryCondition;
        return normalDeliveryCondition && validateInstructions(this.instructions) && validateDeliveryTime(this.deliveryTime);
    }

    public boolean validatePhoneNumber(String phoneNumber) {
        if (phoneNumber.length() != 10)
            return false;
        if (phoneNumber.charAt(0) != '0')
            return false;
        try {
            Integer.parseInt(phoneNumber);
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }

    public boolean validateName(String name) {
        if (name == null)
            return false;
        if (name.trim().isEmpty())
            return false;
        return name.matches("^[\\p{L} .'-]+$");
    }

    public boolean validateAddress(String address) {
        if (address == null)
            return false;
        if (address.trim().isEmpty())
            return false;
        return address.matches("^[\\p{L}0-9 ,.-]*$");
    }

    public boolean validateEmail(String email) {
        if (email == null)
            return false;
        if (email.trim().isEmpty())
            return false;
        if (!email.matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))
            return false;
        return true;
    }

    public boolean validateInstructions(String instructions) {
        if (instructions == null)
            return false;
        return !instructions.trim().isEmpty();
    }

    public boolean validateDeliveryTime(LocalDate deliveryTime) {
        if (deliveryTime == null)
            return false;
        return !deliveryTime.isBefore(LocalDate.now());
    }
}
