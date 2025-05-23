import { useState } from "react";

export const useApiError = (onSignOut) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleApiError = (error, context = "operation") => {
    console.error(`Error in ${context}:`, error);

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
          setErrorMessage("Your session has expired. Please sign in again.");
          onSignOut();
          break;
        case 403:
          setErrorMessage("You don't have permission to perform this action.");
          break;
        case 429:
          if (
            data?.message?.includes("token") ||
            data?.message?.includes("quota")
          ) {
            setErrorMessage(
              "⚠️ Chat limit reached! Your tokens have been exhausted. Please try again later or upgrade your plan."
            );
          } else {
            setErrorMessage(
              "Too many requests. Please wait a moment before trying again."
            );
          }
          break;
        case 500:
          setErrorMessage(
            "Server error occurred. Please try again in a few moments."
          );
          break;
        case 502:
        case 503:
        case 504:
          setErrorMessage(
            "Service temporarily unavailable. Please try again later."
          );
          break;
        default:
          setErrorMessage(
            data?.message || `An error occurred (${status}). Please try again.`
          );
      }
    } else if (error.request) {
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }

    setTimeout(() => setErrorMessage(""), 10000);
  };

  return { errorMessage, setErrorMessage, handleApiError };
};
