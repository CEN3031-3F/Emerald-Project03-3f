import React, { useState, useEffect} from 'react';
import QuestionPopup from './QuestionPopup';
import Switch from '../../../components/NavBar/Switch';
import './TeacherAssessment.css';
import NavBar from '../../../components/NavBar/NavBar';

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

  const tutorialImages = ['/public/images/TV1.jpeg', '/public/images/TV2.jpeg','/public/images/TV3.jpeg', '/public/images/TV4.jpeg', '/public/images/TV5.jpeg', '/public/images/TV6.jpeg', '/public/images/TV7.jpeg', '/public/images/TV8.jpeg', '/public/images/TV9.jpeg', '/public/images/TV10.jpeg']
  const [showPopups, setShowPopups] = useState(Array(questions.length).fill(false));
  const [questionPopupType, setQuestionPopupType] = useState(null);
  const [isOn, setIsOn] = useState(true);
  const [openTutorial, setOpenTutorial] = useState(false);
  const [idx, setIdx] = useState(0); // Start from the first image
  
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

  const editQuestion = () => {
    console.log('Button clicked!');
    //if(index==='')
    createQuestionPopup('trueFalse')
    
  };

  return (
    <div className='container flex-row nav-padding'>
      <NavBar isStudent={true} />
    

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
                  <div>
                    {/* <button className="canvas-edit-button" onClick={() => editQuestion(index)}>Edit</button>*/}
                    <button className="canvas-delete-button" onClick={() => deleteQuestion(index)}>Delete Question</button>
                  </div>
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
    </div>
  );
}

export default TeacherAssessment;
