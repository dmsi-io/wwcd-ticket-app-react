import React from 'react';
import styled from 'styled-components';

import {
  Modal,
  Button,
  Loading,
} from '@wedgekit/core';
import Lozenge from '@atlaskit/lozenge';
import Layout from '@wedgekit/layout';
import { Title, Text } from '@wedgekit/primitives';

import api from '../../utils/api';
import storage from '../../utils/storage';

const Image = styled.img`
  width: 100%;
  overflow: hidden;
  object-fit: cover;
`;

const Container = styled(Layout.Grid)`
  max-width: 500px;
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

  render() {
    const { prize, hasSelection } = this.props;
    return (
      <Modal
        underlayClickExits
        onExit={this.handleExit}
      >
        {
          this.state.saving &&
            <Loading />
        }
        <Container columns={[1]} areas={[]} multiplier={2}>
          <Image src={prize.image} alt={prize.title} />
          <Title level={2} elementLevel={2}>{prize.title}</Title>
          <div>
            <Lozenge>
              {this.props.categories[prize.categoryId].name}
            </Lozenge>
          </div>
          <Text>{prize.description}</Text>
          <Button domain="primary">{
            hasSelection ? 'Swap to This' : 'Choose'
          }</Button>
        </Container>
      </Modal>
    );
  }
}
