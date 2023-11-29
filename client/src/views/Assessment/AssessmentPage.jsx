import React, { useState, useEffect } from 'react';
import './Assessment.css';

function Assessment() {
  const [questions, setQuestions] = useState([]);
  const localQuestions = JSON.parse(localStorage.getItem('questions'));
  const [answers, setAnswers] = useState([]);

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

  return (
    <div className="Assessment">
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
  );
}

export default Assessment;
