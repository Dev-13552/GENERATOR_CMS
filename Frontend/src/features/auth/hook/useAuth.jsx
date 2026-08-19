import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import  api  from "../../../config/api";
import z from "zod";
import { loginApi, registerApi } from "../api/authApi";
import { AuthContext } from "../state/AuthContext";
import { useNavigate } from "react-router";

export const useAuth = (isLogin) => {
  let schema; 
  if(isLogin){
    schema = z.object({
      email: z.string().email("Enter a valid email"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character",
        ),
    });
  }
  else{
    schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
  });
  }

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });
  const {user, setUser, loading, setLoading, setIsHydrating} = useContext(AuthContext);
  const navigate = useNavigate();

  const registerFormSubmitHandler = async (data) => {
    try {
        setLoading(true);
        const response = await registerApi(data);
        if(response.success){
            navigate("/");
        }
    } catch (error) {
        console.log("Error in register from handler -->", error);
    }
    finally{
      setLoading(false);
    }
  };
  const loginFormSubmitHandler = async (data) => {
    try {
        const response = await loginApi(data);
        if(response.success){
            setUser(response.user);
        localStorage.setItem("token", response.token);
        navigate("/main");
        }
    } catch (error) {
        console.log("Error in login from handler -->", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    showPassword,
    setShowPassword,
    isSubmitting,
    setIsSubmitting,
    registerFormSubmitHandler,
    loginFormSubmitHandler,
    user,
  };
};

