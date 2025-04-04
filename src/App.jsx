import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn/";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import axios from "./axiosConfig";
import { useEffect, useState, createContext } from "react";
import Home from "./components/Home/Home";
import SingleQuestion from "./Components/Questions/SingleQuestion";
import Questions from "./Components/Questions/PostQuestion";

// Create context for global state
export const AppState = createContext();

function App() {
  // State to store user information
  const [user, setUser] = useState({});
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // Hook to navigate between routes
  const navigate = useNavigate();

  async function checkUser() {
    // Get token from local storage
    const token = localStorage.getItem("token");

    // Redirect to SignIn if no token exists
    if (!token) {
      setLoading(false);
      navigate("/SignIn");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get("users/checkUser", {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      console.log(data);
      if (data) {
        setUser(data); // Set user data if valid
      } else {
        navigate("/SignIn"); // Redirect to SignIn if user is invalid
      }
    } catch (error) {
      console.log(error.response); // Log error

      // navigate("/SignIn"); // Redirect to SignIn on error
    } finally {
      setLoading(false); // Set loading to false after check
    }
  }

  useEffect(() => {
    checkUser(); // Check user authentication on component mount
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/questions" element={<Questions />} />
        <Route
          path="/questions/:questionid"
          element={<SingleQuestion />}
        ></Route>

        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/home" element={loading ? <p>Loading...</p> : <Home />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
