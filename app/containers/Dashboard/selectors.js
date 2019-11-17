import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectReviews = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.reviews,
  );

const makeSelectReviewsProgress = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.reviewsProgress,
  );

const makeSelectThemes = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.themes,
  );
const makeSelectThemeById = () =>
  createSelector(
    selectDashboardDomain,
    substate => id => substate.theme[id],
  );

export {
  makeSelectReviews,
  makeSelectThemes,
  makeSelectReviewsProgress,
  makeSelectThemeById,
};
