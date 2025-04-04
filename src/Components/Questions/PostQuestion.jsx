import React, { useState } from "react";
import axios from "../../../src/axiosConfig";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import style from "./postQuestion.module.css";

const PostQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handlePostQuestion = async (e) => {
    e.preventDefault();

    try {
      // Assume token is stored in localStorage
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        "/questions",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding Authorization token if required
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage("Question Posted successfully. Redirecting to home page ......."); 
      setTitle("")
      setDescription("")
      setTimeout(()=>{
      
        navigate("/home");

      },2000)
       
    } catch (error) {
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.heading}>Steps To Write A Good Question</h1>
      <hr className={style.divider} />
      <ul className={style.questionSteps}>
        <li>
          <FaArrowCircleRight className={style.icon} />
          Summarize your problems in a one-line title.
        </li>
        <li>
          <FaArrowCircleRight className={style.icon} />
          Describe your problem in more detail.
        </li>
        <li>
          <FaArrowCircleRight className={style.icon} />
          Describe what you tried and what you expected to happen.
        </li>
        <li>
          <FaArrowCircleRight className={style.icon} />
          Review your question and post it here.
        </li>
      </ul>

      <form onSubmit={handlePostQuestion} className={style.form}>
        <div>
          <h2 className={style.subtitle}>Post Your Question</h2>
          
          {responseMessage && (
        <p className={style.responseMessage}>{responseMessage}</p>
      )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            className={style.input}
            required
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Question detail ..."
            className={style.textarea}
            required
          />
        </div>
        <div className={style.buttonContainer}>
          <button type="submit" className={style.sButton}>
            Post Question
          </button>
          <button
            type="button"
            className={style.backButton}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>

     
    </div>
  );
};

export default PostQuestion;
