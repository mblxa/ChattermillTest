/**
 *
 * Authorization
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Redirect } from 'react-router-dom';
import { makeSelectUserIsAuthorized } from '../../containers/UserProvider/selectors';

import { UserContainer } from '../../containers/UserProvider/constants';
import saga from '../../containers/UserProvider/saga';
import reducer from '../../containers/UserProvider/reducers';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Authorization(props) {
  return props.isAuthorized === undefined ? (
    <Redirect to="/signin" />
  ) : (
    props.children
  );
}

Authorization.propTypes = {
  isAuthorized: PropTypes.bool,
  children: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectUserIsAuthorized(),
});

const withConnect = connect(mapStateToProps);

const withSaga = injectSaga({ key: UserContainer, saga });
const withReducer = injectReducer({ key: UserContainer, reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(Authorization);
