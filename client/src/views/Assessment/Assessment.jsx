import React, { useState, useEffect } from 'react';
import './Assessment.css';
import { getAssessmentQuestions } from '../../Utils/requests';

function Assessment(props) {

  // The old questions array that was created statically had fields of text and options.
  // TODO: get the questions from the database and loop through them, assigning questiontext to text, and each option to options based on the type.
  // First: I need to get the assessments.jsx in the mentor view assessments table, so that the page is assigned an authentication token and I can make requests here.
  // Basically, I need to get an open questions button for each assessment.

  
  const [questions, setQuestions] = useState([]);
  const {assessmentId} = props;

  useEffect(() => {

    // get dbresponse with questions.
    const fetchData = async() => {
      let dbresponse;
      dbresponse = await getAssessmentQuestions(assessmentId);
      const newQuestions = dbresponse.data.questions.map((item, index) => 
      {
        const opt1 = item.Choice_1_text;
        const opt2 = item.Choice_2_text;
        const opt3 = item.Choice_3_text;
        const opt4 = item.Choice_4_text;

        const options = [opt1, opt2, opt3, opt4];

        return {
          text : item.Question_text,
          options : options,
        };
      });
      setQuestions(newQuestions);
    };
    fetchData();
  }, []);

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

export default Assessment;
