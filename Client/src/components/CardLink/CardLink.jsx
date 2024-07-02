import React from "react";
import { Link } from "react-router-dom";
import "./Cardlink.scss";

const Cardlink = (props) => {
  const { id, className, content, route } = props;
  return (
    <Link to={`/${route}/${id}`} className={className}>
      <h3 className="card-link">{content}</h3>
    </Link>
  );
};

export default Cardlink;
