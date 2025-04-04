import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../src/axiosConfig";
import { AppState } from "../../App";
import PostAnswer from "../../Components/Answer/PostAnswer";
import { FaArrowCircleRight } from "react-icons/fa";
import style from "./singleQuestion.module.css";

const SingleQuestion = () => {
  // Get user from context
  const { user } = useContext(AppState);
  // Get the questionid from URL 
  const { questionid } = useParams(); 
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`questions/${questionid}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });
       // Set question data
        setQuestion(response.data.question); 
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionid]);

  return (
    <div className={style.single_question_container}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className={style.questionHeader}>
            <p>QUESTION</p>
          </div>
          <div>
            <div className={style.question_title_wrapper}>
              <span className={style.question_title}>
                <h2>
                  <FaArrowCircleRight style={{ color: " #007bff" }} />{" "}
                  {question.title}
                </h2>
              </span>
              <hr />
            </div>
            <div className={style.question_desc}>
              <p className={style.question_description}>
                {question.description}
              </p>
              <br />
              <br />
              <hr />
             
            </div>
            <PostAnswer questionid={questionid} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;
