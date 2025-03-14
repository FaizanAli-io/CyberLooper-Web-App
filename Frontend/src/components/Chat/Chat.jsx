import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Chat.css";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);

  const token = localStorage.getItem("user_token");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/chats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(
          response.data.map((chat) => ({ id: chat.id, topic: chat.topic }))
        );
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoadingChats(false);
      }
    };
    fetchChats();
  }, [token]);

  const fetchMessages = async (chatId) => {
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { request: userMessage, response: "..." }]);
    setWaitingResponse(true);

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/messages`,
        { chat_id: selectedChatId, request: userMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, response: response.data.response }
            : msg
        )
      );

      if (!selectedChatId) {
        setChats((prev) => [
          { id: response.data.chat_id, topic: userMessage.slice(0, 30) },
          ...prev,
        ]);
        setSelectedChatId(response.data.chat_id);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setWaitingResponse(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setSelectedChatId(null);
  };

  return (
    <MDBContainer fluid className="chat-container">
      <MDBRow className="h-100">
        <MDBCol md="3" className="chat-sidebar">
          <h2 className="text-white">Previous Chats</h2>
          <MDBBtn
            color="primary"
            className="mb-3 new-chat-btn"
            onClick={startNewChat}
          >
            + New Chat
          </MDBBtn>
          {loadingChats ? (
            <p>Loading chats...</p>
          ) : chats.length === 0 ? (
            <p>No previous chats.</p>
          ) : (
            <ul className="chat-list">
              {chats.map((chat, index) => (
                <li
                  key={chat.id}
                  className={`chat-item ${selectedChatId === chat.id ? "selected-chat" : ""}`}
                  onClick={() => fetchMessages(chat.id)}
                >
                  <span className="chat-index">{chats.length - index}.</span>
                  {chat.topic}
                </li>
              ))}
            </ul>
          )}
        </MDBCol>
        <MDBCol md="9" className="chat-main">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="message-wrapper">
                <div className="chat-bubble user-bubble">{msg.request}</div>
                {msg.response && (
                  <div className="chat-bubble bot-bubble">
                    <ReactMarkdown>{msg.response}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
          <MDBRow className="chat-input p-2">
            <MDBCol size="10">
              <MDBInput
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={waitingResponse}
              />
            </MDBCol>
            <MDBCol size="2">
              <MDBBtn onClick={sendMessage} disabled={waitingResponse}>
                Send
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ChatPage;
