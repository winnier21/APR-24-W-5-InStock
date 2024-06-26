import React from 'react';
import './Cardlink.scss';

const Cardlink = (props) => {
  const { className, content } = props;
  return (
    <>
      <h3 className={className}>
        {content}
      </h3>
    </>
  )
}

export default Cardlink
