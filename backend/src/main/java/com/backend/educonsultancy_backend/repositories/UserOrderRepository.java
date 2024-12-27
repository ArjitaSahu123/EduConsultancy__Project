package com.backend.educonsultancy_backend.repositories;

import com.backend.educonsultancy_backend.entities.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserOrderRepository extends JpaRepository<UserOrder,Integer> {
    public UserOrder findByRazorpayOrderId(String orderId);

    // Fetch orders by email instead of userId
    List<UserOrder> findByEmail(String email);
}
