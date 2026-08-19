import { createContext, useState } from "react";


export const ImageContext = createContext();

export const ImageProvider = ({children})=>{

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [generatedImages, setGeneratedImages] = useState([]);

  const value = {error, setError, isSubmitting, setIsSubmitting, isLoading, setIsLoading, generatedImage, setGeneratedImage, generatedImages, setGeneratedImages}

  return <ImageContext.Provider value={value} >{children}</ImageContext.Provider>
} 