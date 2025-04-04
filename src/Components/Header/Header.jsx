import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./header.module.css";
import { AppState } from "../../App";
import logo from "../../assets/image/evangadi-logo-home.png";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppState);

  const token = localStorage.getItem("token");

  function handleButtonClick() {
    if (token) {
      navigate("/home");
    } else {
      // navigate to landing page
      navigate("/");
    }
  }
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Reset the user state
    setUser(null);
    // Navigate to the login page
    navigate("/SignIn");
  };
  // Boolean to check if the user is logged in
  const isUserLoggedIn = !!token;

  return (
    <header className={style.header}>
      {/* Logo Section */}
      <div className={style.logo} onClick={handleButtonClick}>
        <Link>
          <img src={logo} alt="Evangadi Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className={style.navSection}>
        <ul className={style.navLinks}>
          <li onClick={handleButtonClick}>
            <Link  className={style.navButton}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/HowItWorks" className={style.navButton}>
              How it works
            </Link>
          </li>

          {isUserLoggedIn ? (
            <button onClick={handleLogout} className={style.buttonPrimary}>
              Sign Out
            </button>
          ) : (
            <Link to="/SignIn" className={style.loginBtn}>
              <button className={style.buttonPrimary}>Sign In</button>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
