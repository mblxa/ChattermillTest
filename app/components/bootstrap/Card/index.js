import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, children }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title text-center">{title}</h5>
      {children}
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Card;
