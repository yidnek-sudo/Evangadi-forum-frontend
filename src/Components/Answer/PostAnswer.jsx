import React, { useState } from "react";
import axios from "../../axiosConfig";
import style from "./postAnswer.module.css";
import AnswersList from "../Answer/Answer";
import { useNavigate } from "react-router-dom";

const PostAnswer = ({ questionid }) => {
  const [answer, setAnswer] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [refreshAnswers, setRefreshAnswers] = useState(false); // Refresh trigger
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/answers",
        { questionid, answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // setResponseMessage("Answer posted successfully");
      setAnswer(""); 
      setRefreshAnswers(true); // Trigger refresh in AnswersList
      setTimeout(() => setResponseMessage(""), 2000);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred."
      );
    }
  };

  return (
    <>
      <div className={style.answer_container}>
        <AnswersList refresh={refreshAnswers} /> {/* Pass refresh prop */}
        {responseMessage && (
          <p className={style.response_message}>{responseMessage}</p>
        )}
        <form onSubmit={handleSubmit} className={style.answer_form}>
          <textarea
            className={style.answer_input}
            placeholder="Your answer ..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className={style.button_container}>
            <button type="submit" className={style.submit_button}>
              Post Answer
            </button>
            <button
              type="button"
              className={style.back_button}
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </form>
      </div>
      <br />
      <br />
    </>
  );
};

export default PostAnswer;


