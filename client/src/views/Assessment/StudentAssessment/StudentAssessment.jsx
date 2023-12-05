import NavBar from '../../../components/NavBar/NavBar';
import React, { useState } from 'react';
import './StudentAssessment.css';
import Switch from '../../../components/NavBar/Switch';
import QuestionPopup from './StudentQuestionPopup';


function Assessment() {
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
  const tutorialImages = ['/public/images/SV1.jpeg', '/public/images/SV2.jpeg','/public/images/SV3.jpeg', '/public/images/SV4.jpeg']
  const [showPopups, setShowPopups] = useState(Array(questions.length).fill(false));
  const [isOn, setIsOn] = useState(true);
  const [questionPopupType, setQuestionPopupType] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [openTutorial, setOpenTutorial] = useState(false);
  const [idx, setIdx] = useState(0); // Start from the first image
/*
  const handleAnswerChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option
    });
  };
  */
  const handleAnswerChange = (questionIndex, option) => {
    console.log("Selected option for question " + questionIndex + ": " + option);
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers, 
      [questionIndex]: option 
    }));
  };
  const logStuff = (questionIndex, option) => {
    console.log("LOG");
    
  };

  const openTutorialPopUp = () => {
    setOpenTutorial(!openTutorial)
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
/*
  return (
    <div className='container flex-row nav-padding'>
      <Switch
          isOn={isOn}
          handleToggle={() => setIsOn(!isOn)}
        />
        <NavBar isStudent={true} />
        <div className="big-text">Assessment 1</div>
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
*/

return (
  <div className='container flex-row nav-padding'>

<div className="right-container">
            <button className="create-tutorial-button" onClick={openTutorialPopUp}>Open Tutorial</button>
        </div>

      {openTutorial && <div className="tutorialPopUp"> 
      <div className='tutorial-content'>
      
      <div className="top-container">
          <button className ="close-tutorialButton" onClick={()=>openTutorialPopUp(setIdx(0))}>Close Tutorial</button>
      </div>

      <div className='tut-image' style={{backgroundImage: `url('${tutorialImages[idx]}')` }}></div>

      <div className="bottom-container">
      <button className ="previous-button" onClick={() => setIdx(idx - 1)} disabled={idx == 0}>Previous</button>
      <button className ="next-button" onClick={() => setIdx(idx + 1)} disabled={idx == tutorialImages.length - 1}>Next</button>
      </div>

      </div>

       </div>}

  <div className="Assessment">
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
          
          <div className="canvas-question" key={index}>
          
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
      <React.Fragment>
        <div className="diagonal-buttons">
          {questions.map((question, index) => (
            <button className="question-button" onClick={() => openPopup(index)}>Question {index + 1}</button>
          ))}
        </div>
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
              {question.type !== "openResponse" &&
                <div className="correct-option-text">
                  
                </div>
              }
              <button className="close-button" onClick={() => closePopup(index)}>Close</button>
            </div>
          </div>
        ))}
      </React.Fragment>
    )}
  </div>
  </div>
);
}

export default Assessment;