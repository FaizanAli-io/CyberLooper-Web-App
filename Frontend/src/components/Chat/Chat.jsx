import "./Chat.css";

import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";

import { TopNavbar } from "./components/TopNavbar";
import { ChatSidebar } from "./components/ChatSidebar";
import { ErrorMessage } from "./components/ErrorMessage";
import { HeroSection } from "./components/HeroSection";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import { useApiError } from "./hooks/useApiError";
import { useChat } from "./hooks/useChat";

const ChatPage = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOtherMenu, setShowOtherMenu] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userLanguage, setuserLanguage] = useState("");

  const handleSignOut = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
        console.log("User signed out from Firebase.");
      }

      console.log("User signed out from normal auth.");
      sessionStorage.removeItem("user_token");
      localStorage.removeItem("user_token");
      setIsAuthenticated(false);
      setErrorMessage("");
      startNewChat();
      setChats([]);

      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const { errorMessage, setErrorMessage, handleApiError } =
    useApiError(handleSignOut);

  const {
    messages,
    chats,
    selectedChatId,
    loadingChats,
    loadingMessages,
    waitingResponse,
    fetchChats,
    fetchMessages,
    sendMessage,
    switchModel,
    regenerateResponse,
    startNewChat,
    setChats,
  } = useChat(handleApiError);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      setIsAuthenticated(true);
      fetchChats(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  function formatTimestamp(timestamp) {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput("");
    setErrorMessage("");
    await sendMessage(userMessage, userRole, userDepartment, userLanguage);
  };

  const handleSwitchModel = () => {
    switchModel(userRole, userDepartment, userLanguage);
  };

  const handleRegenerateResponse = () => {
    regenerateResponse(userRole, userDepartment, userLanguage);
  };

  const handleNewChat = () => {
    startNewChat();
    setShowOtherMenu(false);
    setErrorMessage("");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredChats = chats.filter((chat) =>
    chat.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const navigateTo = (path) => {
    navigate(path);
    setShowOtherMenu(false);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="app-container">
      <div className="chat-navbar-container">
      <TopNavbar
        isAuthenticated={isAuthenticated}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSignOut={handleSignOut}
        onNavigateTo={navigateTo}
      />
      </div>
      <div className="chat-container">
        <ChatSidebar
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onNewChat={handleNewChat}
          isAuthenticated={isAuthenticated}
          onSignUp={handleSignUp}
          loadingChats={loadingChats}
          filteredChats={filteredChats}
          selectedChatId={selectedChatId}
          onFetchMessages={fetchMessages}
          showOtherMenu={showOtherMenu}
          setShowOtherMenu={setShowOtherMenu}
          onNavigateTo={navigateTo}
        />

        {/* Main Chat Area */}
        <div className="chat-main">
          <ErrorMessage
            errorMessage={errorMessage}
            onClose={() => setErrorMessage("")}
          />

          {!messages.length && !selectedChatId ? (
            <>
              <HeroSection
                userRole={userRole}
                setUserRole={setUserRole}
                userDepartment={userDepartment}
                setUserDepartment={setUserDepartment}
                userLanguage={userLanguage}
                setUserLanguage={setuserLanguage}
              />

              <ChatInput
                input={input}
                setInput={setInput}
                onSendMessage={handleSendMessage}
                waitingResponse={waitingResponse}
                placeholder="Hello! What work challenge can I help you tackle?"
              />

              <p className="terms-notice">
                When you use Cyberlooper, you consent to our Terms of Service
                and confirm that you've reviewed our Privacy & Security Policy.
              </p>
            </>
          ) : (
            <>
              <ChatMessages
                messages={messages}
                loadingMessages={loadingMessages}
                formatTimestamp={formatTimestamp}
                onCopyText={handleCopyText}
                onRegenerateResponse={handleRegenerateResponse}
                onSwitchModel={handleSwitchModel}
              />

              <ChatInput
                input={input}
                setInput={setInput}
                onSendMessage={handleSendMessage}
                waitingResponse={waitingResponse}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
