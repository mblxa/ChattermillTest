import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { API_ROOT } from '../../api-config';
import request from '../../utils/request';
import { makeSelectUserToken } from '../UserProvider/selectors';
import {
  getThemeFail,
  getThemeSuccess,
  listReviewsFail,
  listReviewsSuccess,
  listThemesFail,
  listThemesSuccess,
} from './actions';
import { REVIEW_ACTIONS, THEME_ACTIONS } from './constants';
import { makeSelectThemeById } from './selectors';
import {logout} from "../UserProvider/actions";

function* listReviewsSaga(action) {
  const token = yield select(makeSelectUserToken());
  const requestURL = `${API_ROOT}/api/reviews?offset=${action.offset}${
    action.theme_id ? `&theme_id=${action.theme_id}` : ''
  }`;
  const options = {
    method: 'get',
    mode: 'cors',
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const data = yield call(request, requestURL, options);
    yield put(listReviewsSuccess(data.data));
  } catch (e) {
    yield put(listReviewsFail(e.message));
    if (e.code === 401) yield put(logout());
  }
}

function* listThemesSaga(action) {
  const token = yield select(makeSelectUserToken());
  const requestURL = `${API_ROOT}/api/themes?offset=${action.offset}`;
  const options = {
    method: 'get',
    mode: 'cors',
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const data = yield call(request, requestURL, options);
    yield put(listThemesSuccess(data.data));
  } catch (e) {
    yield put(listThemesFail(e.message));
    if (e.code === 401) yield put(logout());
  }
}

function* getThemeSaga(action) {
  const themeSelector = yield select(makeSelectThemeById());

  if (themeSelector(action.id).id !== 0) {
    return true;
  }

  const token = yield select(makeSelectUserToken());
  const requestURL = `${API_ROOT}/api/themes/${action.id}`;
  const options = {
    method: 'get',
    mode: 'cors',
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const data = yield call(request, requestURL, options);
    yield put(getThemeSuccess(data.data));
  } catch (e) {
    yield put(getThemeFail(e.message));
    if (e.code === 401) yield put(logout());
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  yield takeEvery(REVIEW_ACTIONS.LIST.CALL, listReviewsSaga);
  yield takeEvery(THEME_ACTIONS.LIST.CALL, listThemesSaga);
  yield takeEvery(THEME_ACTIONS.GET.CALL, getThemeSaga);
  // See example in containers/HomePage/saga.js
}
