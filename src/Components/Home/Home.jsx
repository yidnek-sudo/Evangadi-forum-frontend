
import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import style from "./home.module.css";
import { AppState } from "../../App";
import { Link } from "react-router-dom";


function Home() {
 
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [username, setUsername]= useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("user")
    
    if (!token) {
      setError("You are not authenticated. Please log in.");
      return;
    }

    if(storedUsername){
      setUsername(storedUsername);
    }

    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const questionsData = Array.isArray(res.data)
          ? res.data
          : res.data.questions || [];
        setQuestions(questionsData);

      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions");
      } finally {
        setLoading(false); // Ensure loading is set to false after the API call to display the faced question
      }
    };

    fetchQuestions();
  }, []);
  
  // Filter based on search input
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  if (error) return <p>{error}</p>;

  return (
    <>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className={style.question_list_container}>
          <div className={style.top_bar}>
            <Link to="/questions">
              <button className={style.ask_question_btn}>Ask Question</button>
            </Link>

            <div className={style.welcome_message}>
              Welcome: <span className={style.username}>{username}</span>
            </div>
          </div>

          <div className={style.search_bar}>
            <input
              type="text"
              placeholder="Search question"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to page 1 when searching
              }}
            />
          </div>

          <div className={style.question_items}>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question) => (
                <div className={style.question_item} key={question.questionid}>
                  <div className={style.user}>
                    <FaUserCircle className={style.user_icon} />
                    <p className={style.question_author}>{question.username}</p>
                  </div>
                  <div className={style.question_content}>
                    <Link to={`/questions/${question.questionid}`}>
                      <p className={style.question_title}>{question.title}</p>
                    </Link>
                  </div>
                  <IoIosArrowForward className={style.arrow_icon} />
                </div>
              ))
            ) : (
              <p>No questions found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredQuestions.length > questionsPerPage && (
            <div className={style.pagination}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Home;


