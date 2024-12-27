//package com.backend.educonsultancy_backend.entities;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//
//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//public class Blog {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer blogId;
//
//    @Column(nullable = false)
//    private Integer userId;
//
//    @Column(nullable = false, length = 200)
//    private String title;
//
//    @Lob
//    @Column(nullable = false)
//    private String content;
//
//    @Column(nullable = false)
//    private String category;
//
//    @Column(nullable = false, updatable = false)
//    private LocalDateTime createdAt;
//
//    @Column(nullable = false)
//    private LocalDateTime updatedAt;
//
//    @Column(nullable = false)
//    private String blogImage; // Image filename
//
//    @PrePersist
//    public void prePersist() {
//        this.createdAt = LocalDateTime.now();
//        this.updatedAt = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    public void preUpdate() {
//        this.updatedAt = LocalDateTime.now();
//    }
//}




package com.backend.educonsultancy_backend.entities;

import com.backend.educonsultancy_backend.auth.entities.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer blogId;  // Primary Key for the Blog entity

    //=================== CHANGED CODE ================================
    //    @ManyToOne
    //    @JoinColumn(name = "user_id", nullable = false)  // Foreign Key to the Users table
    //    @NotNull(message = "Author (user) is mandatory")
    //    private User user;  // Author of the blog (consultant/admin)
    // Replace the 'User' with userId (Integer type)
    @Column(nullable = false)
    private Integer userId; // Foreign key to User table


    //=====================================================================

    @Column(nullable = false)
    @NotBlank(message = "Title is mandatory")
    private String title;  // Blog title

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    @NotBlank(message = "Content is mandatory")
    private String content;  // Content of the blog (can be large, so using @Lob)

    @Column(nullable = false)
    @NotBlank(message = "Category is mandatory")
    private String category;  // Category of the blog (e.g., Technology, Education, etc.)

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

//    @Column(nullable = false)
    @NotBlank(message = "Blog image is mandatory")
    private String blogImage;  // Blog image URL

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
