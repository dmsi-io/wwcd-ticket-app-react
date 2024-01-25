import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Layout from '@wedgekit/layout';
import { Card } from '@wedgekit/core';
import { Title } from '@wedgekit/primitives';

import ImageWrapper from '../styled/ImageWrapper';

const Container = styled(Layout.Grid)`
  padding-bottom: 5vh;
`;

const Categories = (props) => (
  <Container columns={['repeat(auto-fill, minmax(200px, 0.5fr))']} areas={[]} multiplier={2}>
    {Object.values(props.categories)
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      .map((category) => (
        <Card key={category.name} onClick={() => props.onClick(Object.assign({}, category))}>
          <Layout.Grid columns={[1]} areas={[]} multiplier={2}>
            <ImageWrapper>
              <img src={category.image} alt={category.name} />
            </ImageWrapper>
            <Title level={3} elementLevel={3}>
              {category.name}
            </Title>
          </Layout.Grid>
        </Card>
      ))}
  </Container>
);

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Categories;
