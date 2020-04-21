import React from 'react';

const Alert = ({ msg, type }) =>
  <div style={{ fontSize: '1rem' }} className={`alert alert-${type}`}>
    <i className="fas fa-info-circle" /> {msg}
  </div>;

export default Alert;
