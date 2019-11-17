import { createSelector } from 'reselect';
import { initialState } from './reducers';
import { UserContainer } from './constants';

const selectUser = state => state[UserContainer] || initialState;

const makeSelectUserToken = () =>
  createSelector(
    selectUser,
    userState => userState.token,
  );

const makeSelectUserIsAuthorized = () =>
  createSelector(
    selectUser,
    userState => userState.isAuthorized,
  );

const makeSelectInProgress = () =>
  createSelector(
    selectUser,
    userState => userState.inProgress,
  );

const makeSelectAuthError = () =>
  createSelector(
    selectUser,
    userState => userState.authFail,
  );

export {
  selectUser,
  makeSelectUserToken,
  makeSelectUserIsAuthorized,
  makeSelectInProgress,
  makeSelectAuthError,
};
