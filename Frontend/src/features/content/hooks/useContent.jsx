import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ContentContext } from "../state/ContentContext";
import { contentApi, getContentByIdApi, getContentHistoryApi } from "../api/contentApi";
import { useNavigate } from "react-router";

export const useContent = () => {
  const schema = z.object({
    content: z.string().min(10, "Please write minimum 10 characters"),
  });

  const {
    error,
    setError,
    setIsSubmitting,
    setGeneratedContent,
    isSubmitting,
    generatedContent,
    contentItems,
    setContentItems
  } = useContext(ContentContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const submitHandler = async (data, action) => {
    try {
      setIsSubmitting(true);
      const res = await contentApi(data, action);
      setGeneratedContent(res?.output);
      console.log("Inside rewrite api")
    } catch (error) {
      setError(error);
      console.log("Error in rewriting content -->", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return {
    register,
    handleSubmit,
    submitHandler,
    errors,
    reset,
    error,
    setError,
    setIsSubmitting,
    setGeneratedContent,
    isSubmitting,
    generatedContent,
    contentItems,
    setContentItems,
  };
};


export const useContentHistory = () => {
  
  const {
    error,
    setError,
    contentItems,
    setContentItems,
    isLoading,
    setIsLoading,
    contentDetails,
    setContentDetails
  } = useContext(ContentContext);
  const navigate = useNavigate();

  const getContentHistory = async () =>{
    try {
      setIsLoading(true);
      const res = await getContentHistoryApi();
      setContentItems(res);
      
    } catch (error) {
      setError(error);
      console.log("Error in getting content history -->", error);
    } 
    finally{
      setIsLoading(false);
    }
  }
  const getContentById = async (id) =>{
    try {
      setIsLoading(true);
      const res = await getContentByIdApi(id);
      setContentDetails(res.data.content[0]);
      
    } catch (error) {
      setError(error);
      console.log("Error in getting content by id -->", error);
    } 
    finally{
      setIsLoading(false);
      // setError(null);
    }
  }

  return {
    error,
    setError,
    contentItems,
    setContentItems,
    isLoading,
    setIsLoading,
    getContentHistory,
    contentDetails,
    getContentById,
    navigate,
  }
}