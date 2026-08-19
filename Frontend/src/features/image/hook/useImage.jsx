import { useContext } from "react";
import { ImageContext } from "../state/ImageContext";
import { generateImageAPI, getImageHistoryAPI } from "../api/ImageApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const useImage = () => {
  const schema = z.object({
    resolution: z.string().min(1, "Please select a resolution"),
    prompt: z.string().min(1, "Please enter a valid prompt"),
  });
  const {
    error,
    setError,
    isSubmitting,
    setIsSubmitting,
    isLoading,
    setIsLoading,
    generatedImage,
    setGeneratedImage,
    generatedImages,
    setGeneratedImages,
  } = useContext(ImageContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const submitHandler = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await generateImageAPI(data);
      setGeneratedImage(res.data.imageUrl);
    } catch (error) {
      setError(error);
      console.log("Error in generating image", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getImage = async () => {
    try {
      const res = await getImageHistoryAPI();
      setGeneratedImages(res.data.images);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    setError,
    isSubmitting,
    setIsSubmitting,
    isLoading,
    setIsLoading,
    generatedImage,
    setGeneratedImage,
    generatedImages,
    setGeneratedImages,
    register,
    handleSubmit,
    errors,
    reset,
    submitHandler,
    getImage,
  };
};
