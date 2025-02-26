import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput
} from "mdb-react-ui-kit";
import "./Chat.css"; // Import CSS

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // ✅ Get user token from local storage
  const token = localStorage.getItem("user_token");

  // ✅ Fetch user chats on page load
  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("🔍 Fetching chats with token:", token);

        const response = await axios.get(`${API_ENDPOINT}/chats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedChats = response.data.map(chat => ({
          id: chat.id,
          topic: chat.topic,
        }));

        setChats(formattedChats);
      } catch (error) {
        console.error("❌ Error fetching chats:", error);
      } finally {
        setLoadingChats(false);
      }
    };

    fetchChats();
  }, [token]);

  // ✅ Fetch messages when a chat is selected
  const fetchMessages = async (chatId) => {
    setLoadingMessages(true);
    setMessages([]); // Clear previous messages
    setSelectedChatId(chatId);

    try {
      const response = await axios.get(`${API_ENDPOINT}/messages/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages(response.data);
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // ✅ Send message and display it immediately
  const sendMessage = async () => {
    if (input.trim() === "") return;

    // ✅ Instantly show the sent message in the UI
    const newMessage = {
      request: input,
      response: null, // Placeholder, backend will provide the response
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/messages`,
        { chat_id: selectedChatId, request: input },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      // ✅ Update the message with response once received from backend
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? response.data : msg
        )
      );

      // ✅ If it's a new chat, update selectedChatId
      if (!selectedChatId) {
        setSelectedChatId(response.data.chat_id);
        setChats([...chats, { id: response.data.chat_id, topic: "New Chat" }]);
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
    } finally {
      setInput("");
    }
  };

  return (
    <MDBContainer fluid className="chat-container">
      <MDBRow className="h-100">
        {/* Sidebar */}
        <MDBCol md="3" className="chat-sidebar">
          <h2 className="text-white">Previous Chats</h2>

          {loadingChats ? (
            <p>Loading chats...</p>
          ) : chats.length === 0 ? (
            <p>No previous chats.</p>
          ) : (
            <ul className="chat-list">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`chat-item ${selectedChatId === chat.id ? "selected-chat" : ""}`}
                  onClick={() => fetchMessages(chat.id)}
                >
                  {chat.topic}
                </li>
              ))}
            </ul>
          )}
        </MDBCol>

        {/* Chat Section */}
        <MDBCol md="9" className="chat-main">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="message-wrapper">
                {/* User message aligned right */}
                <div className="chat-bubble user-bubble">{msg.request}</div>
                {/* Bot response aligned left */}
                {msg.response && <div className="chat-bubble bot-bubble">{msg.response}</div>}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <MDBRow className="chat-input p-2">
            <MDBCol size="10">
              <MDBInput
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </MDBCol>
            <MDBCol size="2">
              <MDBBtn onClick={sendMessage}>Send</MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ChatPage;
