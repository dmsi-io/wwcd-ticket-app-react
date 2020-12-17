import React from 'react';
import PropTypes from 'prop-types';
import sortOn from 'sort-on';

import Layout from '@wedgekit/layout';
import { Card } from '@wedgekit/core';
import { Title } from '@wedgekit/primitives';

import ImageWrapper from '../styled/ImageWrapper';

const Categories = (props) => (
  <Layout.Grid columns={[1, 1, 1, 1]} columnsMd={[1, 1, 1]} columnsSm={[1, 1]} areas={[]} multiplier={2}>
    {
      sortOn(
        Object.keys(props.categories).map((k) => props.categories[k]),
        'name'
      ).map((category) => (
        <Card key={category.name} onClick={() => props.onClick(Object.assign({}, category))}>
          <Layout.Grid columns={[1]} areas={[]} multiplier={2}>
            <ImageWrapper>
              <img src={category.image} alt={category.name} />
            </ImageWrapper>
            <Title level={3} elementLevel={3}>{category.name}</Title>
          </Layout.Grid>
        </Card>
      ))
    }
  </Layout.Grid>
);

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Categories;
