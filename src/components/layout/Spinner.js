import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <React.Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{width: '200px', display: 'block', margin: 'auto'}}
    />
  </React.Fragment>
);

export default Spinner;
