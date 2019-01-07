import React from 'react';
import {
  NewTabGroup,
  Tab,
} from '@dmsi/wedgekit';

import api from '../../utils/api';
import history from '../../utils/history';
import Categories from './categories';
import Card from '../../components/card';

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

  openCategory = (category) => {
    history.push(`/prizes/categories/${category.id}`);
  };

  render() {
    const { id } = this.props.match.params;

    return (
      <NewTabGroup
        activeTabId={id ?
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
                  id ?
                    <h2>{this.props.categories.find((c) => c.id === id).attributes.name}</h2> :
                    <h2>All Categories</h2>
                }
                <div className="spacer" />
              </div>
            }
            {
              id ?
                <div className="card-container">
                  {
                    this.props.prizes
                      .filter((prize) => prize.attributes.category === id)
                      .map((prize) => (
                        <Card
                          key={prize.id}
                          title={prize.attributes.title}
                          alt={prize.attributes.title}
                          image={prize.attributes.image}
                          onClick={() => {
                          }}
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
              this.props.prizes.map((prize) => (
                <Card
                  key={prize.id}
                  title={prize.attributes.title}
                  alt={prize.attributes.title}
                  image={prize.attributes.image}
                  onClick={() => {}}
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
    );
  }
}
