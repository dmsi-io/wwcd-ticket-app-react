import React from 'react';
import PropTypes from 'prop-types';

import data from './data';

import './Categories.scss';


// TODO: Update this when categories API is built
const Categories = (props) => (
  <div className="card-container">
    {
      props.categoryOpen ?
        <div /> :
        Object.keys(data).map((key) => (
          <div
            className="category-card"
            key={key}
            tabIndex={0}
            onClick={() => props.onClick(Object.assign({}, data[key], { id: key }))}
          >
            <div className="image-wrapper">
              <img src={data[key].image} alt={data[key].title} />
            </div>
            <h3>{data[key].title}</h3>
          </div>
        ))
    }
  </div>
);

Categories.propTypes = {
  categoryOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Categories.defaultProps = {
  categoryOpen: false,
};

export default Categories;
