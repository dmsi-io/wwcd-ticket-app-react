import React from 'react';
import Layout from '@wedgekit/layout';
import ImageWrapper from './styled/ImageWrapper';
import { Title } from '@wedgekit/primitives';
import { Card as BaseCard } from '@wedgekit/core';
import styled from 'styled-components';

const Card = styled(BaseCard)`
  border-radius: 4px;
  cursor: pointer;
`;

const PrizeCard = ({ openPrize, title, image, multiplier }) => (
  <Card onClick={openPrize}>
    <Layout.Grid columns={[1]} areas={[]} multiplier={2}>
      <div>
        <ImageWrapper>
          {multiplier && multiplier > 1 ? <p>x{multiplier}</p> : null}
          <img src={image} alt={title} />
        </ImageWrapper>
        <Title level={3} elementLevel={3}>
          {title}
        </Title>
      </div>
    </Layout.Grid>
  </Card>
);

export default PrizeCard;
