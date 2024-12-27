package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.entities.UserOrder;
import com.backend.educonsultancy_backend.repositories.UserOrderRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserOrderService {
    @Autowired
    private UserOrderRepository userOrderRepository;

    //==== NEW
    @Autowired
    private EmailService emailService; // Autowire the EmailService to send emails
    //=======

    @Value("${razorpay.key.id}")
    private String razorPayKey;

    @Value("${razorpay.secret.key}")
    private String razorPaySecret;

    private RazorpayClient client;

    // Method to fetch UserOrder by Razorpay Order ID
    public UserOrder getOrderByRazorpayOrderId(String razorpayOrderId) {
        return userOrderRepository.findByRazorpayOrderId(razorpayOrderId);
    }

    public List<UserOrder> getAllOrders() {
        return userOrderRepository.findAll();
    }

    public UserOrder getOrderById(Integer id) {
        return userOrderRepository.findById(id).orElse(null);
    }

    public UserOrder createOrder(UserOrder useOrder) throws RazorpayException {
        JSONObject orderReq = new JSONObject();
        orderReq.put("amount",useOrder.getAmount()*100);
        orderReq.put("currency","INR");
        orderReq.put("receipt",useOrder.getEmail());

        this.client = new RazorpayClient(razorPayKey,razorPaySecret);

        Order razorPayOrder = client.orders.create(orderReq);

        System.out.println(razorPayOrder);

        useOrder.setRazorpayOrderId(razorPayOrder.get("id"));
        useOrder.setOrderStatus(razorPayOrder.get("status"));

        userOrderRepository.save(useOrder);

        return useOrder;
    }

    @Transactional
    public UserOrder updateOrder(Map<String, String> responsePayLoad) {
        String razorPayOrderId = responsePayLoad.get("razorpay_order_id");

        // Retrieve the order using the razorpay_order_id
        UserOrder order = userOrderRepository.findByRazorpayOrderId(razorPayOrderId);

        if (order == null) {
            System.out.println("Order not found with Razorpay order ID: " + razorPayOrderId);
            return null; // Or throw an exception
        }

        // Update the order status to "COMPLETED"
        order.setOrderStatus("COMPLETED");

        // Save the updated order
        UserOrder updatedOrder = userOrderRepository.save(order);

        System.out.println("Order updated: " + updatedOrder);

        // Optionally send email (if required)

        //===========NEW CODE=============
        // Send the email upon successful payment (order completion)
        try {
            // Construct the email content using buildEmailContent
            String emailContent = buildEmailContent(updatedOrder);
            // Send HTML email to the user
            emailService.sendHtmlMessage(updatedOrder.getEmail(), "Thank you for your purchase!", emailContent);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Handle email sending failure (log or notify)
        }
        //============================

        return updatedOrder;
    }

//    public UserOrder updateOrder(Map<String,String> responsePayLoad){
//        String razorPayOrderId = responsePayLoad.get("razorpay_order_id");
//
//        UserOrder order = userOrderRepository.findByRazorpayOrderId(razorPayOrderId);
//
//        order.setOrderStatus("COMPLETED");
//
//        UserOrder updatedOrder = userOrderRepository.save(order);
//
//        // SEND EMAIL
//
//        return updatedOrder;
//    }


    private String buildEmailContent(UserOrder userOrder) {
        String currentYear = java.time.Year.now().toString();
        return "<html>"
                + "<head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; color: #333333; }"
                + "h1 { color: #FFFFFF; }"
                + "p { font-size: 14px; line-height: 1.6; }"
                + ".banner { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }"
                + ".footer { background-color: #f1f1f1; text-align: center; padding: 10px 0; font-size: 12px; color: #777777; }"
                + ".details { margin-top: 20px; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9; }"
                + ".details p { margin: 10px 0; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='banner'>"
                + "<h1>Thank you for your purchase!</h1>"
                + "</div>"
                + "<p>Hi " + userOrder.getName() + ",</p>"
                + "<p>Thank you for purchasing the course! Below are the details of your purchase:</p>"
                + "<div class='details'>"
                + "<p><strong>Order ID:</strong> " + userOrder.getRazorpayOrderId() + "</p>"
                + "<p><strong>Course:</strong> " + userOrder.getCourse() + "</p>"
                + "<p><strong>Amount:</strong> ₹" + userOrder.getAmount() + "</p>"
                + "<p><strong>Order Status:</strong> " + userOrder.getOrderStatus() + "</p>"
                + "<p><strong>Purchased At:</strong> " + java.time.LocalDateTime.now() + "</p>"
                + "</div>"
                + "<p>If you have any questions, feel free to <a href='mailto:support@educonsultancy.com'>contact us</a>.</p>"
                + "<div class='footer'>"
                + "<p>Best Regards, <br>EduConsultancy Team</p>"
                + "<p>&copy; " + currentYear + " EduConsultancy. All rights reserved.</p>"
                + "</div>"
                + "</body>"
                + "</html>";
    }


    // Fetch orders by email
    public List<UserOrder> getOrdersByEmail(String email) {
        return userOrderRepository.findByEmail(email);
    }

}
