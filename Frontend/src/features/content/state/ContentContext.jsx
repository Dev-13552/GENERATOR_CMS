import { createContext, useState } from "react";

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [contentItems, setContentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contentDetails, setContentDetails] = useState(null);

  const value = {error, setError, isSubmitting, setIsSubmitting, generatedContent, setGeneratedContent, contentItems, setContentItems, isLoading, setIsLoading, contentDetails, setContentDetails};

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
