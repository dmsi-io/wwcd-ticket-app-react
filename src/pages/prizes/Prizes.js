import React from 'react';
import {
  NewTabGroup,
  Tab,
} from '@dmsi/wedgekit';

import api from '../../utils/api';
import history from '../../utils/history';
import Categories from './categories';
import categoryData from './categories/data';

import './Prizes.scss';

export default class Prizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    api.get('/prizes').then((data) => {
      console.log(data);
    });
    api.get('/users/me/prizes', true).then((data) => {
      console.log(data);
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
            <div className="categories-header">
              {
                id ?
                  <h2>{categoryData[id].title}</h2> :
                  <h2>All Categories</h2>
              }
              <div className="spacer" />
            </div>
            <Categories
              categoryOpen={Boolean(id)}
              onClick={this.openCategory}
            />
          </div>
        </Tab>
        <Tab
          label="All Prizes"
          id="/prizes"
        >
          <p>Hello</p>
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
