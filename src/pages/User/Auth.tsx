import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CiLock, CiUser } from "react-icons/ci";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoginAxiosResponse } from "../../data/data";
import { loginSchema, registerSchema } from "../../validation";
import axiosInstance from "../../config/axios.config";
import {
  IErrorResponse,
  IFormInputLogin,
  IFormInputRegister,
} from "../../interfaces";
import { ErrorMsg } from "../../imports";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FiChrome, FiGithub } from "react-icons/fi";
import { setToken } from "../../helpers/helpers";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register: registerRegister,
    handleSubmit: RegisterSubmit,
    formState: RegisterFormState,
  } = useForm<IFormInputRegister>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitRegister: SubmitHandler<IFormInputRegister> = async (data) => {
    const { email, name, password } = data;
    const newData = {
      email,
      name,
      password,
    };
    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/register", newData);
      toast.success("Registration successful!", {
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      const ErrorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${ErrorObj.response?.data.message}`, {
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////
  const {
    register: registerLogin,
    handleSubmit: LoginSubmit,
    formState: LoginFromState,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmitLogin: SubmitHandler<IFormInputLogin> = async (data) => {
    try {
      setIsLoading(true);

      const response: LoginAxiosResponse = await axiosInstance.post(
        "/auth/login",
        data
      );
      toast.success(response.data.message, { position: "top-right" });
      setToken(response.data.data.token);
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Login failed", {
        position: "top-right",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const formVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf9] via-[#f8fafc] to-[#e0f2fe] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2342D5AE' fillOpacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Back to Home Link */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-[#022639] hover:text-[#42D5AE] transition-colors duration-300 font-medium"
        >
          <BsArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </Link>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-black bg-gradient-to-r from-[#022639] to-[#42D5AE] bg-clip-text text-transparent tracking-tight">
              Tech
            </span>
            <span className="text-3xl font-black bg-gradient-to-r from-[#42D5AE] via-[#38b28d] to-[#022639] bg-clip-text text-transparent tracking-tight">
              Practica
            </span>
          </div>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl border border-[#42D5AE]/20 rounded-3xl shadow-2xl shadow-[#42D5AE]/10 overflow-hidden"
        >
          {/* Tab Switcher */}
          <div className="flex bg-gray-50/50 p-2 m-6 rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 ${
                isLogin
                  ? "bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white shadow-lg shadow-[#42D5AE]/30"
                  : "text-gray-600 hover:text-[#022639]"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 ${
                !isLogin
                  ? "bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white shadow-lg shadow-[#42D5AE]/30"
                  : "text-gray-600 hover:text-[#022639]"
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={LoginSubmit(onSubmitLogin)}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-[#022639] mb-2">
                      Welcome Back!
                    </h2>
                    <p className="text-gray-600">
                      Sign in to continue your learning journey
                    </p>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <MdOutlineEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        {...registerLogin("email")}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    {LoginFromState.errors.email && (
                      <ErrorMsg Msg={LoginFromState.errors.email?.message} />
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <CiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...registerLogin("password")}
                        className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <FaRegEyeSlash className="w-5 h-5" />
                        ) : (
                          <FaRegEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {LoginFromState.errors.password && (
                      <ErrorMsg Msg={LoginFromState.errors.password?.message} />
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#42D5AE] hover:text-[#38b28d] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[#42D5AE]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Sign In
                        <BsArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={RegisterSubmit(onSubmitRegister)}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-[#022639] mb-2">
                      Create Account
                    </h2>
                    <p className="text-gray-600">
                      Join TechPractica and start learning today
                    </p>
                  </div>

                  {/* Username Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Username
                    </label>
                    <div className="relative">
                      <CiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        {...registerRegister("name")}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Choose a username"
                      />
                    </div>
                    {RegisterFormState.errors.name && (
                      <ErrorMsg Msg={RegisterFormState.errors.name?.message} />
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <MdOutlineEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        {...registerRegister("email")}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    {RegisterFormState.errors.email && (
                      <ErrorMsg Msg={RegisterFormState.errors.email?.message} />
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <CiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...registerRegister("password")}
                        className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <FaRegEyeSlash className="w-5 h-5" />
                        ) : (
                          <FaRegEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {RegisterFormState.errors.password && (
                      <ErrorMsg
                        Msg={RegisterFormState.errors.password?.message}
                      />
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <CiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Confirm your password"
                        {...registerRegister("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <FaRegEyeSlash className="w-5 h-5" />
                        ) : (
                          <FaRegEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {RegisterFormState.errors.confirmPassword && (
                      <ErrorMsg
                        Msg={RegisterFormState.errors.confirmPassword?.message}
                      />
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[#42D5AE]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Create Account
                        <BsArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="px-4 text-sm text-gray-500 font-medium">
                or continue with
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 py-3 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-300 text-gray-700 font-medium"
              >
                <FiGithub className="w-5 h-5" />
                GitHub
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 py-3 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-300 text-gray-700 font-medium"
              >
                <FiChrome className="w-5 h-5" />
                Google
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
