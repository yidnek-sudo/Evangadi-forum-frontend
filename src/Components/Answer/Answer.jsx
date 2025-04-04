import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import style from "./answer.module.css";
import PostAnswer from "./PostAnswer";

const AnswersList = ({ refresh = false }) => {
  // Add refresh prop
  const { questionid } = useParams();
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`answers/${questionid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnswers(response?.data?.answers || []);
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (questionid) {
      fetchAnswers();
    }
  }, [questionid, refresh]); // Add refresh to dependencies

  if (loading) return <p>Loading answers...</p>;

  return (
    <div className={style.answer_wrapper}>
      <h3>Answers From The Community</h3>
      <hr />
      {error ? (
        <p>{error}</p>
      ) : (
        <div className={style.answer_container}>
          <ul>
            {answers.map((answer) => (
              <li key={answer.answerid}>
                <div className={style.user_answer_container}>
                  <p>
                    <FaUserCircle />
                  </p>
                  <p className={style.user}>{answer.username}</p>
                </div>
                <p>{answer.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnswersList;
