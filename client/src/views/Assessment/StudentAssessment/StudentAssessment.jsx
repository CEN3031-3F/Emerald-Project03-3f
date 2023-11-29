import NavBar from '../../../components/NavBar/NavBar';
import React, { useState } from 'react';
import './StudentAssessment.css';
import Switch from '../../../components/NavBar/Switch';
import QuestionPopup from '../../../views/Assessment/TeacherAssessment/QuestionPopup';

function StudentAssessment() {
  const questions = [
    {
      text: 'What is an electrical circuit?',
      options: ['A type of battery', 'A closed loop of wires or components through which electricity flows ', ' A type of light bulb'],
    },
    {
      text: 'Wires and a light bulb are two essential components of a simple electrical circuit.',
      options: ['True','False'],
    },
    {
      text: 'What is the purpose of a switch in an electrical circuit?',
      options: ['To slow down the flow of electricity', 'To open or close the circuit, controlling the flow of electricity ', 'To make the circuit brighter'],
    },

  ];

  const [showPopups, setShowPopups] = useState(Array(questions.length).fill(false));
  const [isOn, setIsOn] = useState(true);
  const [questionPopupType, setQuestionPopupType] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option
    });
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
  <div className='container flex-row nav-padding'>
      <div className="big-text">Assessment 1</div>
    <div className="Assessment">
    <NavBar isStudent={true} />
    <div>
      <Switch
        isOn={isOn}
        handleToggle={() => setIsOn(!isOn)}
      />
    </div>
    {questionPopupType && (
      <QuestionPopup type={questionPopupType} onSave={saveQuestion} onClose={closeQuestionPopup} />
    )}
    {isOn && (
      <div className="canvas-questions">
        {questions.map((question, index) => (
          <div className="canvas-question">
            <div className="canvas-header">
                <span>
                  Question {index + 1} 
                </span>
                
            </div>  
            <div className="canvas-body">
              {question.text}
            </div>
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
              
              <input
                type="radio"
                name={`question-${index}`}
                id={`question-${index}-option-${optionIndex}`}
                value={option}
                onChange={() => handleAnswerChange(index, option)}
                checked={selectedAnswers[index] === option}
              />
              <label htmlFor={`question-${index}-option-${optionIndex}`}>{option}</label>
            </div>
              ))}
            </div>
            { question.type !== "openResponse" &&
              <div className="canvas-correct-option-text">
                
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
          
          <div className="question-text">{index + 1}. {question.text}</div>
          <div className="options">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
              
              <input
                type="radio"
                name={`question-${index}`}
                id={`question-${index}-option-${optionIndex}`}
                value={option}
                onChange={() => handleAnswerChange(index, option)}
                checked={selectedAnswers[index] === option}
              />
              <label htmlFor={`question-${index}-option-${optionIndex}`}>{option}</label>
            </div>
            ))}
          </div>
          { question.type !== "openResponse" &&
          <div className="correct-option-text">
            
          </div>
          }
          <button className="close-button" onClick={() => closePopup(index)}>Close</button>
          
        </div>
      </div>
    ))}
    </div>
  </div>
);
}

export default StudentAssessment;