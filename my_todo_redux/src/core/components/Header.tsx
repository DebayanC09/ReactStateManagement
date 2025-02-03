import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import TokenManager from "../../services/local/TokenManagers";
import { useSelector } from "react-redux";
import { getAuthState } from "../../store/slice/AuthSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userdata, isLoggedIn } = useSelector(getAuthState);
  const handleLogout = () => {
    TokenManager.deleteToken();
    navigate("/login");
  };

  useEffect(() => {
    console.log("Hello ", userdata);
    console.log("Hello ", isLoggedIn);
  }, [userdata, isLoggedIn]);

  return (
    <header className="header">
      <nav>
        <ul className="right-nav">
          <li>
            <div>{userdata?.name}</div>
          </li>
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
