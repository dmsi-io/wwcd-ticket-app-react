import React from 'react';
import {
  Modal,
  Button,
  ConfirmationDialog,
} from '@dmsi/wedgekit';
import Lozenge from '@atlaskit/lozenge';
import { get } from 'dot-prop';

import api from '../../utils/api';
import storage from '../../utils/storage';

import './Prize.scss';

export default class Prize extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      image: '',
      description: '',
      committedTickets: '',
      category: '',
      confirmationOpen: false,
    };
  }

  componentDidMount() {
    api.get(`/prizes/${this.props.id}`).then(([err, { data }]) => {
      console.log('🐶');
      this.setState({ ...data.attributes });
    });
  }

  commitTicket = () => {
    api.post('/users/me/tickets', {
      data: {
        attributes: {
          prize: this.state.id,
          user: storage.get('userID'),
        }
      }
    }, true);
  };

  toggleConfirmationDialog = () => {
    this.setState((prevState) => ({ confirmationOpen: !prevState.confirmationOpen }));
  };

  render() {
    const category = this.props.categories
      .find((c) => c.id === this.state.category);

    return (
      <Modal
        underlayClickExits
        onExit={this.props.onExit}
      >
        <div className="modal-content">
          <img src={this.state.image} alt={this.state.title} />
          <h2>{this.state.title}</h2>
          <Lozenge>
            {get(category, 'attributes.name')}
          </Lozenge>
          <p className="modal-description">{this.state.description}</p>
          <div className="modal-section-divider" />
          <div className="counter-container">
            <div className="counter">
              <p>Tickets in Bucket</p>
              <h3>{this.state.committedTickets}</h3>
            </div>
            <div className="counter">
              <p>Your Tickets in Bucket</p>
              <h3>0</h3>
            </div>
          </div>
          <div className="modal-footer">
            <Button onClick={this.toggleConfirmationDialog}>Add Ticket</Button>
          </div>
        </div>
        {
          this.state.confirmationOpen &&
            <ConfirmationDialog
              primaryLabel="Yes"
              message={<p>Are you sure you want to commit <strong>1 ticket</strong>? You cannot undo this action.</p>}
              projectContext="danger"
              onExit={this.toggleConfirmationDialog}
              onAction={this.commitTicket}
            />
        }
      </Modal>
    );
  }
}
