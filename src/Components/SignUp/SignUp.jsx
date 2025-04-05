import React, { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import style from "./signUp.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      const response = await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      if (response.status === 201 || response.data) {
        setMessage("Registered successfully. Please login.")
        setTimeout(()=>{
          navigate("/SignIn");
        },6063)
      
      }
    } catch (error) {
      alert("Something went wrong.");
      console.log(error.response);
    }
  }

  return (
    <section className={style.SignUpContainer}>
      <div className={style.form_section}>
        {message && <p className={style.message}>{message}</p>}
        <h2 className={style.header}>Join the network</h2>
        <p className={style.firstAlreadyhaveAcc}>
          Already have an account?
          <Link to="/SignIn" className={style.signin_link}>
            Sign in
          </Link>
        </p>
        <form className={style.SignupForm} action="" onSubmit={handleSubmit}>
          <div>
            <input ref={userNameDom} type="text" placeholder="Username" />
          </div>
          <div className={style.fullName}>
            <input ref={firstNameDom} type="text" placeholder="First name" />
            <input ref={lastNameDom} type="text" placeholder="Last name" />
          </div>
          <div>
            <input ref={emailDom} type="email" placeholder="Email address" />
          </div>
          <div className={style.password_container}>
            <input
              ref={passwordDom}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
        
            />
           
           <span
              className={style.password_toggle_icon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className={style.agree_to_join}>
            <small>
              I agree to the <Link to="">privacy policy</Link> and
              <Link to="">terms of service</Link>
            </small>
          </div>
          <button className={style.btnJoin} type="submit">
            Agree and Join
          </button>
        </form>
        <Link to="/SignIn" className={style.signin_link}>
          <p className={style.already_account}>Already have an account? </p>
        </Link>
      </div>

      <div className={style.info_section}>
        <h3 className={style.abt}>About</h3>
        <br />
        <h1 className={style.eva_color}>Evangadi Networks</h1>
        <br />
        <p>
          No matter what stage of life you are in, whether you're just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <Link to="/HowItWorks" className={style.how_it_works_btn}>
          How it Works
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
