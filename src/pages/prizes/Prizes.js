import React from 'react';
import {
  NewTabGroup,
  Tab,
  Header,
} from '@dmsi/wedgekit';
import sortOn from 'sort-on';
import qs from 'qs';
import Badge from '@atlaskit/badge';

import history from '../../utils/history';

import Categories from './categories';
import Card from '../../components/card';
import UserHeader from '../../components/header';
import { Prize } from '../';
import HeaderRight from '../../components/headerRight';

import './Prizes.scss';

const handleTabChange = (view) => () => {
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
    <React.Fragment>
      <Header
        collapsed
        tagline="Holiday Party"
        rightContent={<HeaderRight />}
      />
      <UserHeader />
      <NewTabGroup
        activeTabId={queryParams.view || 'categories'}
        onChange={handleTabChange}
      >
        <Tab
          label="Categories"
          id="categories"
        >
          <div>
            <div className="categories-header">
              {
                queryParams.categoryId ?
                  <h2>{props.categories[queryParams.categoryId].name}</h2> :
                  <h2>All Categories</h2>
              }
              <div className="spacer" />
            </div>
            {
              queryParams.categoryId ?
                <div className="card-container">
                  {
                    sortOn(prizes, 'title')
                      .filter((prize) => prize.category === queryParams.categoryId)
                      .map((prize) => (
                        <Card
                          key={prize.id}
                          title={prize.title}
                          alt={prize.title}
                          image={prize.image}
                          onClick={openPrize(prize.id)}
                        >
                          <p>
                            <span>Tickets in Bucket:</span>
                            <Badge>{prize.committedTickets}</Badge>
                          </p>
                        </Card>
                      ))
                  }
                </div>:
                <Categories
                  categories={props.categories}
                  onClick={openCategory}
                />
            }
          </div>
        </Tab>
        <Tab
          label="All Prizes"
          id="all"
        >
          <div className="card-container">
            {
              sortOn(prizes, 'title').map((prize) => (
                <Card
                  key={prize.id}
                  title={prize.title}
                  alt={prize.title}
                  image={prize.image}
                  onClick={openPrize(prize.id)}
                >
                  <p>
                    <span>Total Tickets in Bucket:</span>
                    <Badge>{prize.committedTickets}</Badge>
                  </p>
                </Card>
              ))
            }
          </div>
        </Tab>
        <Tab
          label="My Entries"
          id="mine"
        >
          <div className="card-container">
            {
              sortOn(userPrizes, 'title').map((prize) => (
                <Card
                  key={prize.id}
                  title={prize.title}
                  alt={prize.title}
                  image={prize.image}
                  onClick={openPrize(prize.id)}
                >
                  <p>
                    <span>My Tickets in Bucket:</span>
                    <Badge>{prize.committedTickets}</Badge>
                  </p>
                </Card>
              ))
            }
          </div>
        </Tab>
      </NewTabGroup>
      {
        queryParams.prizeId &&
        <Prize
          id={queryParams.prizeId}
          onExit={hidePrize}
        />
      }
    </React.Fragment>
  );
};
