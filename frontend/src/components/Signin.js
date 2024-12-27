import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../services/user-service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArtImage from "../assets/Art.jpg";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const schema = z.object({
  email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long").nonempty("Password is required"),
});

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignIn = async (data) => {
    const { email, password } = data;

    setIsLoading(true);

    try {
      const response = await signin({ email, password });

      toast.success("Signed in successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      login(response.accessToken);

      const userRole = response.user.role;

      if (userRole === "USER") {
        navigate("/home", { replace: true });
      } else if (userRole === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else if (userRole === "CONSULTANT") {
        navigate("/consultantDashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (error) {
      toast.error(error.message || "Sign-in failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/verify", { replace: true });
  };

  return (
    <div className="max-w-7xl h-screen mx-auto flex justify-around">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col w-[320px] justify-center">
          <div className="text-3xl font-semibold mb-4">Welcome Back! 👋</div>
          <div>
            <div className="text-md mb-2">Unlock Your Path to Success.</div>
            <div className="text-md">Sign In to Begin Your Educational Journey.</div>
          </div>

          <div className="mt-10">
            <form className="flex flex-col" onSubmit={handleSubmit(handleSignIn)}>
              <div>
                <label htmlFor="email" className="font-semibold text-sm">Email</label>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Example@gmail.com"
                  className={`p-2 rounded-lg text-sm bg-lightblue w-full inputborder ${errors.email ? 'border-red-500' : ''}`}
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="font-semibold text-sm">Password</label>
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="At least 8 characters"
                  className={`p-2 rounded-lg text-sm bg-lightblue w-full inputborder ${errors.password ? 'border-red-500' : ''}`}
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className={`bg-dark text-white flex justify-center items-center p-3 rounded-xl w-full btnhover mt-4 ${isLoading ? "opacity-50" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Forgot Password button */}
            <button
              onClick={handleForgotPassword}
              className="text-blue-800 font-semibold text-right mt-4 mb-4 ml-auto"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center p-4">
        <img src={ArtImage} alt="Art" className="rounded-3xl" />
      </div>
    </div>
  );
};

export default Signin;
