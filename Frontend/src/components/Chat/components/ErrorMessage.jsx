export const ErrorMessage = ({ errorMessage, onClose }) => {
  if (!errorMessage) return null;

  return (
    <div className="error-message-container">
      <div className="error-message">
        {errorMessage}
        <button className="error-close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};
