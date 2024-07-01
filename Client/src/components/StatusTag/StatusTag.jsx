import React from 'react';
import './StatusTag.scss';

const StatusTag = (props) => {
  const { status } = props;
  const statusClassName = status.toLowerCase() === 'in stock' ? 'status-tag--green' : 'status-tag--red';
  return (
    <div className={statusClassName}>
      {status}
    </div>  
  )
}

export default StatusTag
