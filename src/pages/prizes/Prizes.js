import React from 'react';
import sortOn from 'sort-on';
import qs from 'qs';
import styled from 'styled-components';

import {
  Tabs,
} from '@wedgekit/core';
import Layout from '@wedgekit/layout';
import { Text, Title } from '@wedgekit/primitives';

import history from '../../utils/history';

import Categories from './categories';
import UserHeader from '../../components/header';
import { Prize } from '../';

import Scroll from './styled/Scroll';
import Container from './styled/Container';
import ContentWrapper from './styled/ContentWrapper';

import Card from './Card';

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem;
`;

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

const Prizes = (props) => {
  const queryParams = qs.parse(history.location.search.replace('?', ''));
  const prizes = Object.keys(props.prizes).map((k) => props.prizes[k]);
  const userPrizes = Object.keys(props.userPrizes).map((k) => props.userPrizes[k]);

  return (
    <>
      <Container columns={[1]} areas={[]} multiplier={2} rows={['minmax(0, max-content)', 1]}>
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
                  { id: 'all', label: 'All Gifts', href: '/prizes?view=all' },
                ]}
              </Tabs>
              {
                (queryParams.view === 'categories' || !queryParams.view) &&
                <div>
                  <Layout.Grid columns={['minamx(0, max-content)']} justify="start" areas={[]}>
                    {
                      queryParams.categoryId ?
                        <Title level={2} elementLevel={2}>{props.categories[queryParams.categoryId].name}</Title> :
                        <Title level={2} elementLevel={2}>All Categories</Title>
                    }
                  </Layout.Grid>
                  {
                    queryParams.categoryId ?
                      <Layout.Grid columns={[1, 1, 1, 1]} columnsMd={[1, 1, 1]} columnsSm={[1, 1]} areas={[]} multiplier={2}>
                        {
                          sortOn(prizes, 'title')
                            .filter((prize) => prize.categoryId === parseInt(queryParams.categoryId, 10))
                            .map((prize) => (
                              <Card key={prize.id} openPrize={openPrize(prize.id)} {...prize} />
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
                <Layout.Grid columns={[1, 1, 1, 1]} columnsMd={[1, 1, 1]} columnsSm={[1, 1]} areas={[]} multiplier={2}>
                  {
                    sortOn(queryParams.view === 'all' ? prizes : userPrizes, 'title').map((prize) => (
                      <Card key={prize.id} openPrize={openPrize(prize.id)} {...prize} />
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
            <Footer>
              <Text>Built <span role="img" aria-label="Fast and Powerful">⚡️</span> with <strong>WedgeKit</strong></Text>
            </Footer>
          </ContentWrapper>
        </Scroll>
      </Container>
    </>
  );
};

export default Prizes;
