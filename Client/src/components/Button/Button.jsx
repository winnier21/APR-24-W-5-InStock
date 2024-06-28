import React from 'react';
import './Button.scss';

const Button = (props) => {
  const {
    className, text, buttonHandler
  } = props;
  return (
    <button
      onClick={buttonHandler}
      className={className}
    >
      {text}
    </button>
  )
}

export default Button
