import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axiosConfig";
import style from "./signin.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignIn() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please provide all required information");
      return;
    }

    try {
      
      setProcessing(true);
      setErrorMessage("");
      let data = {
        email: email,
        password: password,
      };

      const res = await axios.post("/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/home");

    } catch (error) {
      
      setErrorMessage(error?.response?.data?.msg || "Unexpected Error!");
    }
    setProcessing(false); 
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {processing ? (
        <p>Loading...</p>
      ) : (
        <div className={style.login_page}>
          {/* Left-side login form */}
          <div className={style.login_form_container}>
            <h2>Login to your account</h2>
            <p>
              Don’t have an account?
              <Link to="/SignUp" className={style.create_account_link}>
                Create a new account
              </Link>
            </p>

            <form className={style.login_form} onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />

              <label htmlFor="password">Password</label>
              <div className={style.password_container}>
                <input
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <span
                  className={style.show_password}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                
                </span>
              </div>

              <button
                type="submit"
                className={style.login_btn}
                disabled={processing}
              >
                {processing ? "Logging in..." : "Login"}{" "}
                
              </button>

             
              {errorMessage && (
                <p className={style.error_message}>{errorMessage}</p>
              )}
            </form>
          </div>

          {/* Right-side info section */}
          <div className={style.info__networks}>
            <h3 className={style.abt_login}>About</h3>
            <br />
            <h2>Evangadi Networks</h2>
            <br />
            <p>
              No matter what stage of life you are in, whether you're just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p>
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <Link to="/HowItWorks" className={style.how_btn}>
              How it Works
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
