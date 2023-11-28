import React, { useState } from 'react';

const QuestionPopup = ({ type, onSave, onClose }) => {
  const [question, setQuestion] = useState({
    text: "",
    options: [],
    correctOption: 'true',
    type: type
  });

  const handleSave = () => {
    // The if statement below fixes a bug to ensure the default correct multiple choice answer is "a" not "true"
    if (question.type === 'multipleChoice' && question.correctOption === 'true') {
      question.correctOption = 'a'
    }
    onSave(question);
    console.log(question);
  };

  return (
    <div className='popup active'>
      <div className='popup-content'>
        <div className='top-text'>
          Create{" "}
          {type === "trueFalse"
            ? "True/False"
            : type === "multipleChoice"
            ? "Multiple Choice"
            : "Open Response"}{" "}
          Question
        </div>
        <div className="form-field">
          <label>Question:</label>
          <input
            type="text"
            placeholder="Enter Question Here"
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
          />
        </div>

        {type === "trueFalse" && (
          <div className="form-field">
            <label>Correct Option:</label>
            <select
              value={question.correctOption}
              onChange={(e) =>
                setQuestion({ ...question, correctOption: e.target.value })
              }
            >
              <option value={'true'}>True</option>
              <option value={'false'}>False</option>
            </select>
          </div>
        )}

        {type === "multipleChoice" && (
          <div>
          <div className="form-field">
            <label>a:</label>
            <input
              type="text"
              placeholder="Answer Choice 1"
              value={question.options[0] || ""}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[0] = e.target.value;
                setQuestion({ ...question, options: newOptions });
              }}
            />
          </div>

          <div className="form-field">
            <label>b:</label>
            <input
              type="text"
              placeholder="Answer Choice 2"
              value={question.options[1] || ""}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[1] = e.target.value;
                setQuestion({ ...question, options: newOptions });
              }}
            />
          </div>

          <div className="form-field">
            <label>c:</label>
            <input
              type="text"
              placeholder="Answer Choice 3"
              value={question.options[2] || ""}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[2] = e.target.value;
                setQuestion({ ...question, options: newOptions });
              }}
            />
          </div>

          <div className="form-field">
            <label>d:</label>
            <input
              type="text"
              placeholder="Answer Choice 4"
              value={question.options[3] || ""}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[3] = e.target.value;
                setQuestion({ ...question, options: newOptions });
              }}
            />
          </div>
          <div className="form-field">
            <label>Correct Option:</label>
            <select
              value={question.correctOption}
              onChange={(e) =>
                setQuestion({ ...question, correctOption: e.target.value })
              }
            >
              <option value={'a'}>a</option>
              <option value={'b'}>b</option>
              <option value={'c'}>c</option>
              <option value={'d'}>d</option>
            </select>
          </div>
          </div>
        )}

        <button onClick={onClose}>Back</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default QuestionPopup;