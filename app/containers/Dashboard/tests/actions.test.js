import { REVIEW_ACTIONS } from '../constants';
import { listReviews } from '../actions';

describe('Dashboard actions', () => {
  describe('listReviews', () => {
    it('default', () => {
      const expected = {
        type: REVIEW_ACTIONS.LIST.CALL,
        offset: 0,
        theme_id: undefined,
      };
      expect(listReviews()).toEqual(expected);
    });

    it('listReviews with offset', () => {
      const expected = {
        type: REVIEW_ACTIONS.LIST.CALL,
        offset: 10,
        theme_id: undefined,
      };
      expect(listReviews(10)).toEqual(expected);
    });

    it('listReviews with offset and theme_id', () => {
      const expected = {
        type: REVIEW_ACTIONS.LIST.CALL,
        offset: 10,
        theme_id: 1,
      };
      expect(listReviews(10, 1)).toEqual(expected);
    });
  });
});
