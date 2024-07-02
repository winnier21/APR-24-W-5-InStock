import React from "react";
import { Link } from "react-router-dom";
import "./Cardlink.scss";
import chevron from '../../assets/icons/chevron_right-24px.svg'

const Cardlink = (props) => {
  const { id, className, content, route } = props;

  return (
    <Link to={`/${route}/${id}`} className={`${className} card-link__arrow`}>
      <h3 className="card-link">{content}</h3>
      <img
        src={chevron}
        className="card-link__arrow" 
        alt="forward arrow"
      />
    </Link>
  );
};

export default Cardlink;
