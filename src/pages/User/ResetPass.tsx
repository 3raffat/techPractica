import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetSchema, ResetPassSchema } from "../../validation";
import {
  IErrorResponse,
  ResetinputPassword,
  ResetPassword,
} from "../../interfaces";
import Inputs from "../../components/ui/Input";
import ErrorMsg from "../../components/ui/ErrorMsg";
import Button from "../../components/ui/Buttom";
import { useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { AxiosError } from "axios";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import CookiesService from "../../service.ts";

const ResetPass = () => {
  document.title = "TechPractica | Reset Password";

  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<{
    otpId?: number;
    otp?: string;
    userEmail?: string;
  }>({});

  // Step 1: Email
  type EmailForm = { userEmail: string };
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
  } = useForm<EmailForm>({ resolver: yupResolver(ResetSchema) });

  const onSubmitEmail: SubmitHandler<EmailForm> = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/authenticated/send-reset-password",
        data
      );
      if (response.status === 200) {
        setUserData({
          userEmail: data.userEmail,
          otpId: response.data.otpId,
        });
        setTimeout(() => setStep(2));
      }
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      toast.error(
        err.response?.data?.error?.message || "Something went wrong!",
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }
  };

  // Step 2: OTP
  type OtpForm = {
    otpId: number;
    otp: string;
    userEmail: string;
  };

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors, isSubmitting: isSubmittingOtp },
  } = useForm<OtpForm>({});

  const onSubmitOtp: SubmitHandler<OtpForm> = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/authenticated/submit-OTP",
        data
      );
      if (response.status === 200) {
        CookiesService.set("UserToken", response.data);
        setTimeout(() => setStep(3));
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.message}`, {
        position: "top-center",
        duration: 2000,
      });
    }
  };

  // Step 3: New Password
  type PasswordForm = { password: string; confirmPassword: string };
  const {
    register: registerPass,
    handleSubmit: handlePassSubmit,
    formState: { errors: passErrors, isSubmitting: isSubmittingPass },
  } = useForm<PasswordForm>({ resolver: yupResolver(ResetPassSchema) });
  const Token = CookiesService.get("UserToken");
  const onSubmitPassword: SubmitHandler<PasswordForm> = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/authenticated/submit-new-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (response.status === 200) {
        CookiesService.remove("jwt");
        setTimeout(() => navigate("/User"), 1000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.message}`, {
        position: "top-center",
        duration: 2000,
      });
    }
  };

  const renderInputField = ({
    label,
    name,
    placeholder,
    type,
  }: (typeof ResetinputPassword)[0]) => {
    const isPasswordField = type === "password";
    return (
      <div className="mb-4">
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <div className="relative">
          <Inputs
            id={label}
            type={isPasswordField ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            {...registerPass(name)}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent"
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#42D5AE]"
            >
              {showPassword ? (
                <BiHide className="w-5 h-5" />
              ) : (
                <BiShow className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {passErrors[name] && <ErrorMsg Msg={passErrors[name]?.message} />}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#022639]">Reset Password</h2>
        <p className="text-gray-600 mt-2">
          {step === 1 && "Enter your email to receive a verification code"}
          {step === 2 && "Enter the 6-digit code sent to your email"}
          {step === 3 && "Create your new password"}
        </p>
      </div>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit(onSubmitEmail)} className="space-y-6">
          <div>
            <label
              htmlFor={ResetPassword.label}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {ResetPassword.label}
            </label>
            <Inputs
              id={ResetPassword.label}
              type={ResetPassword.type}
              placeholder={ResetPassword.placeholder}
              {...registerEmail(ResetPassword.name)}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent"
            />
            {emailErrors[ResetPassword.name] && (
              <ErrorMsg Msg={emailErrors[ResetPassword.name]?.message} />
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmittingEmail}
            className="w-full py-3 px-4 bg-[#42D5AE] hover:bg-[#38b28d] text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            {isSubmittingEmail ? "Sending..." : "Send Verification Code"}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit(onSubmitOtp)} className="space-y-6">
          <input
            type="hidden"
            value={userData.otpId}
            {...registerOtp("otpId")}
          />
          <input
            type="hidden"
            value={userData.userEmail}
            {...registerOtp("userEmail")}
          />

          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Verification Code
            </label>
            <Inputs
              type="text"
              placeholder="Enter 6-digit code"
              {...registerOtp("otp", {
                required: "Verification code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Code must be exactly 6 digits",
                },
              })}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent"
            />
            {otpErrors.otp && <ErrorMsg Msg={otpErrors.otp.message} />}
          </div>
          <Button
            type="submit"
            disabled={isSubmittingOtp}
            className="w-full py-3 px-4 bg-[#42D5AE] hover:bg-[#38b28d] text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            {isSubmittingOtp ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      )}

      {step === 3 && (
        <form
          onSubmit={handlePassSubmit(onSubmitPassword)}
          className="space-y-6"
        >
          {ResetinputPassword.map(renderInputField)}
          <Button
            type="submit"
            disabled={isSubmittingPass}
            className="w-full py-3 px-4 bg-[#42D5AE] hover:bg-[#38b28d] text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            {isSubmittingPass ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/User")}
          className="text-sm font-medium text-[#42D5AE] hover:text-[#38b28d]"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPass;
