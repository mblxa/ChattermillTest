import { REVIEW_ACTIONS, THEME_ACTIONS } from './constants';

export const listReviews = (offset = 0, theme_id = undefined) => ({
  type: REVIEW_ACTIONS.LIST.CALL,
  offset,
  theme_id,
});
export const listReviewsSuccess = data => ({
  type: REVIEW_ACTIONS.LIST.SUCCESS,
  data,
});
export const listReviewsFail = error => ({
  type: REVIEW_ACTIONS.LIST.FAIL,
  error,
});

export const listThemes = (offset = 0) => ({
  type: THEME_ACTIONS.LIST.CALL,
  offset,
});
export const listThemesSuccess = data => ({
  type: THEME_ACTIONS.LIST.SUCCESS,
  data,
});
export const listThemesFail = error => ({
  type: THEME_ACTIONS.LIST.FAIL,
  error,
});

export const getTheme = id => ({
  type: THEME_ACTIONS.GET.CALL,
  id,
});
export const getThemeSuccess = data => ({
  type: THEME_ACTIONS.GET.SUCCESS,
  data,
});
export const getThemeFail = error => ({
  type: THEME_ACTIONS.GET.FAIL,
  error,
});
