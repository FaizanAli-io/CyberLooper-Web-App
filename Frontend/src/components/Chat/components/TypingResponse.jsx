import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export const TypingResponse = ({ response, isLoading, onTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    if (response && response !== displayedText) {
      setIsTyping(true);
      let currentIndex = 0;
      const typingSpeed = 20; // milliseconds between characters

      const typeText = () => {
        if (currentIndex < response.length) {
          setDisplayedText(response.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeText, typingSpeed);
        } else {
          setIsTyping(false);
          if (onTypingComplete) {
            onTypingComplete();
          }
        }
      };

      // Small delay before starting to type
      setTimeout(typeText, 100);
    }
  }, [response, isLoading, displayedText, onTypingComplete]);

  if (isLoading) {
    return (
      <div className="typing-indicator">
        <span className="typing-indicator-text">AI is thinking</span>
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    );
  }

  // Return the displayed text (either typing or complete response)
  return displayedText ? <ReactMarkdown>{displayedText}</ReactMarkdown> : null;
};
