/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { listReviewsSaga } from '../saga';
import { listReviewsFail, listReviewsSuccess } from '../actions';

const token = 123;
describe('dashboardSaga Saga', () => {
  describe('listReviewsSaga', () => {
    let listGenerator;

    // We have to test twice, once for a successful load and once for an unsuccessful one
    // so we do all the stuff that happens beforehand automatically in the beforeEach
    beforeEach(() => {
      listGenerator = listReviewsSaga({ offset: 0 });

      const selectDescriptor = listGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();

      const selectDescriptorToken = listGenerator.next(token).value;
      expect(selectDescriptorToken).toMatchSnapshot();
    });

    it('should dispatch the listReviewsSuccess action if it requests the data successfully', () => {
      const response = { data: [] };

      const putDescriptor = listGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(listReviewsSuccess(response.data)));
    });

    it('should call the listReviewsFail action if the response errors', () => {
      const response = new Error('Some error');
      const putDescriptor = listGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(listReviewsFail(response.message)));
    });
  });
});
