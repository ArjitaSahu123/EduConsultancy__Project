package com.backend.educonsultancy_backend.auth.respositories;

import com.backend.educonsultancy_backend.auth.entities.ForgotPassword;
import com.backend.educonsultancy_backend.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword,Integer> {

    @Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.user = ?2")
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);

    //==== NEW CODE ADDED ====
    // Custom query to find ForgotPassword record by User
    Optional<ForgotPassword> findByUser(User user);

    // Method to delete the ForgotPassword record by its ID
    void deleteById(Integer fpid);

    //=========================
}
