import { USER_ACTIONS } from './constants';

export function authorize(username, password) {
  return {
    type: USER_ACTIONS.AUTH.CALL,
    username,
    password,
  };
}

export function checkToken() {
  return {
    type: USER_ACTIONS.CHECK_TOKEN.CALL,
  };
}

export function logout() {
  return {
    type: USER_ACTIONS.LOGOUT.CALL,
  };
}
