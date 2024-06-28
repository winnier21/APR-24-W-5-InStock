import React from 'react';
import './Button.scss';

const Button = (props) => {
  const {
    className, text
  } = props;

  const buttonHandler = (event) => {
    console.log('delete clicked')
  }
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
