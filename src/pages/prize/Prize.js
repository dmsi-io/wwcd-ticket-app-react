import React from 'react';
import styled from 'styled-components';

import {
  Modal,
  Button,
  ConfirmationDialog,
  Loading,
} from '@wedgekit/core';
import Lozenge from '@atlaskit/lozenge';
import Layout from '@wedgekit/layout';
import { Title, Text } from '@wedgekit/primitives';
import color from '@wedgekit/color';

import api from '../../utils/api';
import storage from '../../utils/storage';

const Image = styled.img`
  width: 100%;
  overflow: hidden;
  object-fit: cover;
`;

const ModalDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${color.B500};
  display: block;
  margin: 3rem 0;
`;

export default class Prize extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationOpen: false,
      ticketCount: 1,
      saving: false,
    };
  }

  commitTicket = async () => {
    this.setState({ saving: true, confirmationOpen: false });

    await api.post('/users/me/tickets', {
      data: {
        attributes: {
          ticketCount: this.state.ticketCount,
          prize: this.props.prize.id,
          user: parseInt(storage.get('userID'), 10),
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
    const { ticketCount } = this.state;

    const commitButtonText = `Add ${ticketCount} Ticket${ticketCount > 1 ? 's' : ''}`;

    return (
      <Modal
        underlayClickExits
        onExit={this.handleExit}
      >
        {
          this.state.saving &&
            <Loading />
        }
        <Layout.Grid columns={[1]} areas={[]} multiplier={2}>
          <Image src={prize.image} alt={prize.title} />
          <Title level={2} elementLevel={2}>{prize.title}</Title>
          <div>
            <Lozenge>
              {this.props.categories[prize.categoryId].name}
            </Lozenge>
          </div>
          <Text>{prize.description}</Text>
          <ModalDivider />
          <Layout.Grid columns={[1, 1]} areas={[]}>
            <Layout.Grid columns={[1]} areas={[]}>
              <Text style={{ textAlign: 'center' }}><strong>Tickets in Bucket</strong></Text>
              <Title style={{ fontSize: '60px', textAlign: 'center' }} level={1} elementLevel={3}>{prize.committedTickets || 0}</Title>
            </Layout.Grid>
            <Layout.Grid columns={[1]} areas={[]}>
              <Text style={{ textAlign: 'center' }}><strong>Your Tickets in Bucket</strong></Text>
              <Title style={{ fontSize: '60px', textAlign: 'center' }} level={1} elementLevel={3}>{userPrize.committedTickets || 0}</Title>
            </Layout.Grid>
          </Layout.Grid>
          {
            this.props.userInfo.tickets.remaining ?
              <Layout.Grid columns={['repeat(3, minmax(0, max-content))']} areas={[]} justify="center">
                <Button
                  disabled={ticketCount < 2}
                  onClick={() => this.setState(({ ticketCount }) => ({ ticketCount: ticketCount - 1 }))}
                >
                  -
                </Button>
                <Button domain="primary" onClick={this.toggleConfirmationDialog}>{commitButtonText}</Button>
                <Button
                  domain="primary"
                  disabled={ticketCount === this.props.userInfo.tickets.remaining}
                  onClick={() => this.setState(({ ticketCount }) => ({ ticketCount: ticketCount + 1 }))}
                >
                  +
                </Button>
              </Layout.Grid> :
              <p>You're all out of tickets</p>
          }
        </Layout.Grid>
        {
          this.state.confirmationOpen &&
            <ConfirmationDialog
              primaryLabel="Yes"
              message={<Text>Are you sure you want to commit <strong>{ticketCount} ticket{ticketCount > 1 ? 's' : ''}</strong>? You cannot undo this action.</Text>}
              primaryDomain="danger"
              onExit={this.toggleConfirmationDialog}
              onAction={this.commitTicket}
            />
        }
      </Modal>
    );
  }
}
