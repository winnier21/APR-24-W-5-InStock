import React from "react";
import "./Placeholder.scss";

const Placeholder = ({text}) => {
  const placeholderText = text || "Loading";
  return (
    <section className="api-data-placeholder">
      <p className="table-text">{placeholderText}</p>
    </section>
  );
};

export default Placeholder;
