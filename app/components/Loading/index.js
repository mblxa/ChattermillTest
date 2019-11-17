import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import './style.css';

function Loading() {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

Loading.propTypes = {};

export default Loading;
