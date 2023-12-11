import React from 'react';
import styled from 'styled-components';

import { Alert, Button, Input, Loading, Modal } from '@wedgekit/core';
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
      errors: [],
      ticketCount: 1,
      saving: false,
    };
  }

  commitTicket = async () => {
    this.setState({ saving: true });
    const { ticketCount } = this.state;
    const { prize, updateUserPrizes, updateUserTicketCount, userInfo } = this.props;

    const [err] = await api.post(
      '/users/me/tickets',
      {
        data: {
          attributes: {
            ticketCount,
            prize: prize.id,
            user: Number.parseInt(storage.get('userID'), 10),
          },
        },
      },
      true,
    );

    if (err) {
      this.setState({
        errors: err.errors,
        saving: false,
      });
      return;
    }

    updateUserPrizes({
      ...prize,
      committedTickets: ticketCount,
    });
    const { total, remaining } = userInfo.tickets;
    updateUserTicketCount({
      total,
      remaining: remaining - ticketCount,
    });

    this.setState({ saving: false, ticketCount: 1 });
  };

  uncommitTicket = async () => {
    this.setState({ saving: true });
    const { prize, updateUserPrizes, updateUserTicketCount, userInfo, userPrize } = this.props;

    const [err] = await api.post(
      '/users/me/removetickets',
      {
        data: {
          attributes: {
            prize: prize.id,
            user: Number.parseInt(storage.get('userID'), 10),
          },
        },
      },
      true,
    );

    if (err) {
      this.setState({
        errors: err.errors,
        saving: false,
      });
      return;
    }

    updateUserPrizes({
      ...prize,
      committedTickets: 0,
    });
    const { total, remaining } = userInfo.tickets;
    updateUserTicketCount({
      total,
      remaining: remaining + userPrize.committedTickets,
    });

    this.setState({ saving: false, ticketCount: 1 });
  };

  getButtonTray = () => {
    const { userInfo, userPrize } = this.props;
    if (userPrize.committedTickets) {
      return (
        <Button domain="danger" onClick={this.uncommitTicket}>
          {`Remove ${userPrize.committedTickets} Ticket${
            userPrize.committedTickets === 1 ? '' : 's'
          }`}
        </Button>
      );
    } else {
      const { ticketCount } = this.state;
      const { remaining } = userInfo.tickets;
      return (
        <>
          <Input
            elementType="number"
            label={`Ticket Count (${remaining} remaining)`}
            disabled={remaining === 1}
            max={remaining}
            min={1}
            value={ticketCount}
            onChange={(ticketCount) =>
              this.setState({ ticketCount: Number.parseInt(ticketCount, 10) })
            }
          />
          <Button domain="primary" onClick={this.commitTicket}>
            {`Add Ticket${ticketCount === 1 ? '' : 's'}`}
          </Button>
        </>
      );
    }
  };

  render() {
    const { categories, prize, onExit } = this.props;
    const { errors } = this.state;
    return (
      <Modal underlayClickExits onExit={onExit}>
        {this.state.saving && <Loading />}
        <Container columns={[1]} areas={[]} multiplier={2}>
          {errors &&
            errors.length > 0 &&
            errors.map((error, i) => (
              <Alert
                key={error.detail}
                onClose={() =>
                  this.setState({ errors: [...errors.slice(0, i), ...errors.slice(i + 1)] })
                }
              >
                {error.detail}
              </Alert>
            ))}
          <Image src={prize.image} alt={prize.title} />
          <Title level={2} elementLevel={2}>
            {prize.title}
          </Title>
          <div
            style={{
              display: 'flex',
              'flex-direction': 'row',
              'flex-wrap': 'wrap',
              'margin-top': '-10px',
            }}
          >
            <div style={{ 'margin-right': 10, 'margin-top': '10px' }}>
              <Lozenge>{categories[prize.categoryId].name}</Lozenge>
            </div>
            {prize.committedTickets && (
              <div style={{ 'margin-right': 10, 'margin-top': '10px' }}>
                <Lozenge>Tickets in Bucket: {prize.committedTickets}</Lozenge>
              </div>
            )}
            {prize.committedUsers && (
              <div style={{ 'margin-right': 10, 'margin-top': '10px' }}>
                <Lozenge># of Users in Bucket: {prize.committedUsers}</Lozenge>
              </div>
            )}
            {prize.multiplier && prize.multiplier > 1 && (
              <div style={{ 'margin-right': 10, 'margin-top': '10px' }}>
                <Lozenge>Drawings: {prize.multiplier}</Lozenge>
              </div>
            )}
          </div>
          <Text>{prize.description}</Text>
          {this.getButtonTray()}
        </Container>
      </Modal>
    );
  }
}
