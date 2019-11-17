/**
 *
 * ThemeTag
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectThemeById } from '../selectors';
import { getTheme } from '../actions';
import reducer from '../reducer';
import saga from '../saga';

function ThemeTag(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  useEffect(() => {
    props.dispatch(getTheme(props.theme.theme_id));
  }, []);

  let badgeColor;

  switch (props.theme.sentiment) {
    case 1:
      badgeColor = 'success';
      break;
    case 0:
      badgeColor = 'warning';
      break;
    default:
      badgeColor = 'secondary';
  }

  const theme = props.themeSelector(props.theme.theme_id);
  if (!theme) {
    return <div />;
  }

  return (
    <span
      className={`badge badge-${badgeColor}`}
      style={{ marginRight: '10px' }}
    >
      {theme.name}
    </span>
  );
}

ThemeTag.propTypes = {
  theme: PropTypes.object,
  themeSelector: PropTypes.func,
  dispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  themeSelector: makeSelectThemeById(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ThemeTag);
