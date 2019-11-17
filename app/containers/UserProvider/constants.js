import { API_ROOT } from '../../api-config';
import { actionCreator } from '../../utils/actionCreator';

export const UserContainer = `UserProvider`;
export const UserContainerKey = name => `UserProvider${name}`;
export const UserContainerAPI = `${API_ROOT}/login`;

export const USER_ACTIONS = {
  ...actionCreator('AUTH', UserContainer),
  ...actionCreator('LOGOUT', UserContainer),
};
