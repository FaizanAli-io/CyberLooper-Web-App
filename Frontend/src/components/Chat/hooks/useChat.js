import axios from "axios";
import { useState } from "react";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const useChat = (handleApiError) => {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);

  const fetchChats = async (token) => {
    setLoadingChats(true);
    try {
      const response = await axios.get(`${API_ENDPOINT}/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(
        response.data.map((chat) => ({
          id: chat.id,
          topic: chat.topic,
          model: chat.model,
        }))
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

  const sendMessage = async (
    userMessage,
    userRole,
    userDepartment,
    userLanguage
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        request: userMessage,
        response: null,
        isLoading: true,
      },
    ]);
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
          idx === prev.length - 1 ? { ...response.data, isLoading: false } : msg
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
      setMessages((prev) => prev.slice(0, -1));
      handleApiError(error, "sending message");
    } finally {
      setWaitingResponse(false);
    }
  };

  const switchModel = async (userRole, userDepartment, userLanguage) => {
    setWaitingResponse(true);

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

      setMessages([response.data]);

      setChats((prev) => [
        {
          id: response.data.chat_id,
          topic: response.data.request.slice(0, 30),
        },
        ...prev,
      ]);

      setSelectedChatId(response.data.chat_id);
    } catch (error) {
      handleApiError(error, "switching model");
    } finally {
      setWaitingResponse(false);
    }
  };

  const regenerateResponse = async (userRole, userDepartment, userLanguage) => {
    setWaitingResponse(true);

    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, isLoading: true } : msg
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
          idx === prev.length - 1 ? { ...response.data, isLoading: false } : msg
        )
      );

      if (!selectedChatId && token) {
        setChats((prev) => [
          {
            id: response.data.chat_id,
            topic: response.data.request.slice(0, 30),
          },
          ...prev,
        ]);
        setSelectedChatId(response.data.chat_id);
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, isLoading: false } : msg
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
  };

  return {
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
  };
};
