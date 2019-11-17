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
import { makeSelectReviews, makeSelectReviewsProgress } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { listReviews } from './actions';
import Container from '../../components/bootstrap/Container';
import ThemeTag from './ThemeTag';
import ThemeSelector from './ThemeSelector';
import Authorization from '../../components/Authorization';
import Loading from '../../components/Loading';

export const Dashboard = props => {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const [selected, setSelected] = useState(undefined);
  const [pageOffset, setPageOffset] = useState(0);

  useEffect(() => {
    props.dispatch(listReviews(0, selected ? selected.id : undefined, true));
  }, [selected]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const current = window.pageYOffset + window.outerHeight;
    const max = document.documentElement.scrollHeight;
    if (current > max) {
      const postsLeft = !(props.reviews.length % 20 > 0);
      if (!props.reviewsProgress && postsLeft) {
        props.dispatch(
          listReviews(props.reviews.length, selected ? selected.id : undefined),
        );
      }
    }
  }, [pageOffset]);

  const handleScroll = () => {
    setPageOffset(window.pageYOffset);
  };

  return (
    <Authorization>
      <Container>
        <h1>Dashboard</h1>
        <ThemeSelector selected={selected} setSelected={setSelected} />
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
          {props.reviewsProgress && <Loading />}
        </div>
      </Container>
    </Authorization>
  );
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  reviewsProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reviews: makeSelectReviews(),
  reviewsProgress: makeSelectReviewsProgress(),
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
