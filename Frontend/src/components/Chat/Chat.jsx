import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";
import { logoutUser, auth } from "../firebase/firebase.js";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import assistantIcon from '../../assets/images/assistant.png';
import discoveryIcon from '../../assets/images/discovery.png';
import communicationIcon from '../../assets/images/communication.png';
import codingIcon from '../../assets/images/coding.png';
import hamburgerIcon from "../../assets/images/hamburger-icon.png";
import closeIcon from "../../assets/images/hamburger-icon.png";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOtherMenu, setShowOtherMenu] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userLanguage, setuserLanguage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const TypingResponse = ({ response, isLoading, onTypingComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      if (isLoading) {
        setDisplayedText('');
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
  const navigate = useNavigate();

  const handleApiError = (error, context = "operation") => {
    console.error(`Error in ${context}:`, error);

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
          setErrorMessage("Your session has expired. Please sign in again.");
          handleSignOut();
          break;
        case 403:
          setErrorMessage("You don't have permission to perform this action.");
          break;
        case 429:
          if (data?.message?.includes("token") || data?.message?.includes("quota")) {
            setErrorMessage("⚠️ Chat limit reached! Your tokens have been exhausted. Please try again later or upgrade your plan.");
          } else {
            setErrorMessage("Too many requests. Please wait a moment before trying again.");
          }
          break;
        case 500:
          setErrorMessage("Server error occurred. Please try again in a few moments.");
          break;
        case 502:
        case 503:
        case 504:
          setErrorMessage("Service temporarily unavailable. Please try again later.");
          break;
        default:
          setErrorMessage(data?.message || `An error occurred (${status}). Please try again.`);
      }
    } else if (error.request) {
      setErrorMessage("Network error. Please check your connection and try again.");
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }

    // Clear error message after 10 seconds
    setTimeout(() => setErrorMessage(""), 10000);
  };

  // Get token and check authentication
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      setIsAuthenticated(true);
      fetchChats(token);
    } else {
      setIsAuthenticated(false);
      setLoadingChats(false);
    }
  }, []);

  function formatTimestamp(timestamp) {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }



  const fetchChats = async (token) => {
    setLoadingChats(true);
    try {
      const response = await axios.get(`${API_ENDPOINT}/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(
        response.data.map((chat) => ({ id: chat.id, topic: chat.topic, model: chat.model }))
      );
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoadingChats(false);
    }
  };

  const fetchMessages = async (chatId) => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      alert("Please sign in to view chat history");
      return;
    }

    setLoadingMessages(true);
    setMessages([]);
    setSelectedChatId(chatId);
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/messages/chat/${chatId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // useEffect(() => {
  //   if (isRegenerating.current && input) {
  //     callRegenerateResponse();
  //     isRegenerating.current = false; // Reset flag
  //   }
  // }, [input]);

  // const regenerateResponse = async () => {
  //   if (messages.length === 0) return;
  //   const lastMessage = messages[messages.length - 1];
  //   isRegenerating.current = true; // Set flag before updating input
  //   setInput(lastMessage.request);
  // };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setErrorMessage("");

    // Add user message and loading indicator
    setMessages((prev) => [...prev, {
      request: userMessage,
      response: null,
      isLoading: true
    }]);
    setWaitingResponse(true);

    const token = localStorage.getItem("user_token");

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/messages`,
        {
          chat_id: selectedChatId,
          request: userMessage,
          user_role: userRole || null,
          department: userDepartment || null,
          language: userLanguage || null,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...response.data, isLoading: false }
            : msg
        )
      );

      if (!selectedChatId && token) {
        setChats((prev) => [
          { id: response.data.chat_id, topic: userMessage.slice(0, 30) },
          ...prev,
        ]);
        setSelectedChatId(response.data.chat_id);
      }
    } catch (error) {
      // Remove the loading message and show error
      setMessages((prev) => prev.slice(0, -1));
      handleApiError(error, "sending message");
    } finally {
      setWaitingResponse(false);
    }
  };

  const switchModel = async () => {
    setWaitingResponse(true);
    setErrorMessage("");

    const token = localStorage.getItem("user_token");

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/messages/switchmodel`,
        {
          chat_id: selectedChatId,
          user_role: userRole || null,
          department: userDepartment || null,
          language: userLanguage || null,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      // Since switching model creates a NEW chat, reset messages to only the new message
      setMessages([response.data]);

      // Update chats list (prepend new chat)
      setChats((prev) => [
        { id: response.data.chat_id, topic: response.data.request.slice(0, 30) },
        ...prev,
      ]);

      // Update selected chat id to new one
      setSelectedChatId(response.data.chat_id);

    } catch (error) {
      handleApiError(error, "switching model");
    } finally {
      setWaitingResponse(false);
    }
  };

  const regenerateResponse = async () => {
    setWaitingResponse(true);
    setErrorMessage("");

    // Add loading indicator to the last message
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1
          ? { ...msg, isLoading: true }
          : msg
      )
    );

    const token = localStorage.getItem("user_token");

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/messages/regenerate`,
        {
          chat_id: selectedChatId,
          user_role: userRole || null,
          department: userDepartment || null,
          language: userLanguage || null,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...response.data, isLoading: false }
            : msg
        )
      );

      if (!selectedChatId && token) {
        setChats((prev) => [
          { id: response.data.chat_id, topic: response.data.request.slice(0, 30) },
          ...prev,
        ]);
        setSelectedChatId(response.data.chat_id);
      }
    } catch (error) {
      // Remove loading state from the message
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, isLoading: false }
            : msg
        )
      );
      handleApiError(error, "regenerating response");
    } finally {
      setWaitingResponse(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setSelectedChatId(null);
    setShowOtherMenu(false);
    setErrorMessage("");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredChats = chats.filter(chat =>
    chat.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignOut = async () => {
    try {
      // Check if the user is logged in via Firebase (Firebase Auth)
      if (auth.currentUser) {
        // Sign out the user from Firebase
        await signOut(auth);
        console.log("User signed out from Firebase.");
      }
      // If no Firebase user is logged in, handle normal JWT-based logout
      console.log("User signed out from normal auth.");
      localStorage.removeItem("user_token"); // Remove JWT token from localStorage
      sessionStorage.removeItem("user_token"); // Remove JWT token from sessionStorage
      setIsAuthenticated(false);
      setChats([]);
      setErrorMessage("");
      startNewChat();

      // After logout, navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
    setShowOtherMenu(false);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: Add a toast notification here
  };

  const categoryCards = [
    {
      title: "AI Assistant",
      icon: "assistant",
      examples: "How do I use V-Lookup with two excel files… Create a DAX formula that provides YTD sales on… How do I merge two tables in Power Query …"
    },
    {
      title: "Discovery",
      icon: "discovery",
      examples: "Find recent studies on remote work efficiency… Who are the main competitors in the tech industry for.. Summarize the latest trends in renewable energy with …"
    },
    {
      title: "Communication",
      icon: "communication",
      examples: "Draft an email to request a project update.… Generate a follow-up message after a sales call... Create an agenda for our next project kickoff…"
    },
    {
      title: "Coding",
      icon: "coding",
      examples: "Write a Python script to automate data cleaning..… Explain the difference between SQL JOIN types... Debug this JavaScript error:…"
    }
  ];

  const iconMap = {
    assistant: assistantIcon,
    discovery: discoveryIcon,
    communication: communicationIcon,
    coding: codingIcon
  };

  const renderCategoryIcon = (iconName) => {
    const backgroundImage = iconMap[iconName];

    return (
      <div
        className="card-icon"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "60px",
          height: "60px"
        }}
      />
    );
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <div className="nav-top-bar">
        <div className="navbar-content">
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <button className="auth-btn sign-in" onClick={handleSignIn}>Sign In</button>
              <button className="auth-btn sign-up" onClick={handleSignUp}>Sign Up</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="auth-btn sign-out" onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </div>

      <div className="chat-container">
        {/* Sidebar */}
        <button
          className="hamburger-toggle"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          <img
            src={sidebarVisible ? closeIcon : hamburgerIcon}
            alt="Toggle Sidebar"
            className="hamburger-icon"
          />
        </button>

        <div className={`chat-sidebar ${sidebarVisible ? "expanded" : ""}`}>
          <div className="sidebar-logo-section">
            <div className="chat-logo-container">
              <img src={logo} alt="Cyberlooper Logo" className="chat-logo" />
            </div>

            <div className="search-bar-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M10.5 11.5L14 15M6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5C12 9.53757 9.53757 12 6.5 12Z"
                  stroke="white"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="sidebar-header">
            <button className="new-chat-btn" onClick={startNewChat}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M8.33333 2.33333V13.6667M2.66667 8H14"
                  stroke="white"
                  strokeWidth="1.33333"
                />
              </svg>
              New Chat
            </button>
          </div>

          {!isAuthenticated ? (
            <div className="auth-prompt">
              <p>Sign in to see your previous chats</p>
              <div className="auth-sidebar-buttons">
                <button className="auth-sidebar-btn" onClick={handleSignUp}>Sign Up</button>
              </div>
            </div>
          ) : (
            <ul className="chat-list">
              {loadingChats ? (
                <p className="loading-indicator">Loading chats...</p>
              ) : filteredChats.length === 0 ? (
                searchQuery ? (
                  <p className="loading-indicator">No chats match your search.</p>
                ) : (
                  <p className="loading-indicator">No previous chats.</p>
                )
              ) : (
                filteredChats.map((chat, index) => (
                  <li
                    key={chat.id}
                    className={`chat-item ${selectedChatId === chat.id ? "selected-chat" : ""}`}
                    onClick={() => fetchMessages(chat.id)}
                  >
                    <span className="chat-index">{filteredChats.length - index}.</span>
                    {chat.topic}
                  </li>
                ))
              )}
            </ul>
          )}

          <div className="sidebar-footer">
            <button
              className={`other-btn ${showOtherMenu ? "active" : ""}`}
              onClick={() => setShowOtherMenu(!showOtherMenu)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M7.33333 7.33333H2.66667M13.3333 7.33333H8.66667M7.33333 7.33333V2.66667M7.33333 7.33333V13.3333"
                  stroke="white"
                  strokeWidth="1.33333"
                />
              </svg>
              Other
            </button>

            {showOtherMenu && (
              <div className="other-menu">
                <button className="other-menu-item" onClick={() => navigateTo('/About')}>
                  About
                </button>
                <button className="other-menu-item" onClick={() => navigateTo('/faq')}>
                  FAQ
                </button>
                <button className="other-menu-item" onClick={() => navigateTo('/Blogs')}>
                  Blogs
                </button>
                <button className="other-menu-item" onClick={() => navigateTo('/TermsOfService')}>
                  Terms Of Service
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          {/* Error Message Display */}
          {errorMessage && (
            <div className="error-message-container">
              <div className="error-message">
                {errorMessage}
                <button
                  className="error-close-btn"
                  onClick={() => setErrorMessage("")}
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {!messages.length && !selectedChatId ? (
            <>
              <div className="hero-section">
                <h2>Elevate Your Workday!</h2>

                <div className="hero-title">
                  <span className="normal-text">That Feels Like</span>
                  <span className="chat-ai-support">AI Support</span>
                </div>

                <p className="hero-subtitle">Having a Personal Technology Assistant</p>

                <p className="hero-instruction">
                  Type in your Position, Department and Code Language (If applicable) for better results
                </p>
                {/* Add this after the hero-instruction paragraph in the hero-section */}
                <div className="user-info-inputs">
                  <input
                    type="text"
                    className="user-info-input"
                    placeholder="Your Role/Position"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                  />
                  <input
                    type="text"
                    className="user-info-input"
                    placeholder="Your Department"
                    value={userDepartment}
                    onChange={(e) => setUserDepartment(e.target.value)}
                  />
                  <input
                    type="text"
                    className="user-info-input"
                    placeholder="Programming Language (if applicable)"
                    value={userLanguage}
                    onChange={(e) => setuserLanguage(e.target.value)}
                  />
                </div>

                <div className="category-cards">
                  {categoryCards.map((card, index) => (
                    <div key={index} className="category-card">
                      {renderCategoryIcon(card.icon)}
                      <div className="card-title">{card.title}</div>
                      <div className="card-examples">{card.examples}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chat-input-form">
                <div className="chat-input-container">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Hello! What work challenge can I help you tackle?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={waitingResponse}
                  />
                  <button
                    className="send-button"
                    onClick={sendMessage}
                    disabled={waitingResponse}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M7.33 24l2.83-9.25H2l14.67-10.5L14 14h8.33L7.33 24z" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="terms-notice">
                When you use Cyberlooper, you consent to our Terms of Service and confirm that you've reviewed our Privacy & Security Policy.
              </p>
            </>
          ) : (
            <>
              <div className="chat-messages">
                {loadingMessages ? (
                  <div className="loading-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    // Check if this is the latest message
                    const isLatestMessage = index === messages.length - 1;

                    return (
                      <div className="message-wrapper" key={index}>
                        {/* User message with avatar and actions */}
                        <div className="user-message-container">
                          <div className="user-avatar-container">
                            <div className="user-avatar"></div>
                          </div>
                          <div className="user-content">
                            <div className="user-bubble">{msg.request}</div>
                            <div className="user-actions">
                              {isLatestMessage && (
                                <button className="action-btn">Edit</button>
                              )}
                              {
                                isLatestMessage && (<span className="timestamp">{formatTimestamp(msg.timestamp)}</span>)
                              }
                            </div>
                          </div>
                        </div>

                        {/* Bot message with avatar and actions */}
                        {(msg.response || msg.isLoading) && (
                          <div className="bot-message-container">
                            <div className="bot-avatar-container">
                              <div className="bot-avatar"></div>
                            </div>
                            <div className="bot-content">
                              <div className="bot-bubble">
                                {msg.isLoading ? (
                                  <div className="typing-indicator">
                                    <span className="typing-indicator-text">AI is thinking</span>
                                    <div className="typing-dots">
                                      <div className="typing-dot"></div>
                                      <div className="typing-dot"></div>
                                      <div className="typing-dot"></div>
                                    </div>
                                  </div>
                                ) : (
                                  <ReactMarkdown>{msg.response}</ReactMarkdown>
                                )}
                              </div>
                              <div className="bot-actions">
                                {isLatestMessage && !msg.isLoading && msg.response && (
                                  <>
                                    <button className="action-btn" onClick={() => handleCopyText(msg.response)}>
                                      Copy
                                    </button>
                                    <button className="action-btn" onClick={regenerateResponse}>
                                      Regenerate response
                                    </button>
                                    <button className="action-btn" onClick={switchModel}>
                                      Use Another LLM
                                    </button>
                                    <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="chat-input-form">
                <div className="chat-input-container">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={waitingResponse}
                  />
                  <button
                    className="send-button"
                    onClick={sendMessage}
                    disabled={waitingResponse}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M7.33 24l2.83-9.25H2l14.67-10.5L14 14h8.33L7.33 24z" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div >
  );
};

export default ChatPage;