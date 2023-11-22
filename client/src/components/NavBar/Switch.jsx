import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && '#06D6A0' }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
        {isOn && (
        <span className="switch-canvas-text">Canvas Style</span>
        )}
        {!isOn && (
        <span className="switch-roadmap-text">Roadmap Style</span>
        )}
      </label>
    </>
  );
};

export default Switch;