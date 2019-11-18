import { makeSelectReviews, makeSelectReviewsProgress } from '../selectors';

describe('selectDashboardDomain', () => {
  it('makeSelectReviews', () => {
    const selector = makeSelectReviews();
    const mockedState = {
      dashboard: {
        reviews: [],
      },
    };
    expect(selector(mockedState)).toEqual([]);
  });

  it('makeSelectReviewsProgress', () => {
    const selector = makeSelectReviewsProgress();
    const mockedState = {
      dashboard: {
        reviewsProgress: true,
      },
    };
    expect(selector(mockedState)).toEqual(true);
  });
});
