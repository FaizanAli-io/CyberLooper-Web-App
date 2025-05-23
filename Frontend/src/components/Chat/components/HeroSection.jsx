import codingIcon from "../../../assets/images/coding.png";
import assistantIcon from "../../../assets/images/assistant.png";
import discoveryIcon from "../../../assets/images/discovery.png";
import communicationIcon from "../../../assets/images/communication.png";

export const HeroSection = ({
  userRole,
  setUserRole,
  userDepartment,
  setUserDepartment,
  userLanguage,
  setUserLanguage,
}) => {
  const categoryCards = [
    {
      title: "AI Assistant",
      icon: "assistant",
      examples:
        "How do I use V-Lookup with two excel files… Create a DAX formula that provides YTD sales on… How do I merge two tables in Power Query …",
    },
    {
      title: "Discovery",
      icon: "discovery",
      examples:
        "Find recent studies on remote work efficiency… Who are the main competitors in the tech industry for.. Summarize the latest trends in renewable energy with …",
    },
    {
      title: "Communication",
      icon: "communication",
      examples:
        "Draft an email to request a project update.… Generate a follow-up message after a sales call... Create an agenda for our next project kickoff…",
    },
    {
      title: "Coding",
      icon: "coding",
      examples:
        "Write a Python script to automate data cleaning..… Explain the difference between SQL JOIN types... Debug this JavaScript error:…",
    },
  ];

  const iconMap = {
    assistant: assistantIcon,
    discovery: discoveryIcon,
    communication: communicationIcon,
    coding: codingIcon,
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
          height: "60px",
        }}
      />
    );
  };

  return (
    <div className="hero-section">
      <h2>Elevate Your Workday!</h2>

      <div className="hero-title">
        <span className="normal-text">That Feels Like</span>
        <span className="chat-ai-support">AI Support</span>
      </div>

      <p className="hero-subtitle">Having a Personal Technology Assistant</p>

      <p className="hero-instruction">
        Type in your Position, Department and Code Language (If applicable) for
        better results
      </p>

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
          onChange={(e) => setUserLanguage(e.target.value)}
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
  );
};
