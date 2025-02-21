import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput
} from "mdb-react-ui-kit";
import "./Chat.css"; // Import CSS

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState(["Chat 1", "Chat 2"]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <MDBContainer fluid className="chat-container">
      <MDBRow className="h-100">
        {/* Sidebar */}
        <MDBCol md="3" className="chat-sidebar">
          <h2 className="text-white">Previous Chats</h2>
          <ul className="chat-list">
            {chats.map((chat, index) => (
              <li key={index} className="chat-item">
                {chat}
              </li>
            ))}
          </ul>
          <MDBBtn className="new-chat-btn" color="primary" onClick={() => setChats([...chats, `Chat ${chats.length + 1}`])}>
            + New Chat
          </MDBBtn>
        </MDBCol>

        {/* Chat Section */}
       
        <MDBCol md="9" className="chat-main">
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <MDBRow/>
          {/* Chat Input */}
          <MDBRow className="chat-input p-2">
            <MDBCol size="10">
              <MDBInput
                type="text"
                className="chat-textbox"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </MDBCol>
            <MDBCol size="2" className="d-flex justify-content-end">
              <MDBBtn className="chat-send-btn" color="primary" onClick={sendMessage}>
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
