import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import TokenManager from "../../services/local/TokenManagers";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    TokenManager.deleteToken();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav>
        <ul className="right-nav">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
