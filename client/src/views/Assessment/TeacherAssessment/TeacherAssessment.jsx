import React, { useState } from 'react';
import QuestionPopup from './QuestionPopup';
import './TeacherAssessment.css';

function TeacherAssessment({questions2 = [], setQuestions}) {
  const questions = [
    {
      text: 'What is an electrical circuit?',
      options: ['A type of battery', 'A closed loop of wires or components through which electricity flows ', ' A type of light bulb'],
    },
    {
      text: 'Name two essential components of a simple electrical circuit.',
      options: ['Paper and tape', 'Wires and a light bulb', 'Rocks and sticks'],
    },
    {
      text: 'What is the purpose of a switch in an electrical circuit?',
      options: ['To slow down the flow of electricity', 'To open or close the circuit, controlling the flow of electricity ', 'To make the circuit brighter'],
    },
  ];

  const tutorialImages = ['/public/images/MC 1.png', '/public/images/MC 2.png']
  const [showPopups, setShowPopups] = useState(Array(questions.length).fill(false));
  const [questionPopupType, setQuestionPopupType] = useState(null);
  const [openTutorial, setOpenTutorial] = useState(false);
  
  const openTutorialPopUp = () => {
    setOpenTutorial(!openTutorial)
  };

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
      <button className="create-question-button" onClick={() => createQuestionPopup('trueFalse')}>Create True/False Question</button>
      <button className="create-question-button" onClick={() => createQuestionPopup('multipleChoice')}>Create Multiple Choice Question</button>
      <button className="create-question-button" onClick={() => createQuestionPopup('openResponse')}>Create Open Response Question</button>
      <button className="create-question-button" onClick={openTutorialPopUp}>Open Tutorial</button>
      {openTutorial && <div className="tutorialPopUp"> 
      <div className='tutorial-content'>
      Tutorial
      <button className="create-question-button" onClick={openTutorialPopUp}>Previous</button>
      <button className="create-question-button" onClick={openTutorialPopUp}>Next</button>
      <div className='tut-image' style={{backgroundImage: `url('${tutorialImages[0]}')` }}></div>
      </div>
       </div>}

      {questionPopupType && (
        <QuestionPopup type={questionPopupType} onSave={saveQuestion} onClose={closeQuestionPopup} />
      )}
      <div className="diagonal-buttons">
        {questions.map((question, index) => (
          <button className="question-button" onClick={() => openPopup(index)}>Question {index + 1}</button>
        ))}
      </div>
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
