import React from 'react';
import PropTypes from 'prop-types';

const RowJustify = ({ children, size }) => (
  <div className="row justify-content-center">
    <div className={`col-lg-${size}`}>{children}</div>
  </div>
);

RowJustify.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  size: PropTypes.number.isRequired,
};

export default RowJustify;
