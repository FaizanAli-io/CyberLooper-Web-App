import logo from "../../../assets/logos/Cyberlooper_Logo on Dark Color.png";
import hamburgerIcon from "../../../assets/images/hamburger-icon.png";
import closeIcon from "../../../assets/images/hamburger-icon.png";

export const ChatSidebar = ({
  sidebarVisible,
  setSidebarVisible,
  searchQuery,
  onSearch,
  onNewChat,
  isAuthenticated,
  onSignUp,
  loadingChats,
  filteredChats,
  selectedChatId,
  onFetchMessages,
  showOtherMenu,
  setShowOtherMenu,
  onNavigateTo,
}) => {
  return (
    <>
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
              onChange={onSearch}
            />
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
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
          <button className="new-chat-btn" onClick={onNewChat}>
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
              <button className="auth-sidebar-btn" onClick={onSignUp}>
                Sign Up
              </button>
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
                  className={`chat-item ${
                    selectedChatId === chat.id ? "selected-chat" : ""
                  }`}
                  onClick={() => onFetchMessages(chat.id)}
                >
                  <span className="chat-index">
                    {filteredChats.length - index}.
                  </span>
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
              <button
                className="other-menu-item"
                onClick={() => onNavigateTo("/about")}
              >
                About
              </button>
              <button
                className="other-menu-item"
                onClick={() => onNavigateTo("/more-about")}
              >
                More About Us
              </button>
              <button
                className="other-menu-item"
                onClick={() => onNavigateTo("/faq")}
              >
                FAQ
              </button>
              <button
                className="other-menu-item"
                onClick={() => onNavigateTo("/blogs")}
              >
                Blogs
              </button>
              <button
                className="other-menu-item"
                onClick={() => onNavigateTo("/profile")}
              >
                Profile
              </button>
              <button
                className="other-menu-item"
                onClick={() => onNavigateTo("/pricing")}
              >
                Pricing
              </button>
              <button
                className="other-menu-item"
                onClick={() => onNavigateTo("/dashboard")}
              >
                Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
