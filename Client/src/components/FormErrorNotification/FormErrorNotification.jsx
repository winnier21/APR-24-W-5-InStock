import React from "react";
import "./FormErrorNotification.scss";

const FormErrorNotification = ({ inError, text }) => {
  const notificationText = text || "This field is required";
  return (
    <span className={inError ? "error__container" : "no-error"}>
      <p className={inError ? "error__text" : "no-error"}>{notificationText}</p>
    </span>
  );
};

export default FormErrorNotification;
