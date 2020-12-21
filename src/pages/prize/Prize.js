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

const Strong = styled.strong`
  text-align: center;
  width: 100%;
  display: block;
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
          ticketCount: 1,
          prize: this.props.prize.id,
          user: parseInt(storage.get('userID'), 10),
        }
      }
    }, true);

    this.props.updateUserPrizes({
      ...this.props.prize,
      confirmed: true,
    });

    this.setState({ saving: false });
  };

  getButtonTray = (selectedGift, prize) => {
    if (selectedGift) {
      if (selectedGift.confirmed) {
        return (
          <Text><Strong>You've already chosen a gift!</Strong></Text>
        );
      } else if (selectedGift.id === prize.id) {
        return (<Button onClick={this.commitTicket} domain="success">Confirm Selection</Button>);
      } else {
        return (
          <Button domain="primary" onClick={() => this.props.updateUserPrizes(prize)}>
            Swap to This
          </Button>
        );
      }
    } else {
      return (
        <Button domain="primary" onClick={() => this.props.updateUserPrizes(prize)}>
          Choose
        </Button>
      );
    }
  };

  render() {
    const { prize, selectedGift } = this.props;
    return (
      <Modal
        underlayClickExits
        onExit={this.props.onExit}
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
          {this.getButtonTray(selectedGift, prize)}
        </Container>
      </Modal>
    );
  }
}
