/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { REVIEW_ACTIONS, THEME_ACTIONS } from './constants';

const themeBoilerplate = {
  id: 0,
  name: '',
};

export const initialState = {
  reviews: [],
  reviewsProgress: false,
  review: {
    id: 0,
    text: '',
    themes: [],
  },
  themes: [],
  theme: {},
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REVIEW_ACTIONS.LIST.CALL:
        draft.reviewsProgress = true;
        break;
      case REVIEW_ACTIONS.LIST.SUCCESS:
        draft.reviews = action.reset
          ? action.data
          : state.reviews.concat(action.data);
        draft.reviewsProgress = false;
        break;
      case REVIEW_ACTIONS.LIST.FAIL:
        draft.reviewsProgress = false;
        break;
      case THEME_ACTIONS.LIST.SUCCESS:
        draft.themes = action.data;
        action.data.forEach(theme => {
          draft.theme[theme.id] = theme;
        });
        break;
      case THEME_ACTIONS.GET.CALL:
        if (!draft.theme[action.id]) {
          draft.theme[action.id] = themeBoilerplate;
        }
        break;
      case THEME_ACTIONS.GET.SUCCESS:
        draft.theme[action.data.id] = action.data;
        break;
    }
  });

export default dashboardReducer;
