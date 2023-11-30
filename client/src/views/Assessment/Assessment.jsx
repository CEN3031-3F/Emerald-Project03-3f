import React, { useState, useEffect } from 'react';
import './Assessment.css';
import Switch from '../../components/NavBar/Switch';
import './StudentAssessment/StudentAssessment.css';
import { getAssessmentQuestions } from '../../Utils/requests';

function Assessment({ assessmentId }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [showPopups, setShowPopups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbresponse = await getAssessmentQuestions(assessmentId);
        const formattedQuestions = dbresponse.data.questions.map(formatQuestion);
        setQuestions(formattedQuestions);
        setAnswers(Array(formattedQuestions.length).fill(''));
        setShowPopups(Array(formattedQuestions.length).fill(false));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [assessmentId]);

  const formatQuestion = (item) => {
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

    return { text: item.Question_text, options, type };
  };

  const handleAnswerChange = (index, value) => {
    setAnswers(answers => answers.map((answer, i) => i === index ? value : answer));
  };

  const togglePopup = (index) => {
    setShowPopups(popups => popups.map((popup, i) => i === index ? !popup : popup));
  };

  const submitAnswers = () => {
    console.log(answers);
    // Add submission logic here
  };

  return (
    <div className="Assessment">
      <Switch isOn={isOn} handleToggle={() => setIsOn(!isOn)} />

      {isOn ? (
        <div className="canvas-questions">
          {questions.map((question, index) => (
            <QuestionItem
              key={index}
              question={question}
              answer={answers[index]}
              onAnswerChange={(value) => handleAnswerChange(index, value)}
            />
          ))}
        </div>
      ) : (
        <React.Fragment>
          <div className="diagonal-buttons">
            {questions.map((question, index) => (
              <button className="question-button" onClick={() => togglePopup(index)} key={index}>
                {question.text}
              </button>
            ))}
          </div>
          {questions.map((question, index) => (
            <Popup
              key={index}
              question={question}
              isOpen={showPopups[index]}
              onClose={() => togglePopup(index)}
              answer={answers[index]}
              onAnswerChange={(value) => handleAnswerChange(index, value)}
            />
          ))}
        </React.Fragment>
      )}

      <button
        onClick={submitAnswers}
        style={{ color: 'white', backgroundColor: '#007bff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}>
        Submit Answers
      </button>
    </div>
  );
}

const QuestionItem = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="student-question">
      <div className="question-text">{question.text}</div>
      {question.type === 'openResponse' ? (
        <textarea value={answer} onChange={(e) => onAnswerChange(e.target.value)} />
      ) : (
        <div className="options">
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type={question.type === 'trueFalse' ? 'radio' : 'checkbox'}
                name={`question-${optionIndex}`}
                value={option}
                checked={answer === option}
                onChange={() => onAnswerChange(option)}
              />
              { } {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Popup = ({ question, isOpen, onClose, answer, onAnswerChange }) => {
  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <div className="question-text">{question.text}</div>
        {question.type === 'openResponse' ? (
          <textarea value={answer} onChange={(e) => onAnswerChange(e.target.value)} />
        ) : (
          <div className="options">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type={question.type === 'trueFalse' ? 'radio' : 'checkbox'}
                  name={`question-${optionIndex}`}
                  value={option}
                  checked={answer === option}
                  onChange={() => onAnswerChange(option)}
                />
                { } {option}
              </label>
            ))}
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Assessment;
