import toast from "react-hot-toast";
import axiosInstance from "../config/axios.config";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IFormInputLogin,
  IFormInputRegister,
  LoginData,
  LoginResponse,
} from "./data";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { loginSchema, registerSchema } from "../validation";
import { CookiesService } from "../imports";
import { AxiosResponse } from "axios";

// Axios wraps your backend response in its own response object

///////////////////////////////////////////////////////////////////////////////////
export const { register: registerRegister, handleSubmit: RegisterSubmit } =
  useForm<IFormInputRegister>({
    resolver: yupResolver(registerSchema),
  });

export const onSubmitRegister: SubmitHandler<IFormInputRegister> = async (
  data
) => {
  try {
    await axiosInstance.post("/auth/register", data);
    toast.success("Registration successful!", {
      position: "top-center",
      duration: 2000,
    });
  } catch (error) {
    const ErrorObj = error as AxiosError<IErrorResponse>;
    toast.error(`${ErrorObj.response?.data.message}`, {
      position: "top-center",
      duration: 2000,
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////
export const { register: registerLogin, handleSubmit: LoginSubmit } = useForm({
  resolver: yupResolver(loginSchema),
});

export const onSubmitLogin: SubmitHandler<IFormInputLogin> = async (data) => {
  try {
    const response: LoginData = await axiosInstance.post("/auth/login", data);
    toast.success("Login successful!", { position: "top-center" });

    CookiesService.set("UserToken", response);

    // navigate("/");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data.message || "Login failed", {
      position: "top-center",
      duration: 4000,
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////
