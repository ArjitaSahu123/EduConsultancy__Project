import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, changePassword } from "../services/user-service";
import ArtImage from "../assets/Art.jpg";

const Verify = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [step, setStep] = useState(1);
  const inputRefs = useRef([]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setIsLoading(true);
    const loader = toast.loading("Sending OTP...");

    try {
      await sendOtp(email);
      toast.update(loader, {
        render: "OTP sent to your email. Check your inbox!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-right",
      });
      setOtpSent(true);
      setStep(2);
    } catch (error) {
      toast.update(loader, {
        render: "Failed to send OTP. Try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];

    if (/^\d$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (index > 0 && !e.target.value) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else if (e.target.value) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleOtpVerify = async () => {
    const otpData = otp.join("");

    if (otpData.length !== 6) {
      toast.error("Please enter the full OTP.");
      return;
    }

    setIsLoading(true);
    const loader = toast.loading("Verifying OTP...");

    try {
      await verifyOtp(otpData, email);
      setOtpVerified(true);
      setStep(3);
      toast.update(loader, {
        render: "OTP verified successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-right",
      });
    } catch (error) {
      toast.update(loader, {
        render: "OTP verification failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    const loader = toast.loading("Resetting password...");

    try {
      await changePassword(email, newPassword, confirmPassword);
      toast.update(loader, {
        render: "Password reset successful! Redirecting to Sign In...",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-right",
      });
      navigate("/signin", { replace: true });
    } catch (error) {
      toast.update(loader, {
        render: "Password reset failed. Try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl h-screen mx-auto flex justify-around">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col w-[324px] justify-center">
          {step === 1 && (
            <>
              <div className="text-3xl font-semibold mb-4">
                Forgot Password?
              </div>
              <div className="text-xl font-semibold mb-4">
                Enter your email
              </div>

              <form onSubmit={handleEmailSubmit} className="flex flex-col">
                <div className="mb-4">
                  <input
                    type="email"
                    className="p-2 rounded-lg text-sm bg-lightblue w-full"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`bg-dark text-white flex justify-center items-center p-3 rounded-xl w-full btnhover mt-4 ${isLoading ? "opacity-50" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </>
          )}

          {step === 2 && otpSent && (
            <>
              <div className="text-xl font-semibold mb-4">
                Verify
              </div>

              <div className="mt-10">
                <div className="text-md mb-2">Enter the OTP sent to your email</div>
                <div className="flex gap-2 mt-3">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="mb-4">
                      <input
                        type="text"
                        maxLength="1"
                        className="p-2 rounded-lg text-sm bg-lightblue w-10 h-10 text-center"
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        value={otp[index]}
                        disabled={isLoading || otpVerified}
                        required
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleOtpVerify}
                  className={`bg-dark text-white flex justify-center items-center p-3 rounded-xl w-full btnhover mt-4 ${isLoading ? "opacity-50" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying OTP..." : "Verify OTP"}
                </button>
              </div>
            </>
          )}

          {step === 3 && otpVerified && (
            <>
              <div className="text-xl font-semibold mb-4">
                Create new password
              </div>

              <div className="mt-6">
                <div className="text-md mb-2">Enter New Password</div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-2 rounded-lg text-sm bg-lightblue w-full mb-4"
                  disabled={isLoading}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 rounded-lg text-sm bg-lightblue w-full"
                  disabled={isLoading}
                  required
                />
              </div>

              <button
                onClick={handlePasswordReset}
                className={`bg-dark text-white flex justify-center items-center p-3 rounded-xl w-full btnhover mt-4 ${isLoading ? "opacity-50" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </>
          )}
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center p-4">
        <img src={ArtImage} alt="Art" className="rounded-3xl" />
      </div>
    </div>
  );
};

export default Verify;

