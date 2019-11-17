import { call, put, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import cookie from 'js-cookie';

import { API_ROOT } from '../../api-config';
import request from '../../utils/request';
import { USER_ACTIONS } from './constants';

function* fetchUser(action) {
  const bodyFormData = new FormData();
  bodyFormData.set('username', action.username);
  bodyFormData.set('password', action.password);
  const requestURL = `${API_ROOT}/login`;
  const options = {
    method: 'post',
    mode: 'cors',
    body: bodyFormData,
    // headers: { 'Content-Type': 'multipart/form-data' },
  };

  try {
    const user = yield call(request, requestURL, options);
    yield put({ type: USER_ACTIONS.AUTH.SUCCESS, user });

    const date = moment(user.expire);
    cookie.set('token', user.token, { expires: date.toDate() });
  } catch (e) {
    yield put({ type: USER_ACTIONS.AUTH.FAIL, message: e.message });
  }
}

export default function* userSaga() {
  yield takeEvery(USER_ACTIONS.AUTH.CALL, fetchUser);
}
