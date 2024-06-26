import React from 'react';
import { Link } from 'react-router-dom';

import './Cardlink.scss';


const Cardlink = (props) => {
  const { id, className, content } = props;
  return (
    <Link to={`/warehouse/${id}`} className={className}>
      <h3>
        {content}
      </h3>
    </Link>
  )
}

export default Cardlink
