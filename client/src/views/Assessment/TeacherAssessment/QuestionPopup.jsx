import React, { useState } from 'react';

const QuestionPopup = ({ type, onSave, onClose }) => {
    const [question, setQuestion] = useState({
      text: "",
      options: [],
      correctOption: 'true',
      type: type
    });
  
    const handleSave = () => {
      onSave(question);
      console.log(question);
    };
  
    return (
      <div className='popup active'>
        <div className='popup-content'>
            <div>
            Create{" "}
            {type === "trueFalse"
                ? "True/False"
                : type === "multipleChoice"
                ? "Multiple Choice"
                : "Open Response"}{" "}
            Question
            </div>
            <input
            type="text"
            placeholder="Enter Question Here"
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            />
    
            {type === "trueFalse" && (
            <label>
                Correct Option:
                <select
                value={question.correctOption}
                onChange={(e) =>
                    setQuestion({ ...question, correctOption: e.target.value })
                }
                >
                <option value={'true'}>True</option>
                <option value={'false'}>False</option>
                </select>
            </label>
            )}
    
            {type === "multipleChoice" && (
            <div>
                <input
                type="text"
                placeholder="Option 1"
                value={question.options[0] || ""}
                onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[0] = e.target.value;
                    setQuestion({ ...question, options: newOptions });
                }}
                />
    
                <input
                type="text"
                placeholder="Option 2"
                value={question.options[1] || ""}
                onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[1] = e.target.value;
                    setQuestion({ ...question, options: newOptions });
                }}
                />
    
                <input
                type="text"
                placeholder="Option 3"
                value={question.options[2] || ""}
                onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[2] = e.target.value;
                    setQuestion({ ...question, options: newOptions });
                }}
                />
    
                <input
                type="text"
                placeholder="Option 4"
                value={question.options[3] || ""}
                onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[3] = e.target.value;
                    setQuestion({ ...question, options: newOptions });
                }}
                />
            </div>
            )}
    
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Back</button>
        </div>
      </div>
    );
  };

export default QuestionPopup;
