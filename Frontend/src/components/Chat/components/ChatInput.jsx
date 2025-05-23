export const ChatInput = ({
  input,
  setInput,
  onSendMessage,
  waitingResponse,
  placeholder = "Type a message...",
}) => {
  return (
    <div className="chat-input-form">
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
          disabled={waitingResponse}
        />
        <button
          className="send-button"
          onClick={onSendMessage}
          disabled={waitingResponse}
        >
          <svg viewBox="0 0 24 24">
            <path d="M7.33 24l2.83-9.25H2l14.67-10.5L14 14h8.33L7.33 24z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
