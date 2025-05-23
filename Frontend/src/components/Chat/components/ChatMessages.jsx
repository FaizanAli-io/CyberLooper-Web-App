import ReactMarkdown from "react-markdown";

export const ChatMessages = ({
  messages,
  loadingMessages,
  formatTimestamp,
  onCopyText,
  onRegenerateResponse,
  onSwitchModel,
}) => {
  if (loadingMessages) {
    return (
      <div className="chat-messages">
        <div className="loading-indicator">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => {
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
                  {isLatestMessage && (
                    <span className="timestamp">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  )}
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
                      <div className="typing-dots">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    ) : (
                      <ReactMarkdown>{msg.response}</ReactMarkdown>
                    )}
                  </div>
                  <div className="bot-actions">
                    {isLatestMessage && !msg.isLoading && msg.response && (
                      <>
                        <button
                          className="action-btn"
                          onClick={() => onCopyText(msg.response)}
                        >
                          Copy
                        </button>
                        <button
                          className="action-btn"
                          onClick={onRegenerateResponse}
                        >
                          Regenerate response
                        </button>
                        <button className="action-btn" onClick={onSwitchModel}>
                          Use Another LLM
                        </button>
                        <span className="timestamp">
                          {formatTimestamp(msg.timestamp)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
