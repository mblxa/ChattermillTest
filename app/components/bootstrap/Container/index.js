import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => <div className="container">{children}</div>;

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Container;
