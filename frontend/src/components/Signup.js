import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ArtImage from "../assets/Art.jpg";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const loader = toast.loading("Creating account...");

    try {
      await signUp(data);
      toast.update(loader, {
        render: "Signup successful! Redirecting to login.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-right",
      });
      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      toast.update(loader, {
        render: error.response?.data?.message || "Signup failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="max-w-7xl h-screen mx-auto flex justify-around">
      {/* Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col w-[320px] justify-center">
          <div className="text-3xl font-semibold mb-4">Get Started!</div>
          <p className="text-md mb-2">Sign up now and begin shaping your educational future.</p>

          <form className="flex flex-col mt-10" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="font-semibold text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Enter full name"
                className={`p-2 rounded-lg text-sm w-full ${errors.name ? "border-red-500" : "inputborder"
                  }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="font-semibold text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="Example@gmail.com"
                className={`p-2 rounded-lg text-sm w-full ${errors.email ? "border-red-500" : "inputborder"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="username" className="font-semibold text-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username")}
                placeholder="Enter username"
                className={`p-2 rounded-lg text-sm w-full ${errors.username ? "border-red-500" : "inputborder"
                  }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="font-semibold text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="At least 8 characters"
                className={`p-2 rounded-lg text-sm w-full ${errors.password ? "border-red-500" : "inputborder"
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-dark text-white flex justify-center items-center p-3 rounded-xl w-full btnhover mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-1/2 flex justify-center items-center p-4">
        <img src={ArtImage} alt="Art" className="rounded-3xl" />
      </div>
    </div>
  );
};

export default Signup;
