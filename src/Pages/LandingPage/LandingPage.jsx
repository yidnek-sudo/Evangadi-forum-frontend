import React from "react";
import style from "./landingPage.module.css";
import CoverLogo from "../../assets/image/Image 2025-03-24 at 10.11.03_8d7dd081.jpg";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  // Hook for navigation
  const navigate = useNavigate();

  const handleJoinNowOnClick = () => {
    navigate("/SignUP");
  };

  return (
    <>
      <div className={style.homeContainer}>
        <div className={style.homePage}>
          <div className={style.textContent}>
            <h2>Welcome to Evangadi Forum</h2>
            <p>
              Welcome to Evangadi Forum—your premier tech community for global
              networking and learning. Join us to connect with peers,
              collaborate on projects, and enhance your professional growth.
              Explore the features that can elevate your tech journey today.
            </p>
            <button onClick={handleJoinNowOnClick} className={style.joinBtn}>
              Join Now
            </button>
          </div>

          <div className={style.imageContent}>
            <img src={CoverLogo} alt="logo" className={style.chattingImage} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
