import React, { useState, useEffect } from 'react';
import './Assessment.css';
import NavBar from '../../components/NavBar/NavBar';
import Switch from '../../components/NavBar/Switch';
import './StudentAssessment/StudentAssessment.css';

function Assessment() {
  const [questions, setQuestions] = useState([]);
  const localQuestions = JSON.parse(localStorage.getItem('questions'));
  const [answers, setAnswers] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [showPopups, setShowPopups] = useState(Array(questions.length).fill(false));

  useEffect(() => {
    const fetchData = async () => {

      const newQuestions = localQuestions.map(item => {
        let type, options;
        if (item.Choice_1_text === 'true' && item.Choice_2_text === 'false') {
          type = 'trueFalse';
          options = ['true', 'false'];
        } else if (!item.Choice_1_text && !item.Choice_2_text && !item.Choice_3_text && !item.Choice_4_text) {
          type = 'openResponse';
          options = [];
        } else {
          type = 'multipleChoice';
          options = [item.Choice_1_text, item.Choice_2_text, item.Choice_3_text, item.Choice_4_text].filter(Boolean);
        }

        return {
          text: item.Question_text,
          options: options,
          type: type
        };
      });
      setQuestions(newQuestions);
      setAnswers(Array(newQuestions.length).fill(''));
    };
    fetchData();
  }, []);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const submitAnswers = () => {
    // Logic to submit answers
    console.log(answers);
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
      <NavBar isStudent={true} />
      <div>
        <Switch
          isOn={isOn}
          handleToggle={() => setIsOn(!isOn)}
        />
      </div>
      {isOn && (
        <div className="canvas-questions">
      {questions.map((question, index) => (
        <div key={index} className="student-question">
          <div className="question-text">{index + 1}. {question.text}</div>
          {question.type === 'openResponse' ? (
            <textarea 
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          ) : (
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type={question.type === 'trueFalse' ? 'radio' : 'checkbox'}
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {String.fromCharCode(97 + optionIndex)}) {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
          <button onClick={submitAnswers}>Submit Answers</button>
        </div>
      )}
      {!isOn && (
        <React.Fragment>
          <div className="diagonal-buttons">
            {questions.map((question, index) => (
              <button className="question-button" onClick={() => openPopup(index)} key={index}>{question.text}</button>
            ))}
          </div>
          {questions.map((question, index) => (
            <div key={index} className={`popup ${showPopups[index] ? 'active' : ''}`}>
              <div className="popup-content">
                <div className="question-text">{index + 1}. {question.text}</div>
                {question.type === 'openResponse' ? (
                  <div className="options">
                    <textarea
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="options">
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex}>
                        <input
                          type={question.type === 'trueFalse' ? 'radio' : 'checkbox'}
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() => handleAnswerChange(index, option)}
                        />
                        { } {option}
                      </label>
                    ))}
                  </div>
                )}
                <button className="close-button" onClick={() => closePopup(index)}>Close</button>
              </div>
            </div>
          ))}
          <button onClick={submitAnswers}>Submit Answers</button>
        </React.Fragment>
      )}
    </div>
  );
}

export default Assessment;
