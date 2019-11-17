import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import messages from './messages';
import AuthForm from './AuthForm';
import Card from '../../components/bootstrap/Card';
import Wrapper from './Wrapper';
import Loading from '../../components/Loading';
import { authorize } from '../UserProvider/actions';
import saga from '../UserProvider/saga';
import reducer from '../UserProvider/reducers';
import {
  makeSelectAuthError,
  makeSelectInProgress,
  makeSelectUserIsAuthorized,
  makeSelectUserToken,
} from '../UserProvider/selectors';
import { UserContainer } from '../UserProvider/constants';
import Container from '../../components/bootstrap/Container';

const LoginPage = props => {
  const [username, setUsername] = useState('anton');
  const [password, setPassword] = useState('PEv5XFf4e97CnhKw');

  const submitForm = e => {
    e.preventDefault();
    props.authorize(username, password);
  };

  if (props.isAuthorized) {
    return <Redirect to="/" />;
  }
  if (props.inProgress) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="row justify-content-md-center">
        <div className="col-lg-4">
          <Wrapper>
            <Card title={<FormattedMessage {...messages.login} />}>
              <AuthForm
                username={username}
                password={password}
                usernameKeyup={setUsername}
                passwordKeyup={setPassword}
                submitForm={submitForm}
                authError={props.authError}
              />
            </Card>
          </Wrapper>
        </div>
      </div>
    </Container>
  );
};

LoginPage.propTypes = {
  authorize: PropTypes.func,
  isAuthorized: PropTypes.bool,
  authError: PropTypes.bool,
  inProgress: PropTypes.bool,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectUserIsAuthorized(),
  token: makeSelectUserToken(),
  authError: makeSelectAuthError(),
  inProgress: makeSelectInProgress(),
});

const mapDispatchToProps = dispatch => ({
  authorize: (username, password) => dispatch(authorize(username, password)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: UserContainer, saga });
const withReducer = injectReducer({ key: UserContainer, reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(LoginPage);
