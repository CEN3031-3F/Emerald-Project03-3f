import React, { useState } from 'react';
import QuestionPopup from './QuestionPopup';
import Switch from '../../../components/NavBar/Switch';
import './TeacherAssessment.css';

function TeacherAssessment({questions, setQuestions}) {

  const [showPopups, setShowPopups] = useState(Array(questions.length).fill(false));
  const [questionPopupType, setQuestionPopupType] = useState(null);
  const [isOn, setIsOn] = useState(true);

  const createQuestionPopup = (type) => {
    setQuestionPopupType(type);
  };

  const closeQuestionPopup = () => {
    setQuestionPopupType(null);
  };

  const saveQuestion = (question) => {
    setQuestions([...questions, question]);
    closeQuestionPopup();
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    closePopup(index);
  };

  const openPopup = (index) => {
    const newPopups = [...showPopups];
    newPopups[index] = true;
    setShowPopups(newPopups);
  };

  const closePopup = (index) => {
    const newPopups = [...showPopups];
    newPopups[index] = false;
    setShowPopups(newPopups);
  };

  return (
    <div className="Assessment">
      <div>
        <Switch
          isOn={isOn}
          handleToggle={() => setIsOn(!isOn)}
        />
      </div>
      <button className="create-question-button" onClick={() => createQuestionPopup('trueFalse')}>Create True/False Question</button>
      <button className="create-question-button" onClick={() => createQuestionPopup('multipleChoice')}>Create Multiple Choice Question</button>
      <button className="create-question-button" onClick={() => createQuestionPopup('openResponse')}>Create Open Response Question</button>
      {questionPopupType && (
        <QuestionPopup type={questionPopupType} onSave={saveQuestion} onClose={closeQuestionPopup} />
      )}
      {isOn && (
        <div className="canvas-questions">
          {questions.map((question, index) => (
            <div className="canvas-question">
              <div className="canvas-header">
                  <span>
                    Question {index + 1} ({question.type === "trueFalse"
                    ? "True/False"
                    : question.type === "multipleChoice"
                    ? "Multiple Choice"
                    : "Open Response"}{""})
                  </span>
                  <button className="canvas-delete-button" onClick={() => deleteQuestion(index)}>Delete Question</button>
              </div>  
              <div className="canvas-body">
                {question.text}
              </div>
              <div className="options">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    {String.fromCharCode(97 + optionIndex)}) {option}
                  </div>
                ))}
              </div>
              { question.type !== "openResponse" &&
                <div className="canvas-correct-option-text">
                  Correct Answer: {question.correctOption}
                </div>
              }
            </div>
          ))}
        </div>
      )}
      {!isOn && (
        <div className="diagonal-buttons">
          {questions.map((question, index) => (
            <button className="question-button" onClick={() => openPopup(index)}>Question {index + 1}</button>
          ))}
        </div>
      )}
      {questions.map((question, index) => (
        <div key={index} className={`popup ${showPopups[index] ? 'active' : ''}`}>
          <div className="popup-content">
            <div className="top-text">
            {question.type === "trueFalse"
                ? "True/False"
                : question.type === "multipleChoice"
                ? "Multiple Choice"
                : "Open Response"}{" "}
            Question
            </div>
            <div className="question-text">{index + 1}. {question.text}</div>
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{String.fromCharCode(97 + optionIndex)}) {option}
                  {/* <input type="radio" name={`question-${index}`} id={`question-${index}-option-${optionIndex}`} value={option} /> */}
                  {/* <label htmlFor={`question-${index}-option-${optionIndex}`}>{option}</label> */}
                </div>
              ))}
            </div>
            { question.type !== "openResponse" &&
            <div className="correct-option-text">
              Correct Answer: {question.correctOption}
            </div>
            }
            <button className="close-button" onClick={() => closePopup(index)}>Close</button>
            <button className="delete-button" onClick={() => deleteQuestion(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeacherAssessment;
