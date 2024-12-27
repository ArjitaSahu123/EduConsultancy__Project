package com.backend.educonsultancy_backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="user_orders")
@Setter
@Getter
public class UserOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;
    private String name;
    private String email;
    private String phone;
    private String course;
    private Integer amount;
    private String orderStatus;
    private String razorpayOrderId;
}
