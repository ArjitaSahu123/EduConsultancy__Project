package com.backend.educonsultancy_backend.controllers;

import com.backend.educonsultancy_backend.auth.entities.ForgotPassword;
import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.auth.respositories.ForgotPasswordRepository;
import com.backend.educonsultancy_backend.auth.respositories.UserRepository;
import com.backend.educonsultancy_backend.auth.utils.ChangePassword;
import com.backend.educonsultancy_backend.dto.MailBody;
import com.backend.educonsultancy_backend.service.EmailService;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final EmailService emailService;

    private final ForgotPasswordRepository forgotPasswordRepository;

    private final PasswordEncoder passwordEncoder;

    public ForgotPasswordController(UserRepository userRepository, EmailService emailService, ForgotPasswordRepository forgotPasswordRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.passwordEncoder = passwordEncoder;
    }

//==============================================================================
//    // send mail for email verification
//    @PostMapping("/verifyMail/{email}")
//    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("Please provide an valid email!" + email));
//
//        int otp = otpGenerator();
//        MailBody mailBody = MailBody.builder()
//                .to(email)
//                .text("This is the OTP for your Forgot Password request : " + otp)
//                .subject("OTP for Forgot Password request")
//                .build();
//
//        ForgotPassword fp = ForgotPassword.builder()
//                .otp(otp)
//                .expirationTime(new Date(System.currentTimeMillis() + 60 * 1000))
//                .user(user)
//                .build();
//
//        emailService.sendSimpleMessage(mailBody);
//        forgotPasswordRepository.save(fp);
//
//        return ResponseEntity.ok("Email sent for verification!");
//    }
    //======== NEW CODE ADDED ====================================
@PostMapping("/verifyMail/{email}")
@Transactional
public ResponseEntity<String> verifyEmail(@PathVariable String email) {
    // Retrieve the user by email, throwing an exception if not found
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Please provide a valid email!" + email));

    // Check if the user already has an existing OTP record by user ID
    ForgotPassword existingFp = forgotPasswordRepository.findByUser(user).orElse(null);

    // Create the ForgotPassword object for saving after checking if an OTP record exists
    ForgotPassword fp;

    // If an existing OTP record is found, update it
    if (existingFp != null) {
        // Create a new ForgotPassword object with the updated values using the builder
        fp = ForgotPassword.builder()
                .fpid(existingFp.getFpid()) // Retain the same ID
                .otp(otpGenerator()) // Generate a new OTP
                .expirationTime(new Date(System.currentTimeMillis() + 60 * 1000)) // 1 minute expiration time
                .user(user) // Link the same user
                .build();
        // Save the updated record
        forgotPasswordRepository.save(fp);
    } else {
        // If no existing OTP record is found, create a new one
        fp = ForgotPassword.builder()
                .otp(otpGenerator())
                .expirationTime(new Date(System.currentTimeMillis() + 60 * 1000)) // 1 minute expiration time
                .user(user)
                .build();
        forgotPasswordRepository.save(fp); // Save the new OTP record
    }

    // Prepare the email body with the OTP
    MailBody mailBody = MailBody.builder()
            .to(email)
            .text("This is the OTP for your Forgot Password request: " + fp.getOtp()) // Use the 'fp' object here
            .subject("OTP for Forgot Password request")
            .build();

    // Send the OTP email
    emailService.sendSimpleMessage(mailBody);

    return ResponseEntity.ok("Email sent for verification!");
}

    //===================================================================

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Please provide an valid email!"));

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("Invalid OTP for email: " + email));

        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED);
        }

        return ResponseEntity.ok("OTP verified!");
    }


    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePassword changePassword,
                                                        @PathVariable String email) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return new ResponseEntity<>("Please enter the password again!", HttpStatus.EXPECTATION_FAILED);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.password());
        userRepository.updatePassword(email, encodedPassword);

        return ResponseEntity.ok("Password has been changed!");
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
