import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './style.css';

function Loading() {
  return (
    <div className="loader">
      <FormattedMessage {...messages.loading} />
    </div>
  );
}

Loading.propTypes = {};

export default Loading;
