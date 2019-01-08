import React from 'react';
import PropTypes from 'prop-types';

const Card  = (props) => (
  <div
    className="category-card"
    tabIndex={0}
    onClick={props.onClick}
  >
    <div className="image-wrapper">
      <img src={props.image} alt={props.alt} />
    </div>
    <h3>{props.title}</h3>
    <div className="spacer" />
    <div className="category-card-footer">
      {props.children}
    </div>
  </div>
);

Card.propTypes = {
  alt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
