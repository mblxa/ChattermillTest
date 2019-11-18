/**
 *
 * Dashboard
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectReviews } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { listReviews } from './actions';
import Container from '../../components/bootstrap/Container';
import ThemeTag from './ThemeTag';
import ThemeSelector from './ThemeSelector';
import Authorization from '../../components/Authorization';

export const Dashboard = props => {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    props.dispatch(listReviews(offset, selected ? selected.id : undefined));
  }, [offset, selected]);

  return (
    <Authorization>
      <Container>
        <h1>Dashboard</h1>
        <ThemeSelector selected={selected} setSelected={setSelected} />
        <div
          className="row justify-content-end"
          style={{ marginBottom: '20px' }}
        >
          {offset > 0 && (
            <div className="col-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setOffset(offset - 20)}
              >
                Prev
              </button>
            </div>
          )}
          <div className="col-2">
            {props.reviews.length === 20 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setOffset(offset + 20)}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="row">
          {props.reviews.map(review => (
            <div
              key={review.id}
              className="col-lg-3"
              style={{ marginBottom: '20px' }}
            >
              <div className="card">
                <div className="card-body">
                  <p
                    className="card-text"
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                    title={review.comment}
                  >
                    {review.comment}
                  </p>
                  {review.themes.map(theme => (
                    <ThemeTag theme={theme} key={theme.theme_id} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Authorization>
  );
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reviews: makeSelectReviews(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Dashboard);
