import produce from 'immer';
import cookie from 'js-cookie';
import { USER_ACTIONS } from './constants';

let tokenFromCookie;

try {
  const token = cookie.get('token');
  tokenFromCookie = token || undefined;
} catch (e) {
  tokenFromCookie = undefined;
}

export const initialState = {
  token: tokenFromCookie,
  isAuthorized: tokenFromCookie ? true : undefined,
  authFail: false,
  inProgress: false,
  errors: '',
};
/* eslint-disable default-case, no-param-reassign */
const UserProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USER_ACTIONS.AUTH.SUCCESS:
        draft.token = action.user.token;
        draft.inProgress = false;
        draft.authFail = false;
        draft.isAuthorized = true;
        break;
      case USER_ACTIONS.AUTH.FAIL:
        localStorage.clear();
        draft.inProgress = false;
        draft.authFail = true;
        draft.isAuthorized = false;
        break;
      case USER_ACTIONS.AUTH.CALL:
        draft.inProgress = true;
        draft.authFail = false;
        draft.isAuthorized = undefined;
        break;
      case USER_ACTIONS.LOGOUT.CALL:
        localStorage.clear();
        draft.inProgress = false;
        draft.authFail = false;
        draft.isAuthorized = undefined;
        draft.token = undefined;
        break;
    }
  });

export default UserProviderReducer;
