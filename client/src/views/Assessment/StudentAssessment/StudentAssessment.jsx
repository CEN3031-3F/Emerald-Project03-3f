import NavBar from '../../../components/NavBar/NavBar';
import React, { useState } from 'react';
import './StudentAssessment.css';

function Assessment() {
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

  const [showPopups, setShowPopups] = useState(Array(questions.length).fill(false));

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
        <NavBar isStudent={true} />
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
    </div>
  );
}

export default Assessment;