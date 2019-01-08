import React from 'react';
import {
  Modal,
  Button,
  ConfirmationDialog,
  Loading,
} from '@dmsi/wedgekit';
import Lozenge from '@atlaskit/lozenge';

import api from '../../utils/api';
import storage from '../../utils/storage';

import './Prize.scss';

export default class Prize extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationOpen: false,
      saving: false,
    };
  }

  commitTicket = async () => {
    this.setState({ saving: true, confirmationOpen: false });

    await api.post('/users/me/tickets', {
      data: {
        attributes: {
          prize: this.props.prize.id,
          user: storage.get('userID'),
        }
      }
    }, true);

    const newTicketCount = await api.get(`/prizes/${this.props.prize.id}`)
      .then(([err, { data }]) => data.attributes.committedTickets);
    const newUserTicketCount = await api.get(`/users/me`, true)
      .then(([err, { data }]) => data.attributes.tickets);
    const newUserPrizes = await api.get('/users/me/prizes', true)
      .then(([err, { data }]) => data);

    this.props.updateTicketCount(this.props.prize.id, newTicketCount);
    this.props.updateUserTicketCount(newUserTicketCount);
    this.props.updateUserPrizes(newUserPrizes);

    this.setState({ saving: false });
  };

  handleExit = () => {
    if (!this.state.saving && !this.state.confirmationOpen) {
      this.props.onExit();
    }
  };

  toggleConfirmationDialog = () => {
    this.setState((prevState) => ({ confirmationOpen: !prevState.confirmationOpen }));
  };

  render() {
    const { prize, userPrize } = this.props;

    return (
      <Modal
        underlayClickExits
        onExit={this.handleExit}
      >
        {
          this.state.saving &&
            <Loading />
        }
        <div className="modal-content">
          <img src={prize.image} alt={prize.title} />
          <h2>{prize.title}</h2>
          <Lozenge>
            {this.props.categories[prize.category].name}
          </Lozenge>
          <p className="modal-description">{prize.description}</p>
          <div className="modal-section-divider" />
          <div className="counter-container">
            <div className="counter">
              <p>Tickets in Bucket</p>
              <h3>{prize.committedTickets}</h3>
            </div>
            <div className="counter">
              <p>Your Tickets in Bucket</p>
              <h3>{userPrize.committedTickets || 0}</h3>
            </div>
          </div>
          <div className="modal-footer">
            {
              this.props.userInfo.tickets.remaining ?
                <Button onClick={this.toggleConfirmationDialog}>Add Ticket</Button> :
                <p>You're all out of tickets</p>
            }
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
