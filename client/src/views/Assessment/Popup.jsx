import React from 'react';

function Popup({ questions, onClose }) {
  return (
    <div className="Assessment">
      <div className="diagonal-buttons">
        {questions.map((question, index) => (
          <button className="question-button" onClick={() => openPopup(index)}>Question {index + 1}</button>
        ))}
      </div>
      {questions.map((question, index) => (
        <div key={index} className={`popup ${showPopups[index] ? 'active' : ''}`}>
          <div className="popup-content">
            <div>{question.text}</div>
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input type="radio" name={`question-${index}`} id={`question-${index}-option-${optionIndex}`} value={option} />
                  <label htmlFor={`question-${index}-option-${optionIndex}`}>{option}</label>
                </div>
              ))}
            </div>
            <button onClick={() => closePopup(index)}>Close</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Popup;
