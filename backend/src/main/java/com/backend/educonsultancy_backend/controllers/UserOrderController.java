package com.backend.educonsultancy_backend.controllers;

import com.backend.educonsultancy_backend.entities.UserOrder;
import com.backend.educonsultancy_backend.service.EmailService;
import com.backend.educonsultancy_backend.service.UserOrderService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class UserOrderController {

    @Value("${razorpay.callback-url}")
    private String callbackUrl;

    @Autowired
    private UserOrderService service;

    //======== NEW CODE ADDED ===========
    @Autowired
    private EmailService emailService;
    //====================================

    @GetMapping("/")
    public String init(){
        return "index";
    }

    @PostMapping(value = "/create-order",produces = "application/json")
    @ResponseBody
    public ResponseEntity<UserOrder> createOrder(@RequestBody UserOrder userOrder) throws Exception {
        UserOrder createdOrder = service.createOrder(userOrder);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }


    @GetMapping("api/orders")
    @ResponseBody
    public ResponseEntity<List<UserOrder>> getAllOrders() {
        List<UserOrder> orders = service.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("api/orders/{id}")
    @ResponseBody
    public ResponseEntity<UserOrder> getOrderById(@PathVariable Integer id) {
        UserOrder order = service.getOrderById(id);
        if (order != null) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //    @PostMapping("/handle-payment-callback")
    //    public String handlePaymentCallback(@RequestParam Map<String,String> respPayLoad){
    //        System.out.println(respPayLoad);
    //        service.updateOrder(respPayLoad);
    //        return "redirect:" + callbackUrl;
    //    }
    @PostMapping("/handle-payment-callback")
    public String handlePaymentCallback(@RequestParam Map<String, String> respPayLoad) {
        // Log the callback payload for debugging
        System.out.println("Callback Payload: " + respPayLoad);

        // Update order status based on the Razorpay callback
        UserOrder updatedOrder = service.updateOrder(respPayLoad);

        // Redirect after processing
        return "redirect:" + callbackUrl;
    }

    @GetMapping("api/orders/user/{email}")
    @ResponseBody
    public ResponseEntity<List<UserOrder>> getOrdersByEmail(@PathVariable String email) {
        List<UserOrder> orders = service.getOrdersByEmail(email);
        if (orders != null && !orders.isEmpty()) {
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
    }


}
