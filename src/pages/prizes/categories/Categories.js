import React from 'react';
import PropTypes from 'prop-types';
import sortOn from 'sort-on';

import Card from '../../../components/card';

// TODO: Update this when categories API is built
const Categories = (props) => (
  <div className="card-container">
    {
      sortOn(props.categories, 'attributes.name').map((category) => (
        <Card
          title={category.attributes.name}
          key={category.id}
          image={category.attributes.image}
          alt={category.attributes.name}
          onClick={() => props.onClick(Object.assign({}, category))}
        />
      ))
    }
  </div>
);

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Categories;
