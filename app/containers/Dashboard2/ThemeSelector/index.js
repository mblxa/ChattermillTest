import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from '../reducer';
import saga from '../saga';
import { makeSelectThemes } from '../selectors';
import { listThemes } from '../actions';

const ThemeSelector = props => {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    props.dispatch(listThemes(offset));
  }, [offset]);

  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <h5>Select filter</h5>
          </div>
          <div className="col-6">
            Current: {props.selected ? props.selected.name : ''}{' '}
            {props.selected && (
              <span
                className="badge badge-primary"
                onClick={() => props.setSelected(undefined)}
                style={{ cursor: 'pointer' }}
              >
                {'X'}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            {offset > 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setOffset(offset - 20)}
              >
                {'<'}
              </button>
            )}
          </div>
          <div className="col-8">
            {props.themes.map(theme => (
              <span
                key={theme.id}
                className="badge badge-info"
                style={{ marginRight: '10px', cursor: 'pointer' }}
                onClick={() => {
                  props.setSelected(theme);
                }}
              >
                {theme.name}
              </span>
            ))}
          </div>
          <div className="col-2">
            {props.themes.length === 20 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setOffset(offset + 20)}
              >
                {'>'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ThemeSelector.propTypes = {
  dispatch: PropTypes.func.isRequired,
  themes: PropTypes.array.isRequired,
  selected: PropTypes.object,
  setSelected: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  themes: makeSelectThemes(),
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

export default compose(withConnect)(ThemeSelector);
