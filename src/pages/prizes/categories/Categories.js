import React from 'react';
import PropTypes from 'prop-types';
import sortOn from 'sort-on';

import Card from '../../../components/card';

// TODO: Update this when categories API is built
const Categories = (props) => (
  <div className="card-container">
    {
      sortOn(
        Object.keys(props.categories).map((k) => props.categories[k]),
        'name'
      ).map((category) => (
        <Card
          title={category.name}
          key={category.id}
          image={category.image}
          alt={category.name}
          onClick={() => props.onClick(Object.assign({}, category))}
        />
      ))
    }
  </div>
);

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Categories;
