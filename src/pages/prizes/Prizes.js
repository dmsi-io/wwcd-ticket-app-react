import React from 'react';
import sortOn from 'sort-on';
import qs from 'qs';
import Badge from '@atlaskit/badge';

import {
  Tabs,
  Card,
} from '@wedgekit/core';
import Layout from '@wedgekit/layout';
import { Text, Title } from '@wedgekit/primitives';
import { Wedge } from '@wedgekit/illustrations';
import { IconWidth } from '@wedgekit/icons';

import history from '../../utils/history';

import Categories from './categories';
import UserHeader from '../../components/header';
import { Prize } from '../';
import HeaderRight from '../../components/headerRight';

import Scroll from './styled/Scroll';
import Header from './styled/Header';
import Container from './styled/Container';
import ContentWrapper from './styled/ContentWrapper';

import './Prizes.scss';
import ImageWrapper from './styled/ImageWrapper';

const handleTabChange = (view, e) => {
  e.preventDefault();
  history.push(`/prizes?${qs.stringify({ view })}`);
};

const hidePrize = () => {
  const params = qs.parse(history.location.search.replace('?', ''));
  delete params.prizeId;
  history.push(`/prizes?${qs.stringify(params)}`);
};

const openCategory = (category) => {
  const params = qs.parse(history.location.search.replace('?', ''));
  history.push(`/prizes?${qs.stringify({
    ...params,
    categoryId: category.id, 
  })}`);
};

const openPrize = (prizeId) => () => {
  const params = qs.parse(history.location.search.replace('?', ''));
  history.push(`/prizes?${qs.stringify({
    ...params,  
    prizeId, 
  })}`);
};

export default (props) => {
  const queryParams = qs.parse(history.location.search.replace('?', ''));
  const prizes = Object.keys(props.prizes).map((k) => props.prizes[k]);
  const userPrizes = Object.keys(props.userPrizes).map((k) => props.userPrizes[k]);

  return (
    <Container columns={[1]} areas={[]} multiplier={2} rows={['minmax(0, max-content)', 1]}>
      <Header>
        <Layout.Grid columns={['repeat(2, minmax(0, max-content))']} areas={[]} multiplier={2} align="center">
          <IconWidth iconWidth={32}>
            <Wedge />
          </IconWidth>
          <Text><strong>Holiday Party</strong></Text>
        </Layout.Grid>
        <HeaderRight />
      </Header>
      <Scroll>
        <ContentWrapper>
          <UserHeader />
          <Layout.Grid columns={[1]} areas={[]} multiplier={3}>
            <Tabs
              value={queryParams.view || 'categories'}
              onChange={handleTabChange}
            >
              {[
                { id: 'categories', label: 'Categories', href: '/prizes?view=categories' },
                { id: 'all', label: 'All Prizes', href: '/prizes?view=all' },
                { id: 'mine', label: 'My Entries', href: '/prizes?view=mine' },
              ]}
            </Tabs>
            {
              (queryParams.view === 'categories' || !queryParams.view) &&
              <div>
                <Layout.Grid columns={['minamx(0, max-content)']} justify="end" areas={[]}>
                  {
                    queryParams.categoryId ?
                      <Title level={2} elementLevel={2}>{props.categories[queryParams.categoryId].name}</Title> :
                      <Title level={2} elementLevel={2}>All Categories</Title>
                  }
                </Layout.Grid>
                {
                  queryParams.categoryId ?
                    <Layout.Grid columns={[1, 1]} areas={[]} multiplier={2}>
                      {
                        sortOn(prizes, 'title')
                          .filter((prize) => prize.categoryId === parseInt(queryParams.categoryId, 10))
                          .map((prize) => (
                            <Card onClick={openPrize(prize.id)}>
                              <Layout.Grid columns={[1]} areas={[]} multiplier={2} rows={['minmax(0, max-content)', 1, 'minmax(0, max-content)']}>
                                <div>
                                  <ImageWrapper>
                                    <img src={prize.image} alt={prize.title} />
                                  </ImageWrapper>
                                  <Title level={3} elementLevel={3}>{prize.title}</Title>
                                </div>
                                <div />
                                <Layout.Grid columns={['repeat(2, minmax(0, max-content))']} areas={[]} align="end">
                                  <Text>Total Tickets in Bucket:</Text>
                                  <Badge>{prize.committedTickets}</Badge>
                                </Layout.Grid>
                              </Layout.Grid>
                            </Card>
                          ))
                      }
                    </Layout.Grid>:
                    <Categories
                      categories={props.categories}
                      onClick={openCategory}
                    />
                }
              </div>
            }
            {
              (queryParams.view === 'all' || queryParams.view === 'mine') &&
              <Layout.Grid columns={[1, 1]} areas={[]} multiplier={2}>
                {
                  sortOn(queryParams.view === 'all' ? prizes : userPrizes, 'title').map((prize) => (
                    <Card onClick={openPrize(prize.id)}>
                      <Layout.Grid columns={[1]} areas={[]} multiplier={2} rows={['minmax(0, max-content)', 1, 'minmax(0, max-content)']}>
                        <div>
                          <ImageWrapper>
                            <img src={prize.image} alt={prize.title} />
                          </ImageWrapper>
                          <Title level={3} elementLevel={3}>{prize.title}</Title>
                        </div>
                        <div />
                        <Layout.Grid columns={['repeat(2, minmax(0, max-content))']} areas={[]} align="end">
                          {
                            queryParams.view === 'all' ?
                              <Text>Total Tickets in Bucket:</Text> :
                              <span>My Tickets in Bucket:</span>
                          }
                          <Badge>{prize.committedTickets}</Badge>
                        </Layout.Grid>
                      </Layout.Grid>
                    </Card>
                  ))
                }
              </Layout.Grid>
            }
          </Layout.Grid>
          {
            queryParams.prizeId &&
            <Prize
              id={queryParams.prizeId}
              onExit={hidePrize}
            />
          }
          <footer>
            <Text>Built <span role="img" aria-label="Fast and Powerful">⚡️</span> with <strong>WedgeKit</strong></Text>
          </footer>
        </ContentWrapper>
      </Scroll>
    </Container>
  );
};
