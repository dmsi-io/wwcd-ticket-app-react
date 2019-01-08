import React from 'react';
import {
  NewTabGroup,
  Tab,
} from '@dmsi/wedgekit';
import sortOn from 'sort-on';
import qs from 'qs';

import api from '../../utils/api';
import history from '../../utils/history';
import Categories from './categories';
import Card from '../../components/card';
import Prize from '../prize';
import Header from '../../components/header';

import './Prizes.scss';

export default class Prizes extends React.Component {
  componentDidMount() {
    api.get('/users/me/prizes', true).then((data) => {
      // console.log(data);
    });
  }

  handleTabChange = (tab) => () => {
    history.push(tab);
  };

  hidePrize = () => {
    const baseUrl = this.props.match.params.categoryId ?
      `/prizes/categories/${this.props.match.params.categoryId}` :
      `/prizes`;
    history.push(baseUrl);
  };

  openCategory = (category) => {
    history.push(`/prizes/categories/${category.id}`);
  };

  openPrize = (prizeId) => () => {
    const baseUrl = this.props.match.params.categoryId ?
      `/prizes/categories/${this.props.match.params.categoryId}` :
      `/prizes`;
    history.push(`${baseUrl}?${qs.stringify({ prizeId })}`);
  };

  render() {
    const { categoryId } = this.props.match.params;
    const queryParams = qs.parse(history.location.search.replace('?', ''));

    return (
      <React.Fragment>
        <Header />
        <NewTabGroup
          activeTabId={categoryId ?
            '/prizes/categories' :
            this.props.match.path
          }
          onChange={this.handleTabChange}
        >
          <Tab
            label="Categories"
            id="/prizes/categories"
          >
            <div>
              {
                this.props.categories.length > 0 &&
                <div className="categories-header">
                  {
                    categoryId ?
                      <h2>{this.props.categories.find((c) => c.id === categoryId).attributes.name}</h2> :
                      <h2>All Categories</h2>
                  }
                  <div className="spacer" />
                </div>
              }
              {
                categoryId ?
                  <div className="card-container">
                    {
                      sortOn(this.props.prizes, 'attributes.title')
                        .filter((prize) => prize.attributes.category === categoryId)
                        .map((prize) => (
                          <Card
                            key={prize.id}
                            title={prize.attributes.title}
                            alt={prize.attributes.title}
                            image={prize.attributes.image}
                            onClick={this.openPrize(prize.id)}
                          />
                        ))
                    }
                  </div>:
                  <Categories
                    categories={this.props.categories}
                    onClick={this.openCategory}
                  />
              }
            </div>
          </Tab>
          <Tab
            label="All Prizes"
            id="/prizes"
          >
            <div className="card-container">
              {
                sortOn(this.props.prizes, 'attributes.title').map((prize) => (
                  <Card
                    key={prize.id}
                    title={prize.attributes.title}
                    alt={prize.attributes.title}
                    image={prize.attributes.image}
                    onClick={this.openPrize(prize.id)}
                  />
                ))
              }
            </div>
          </Tab>
          <Tab
            label="My Prizes"
            id="/prizes/me"
          >
            <p>
              All Prizes
            </p>
          </Tab>
        </NewTabGroup>
        {
          queryParams.prizeId &&
          <Prize
            id={queryParams.prizeId}
            onExit={this.hidePrize}
            categories={this.props.categories}
          />
        }
      </React.Fragment>
    );
  }
}
