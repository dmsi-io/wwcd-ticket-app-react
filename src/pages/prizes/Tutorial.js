import React, { useState } from 'react';
import styled from 'styled-components';

import primitives from '@wedgekit/primitives';

const Overlay = styled.div`
  width: 100%;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 95%;
  max-width: 400px;
  background: #6554C0;
  position: absolute;
  color: #fff;
  font-family: ${primitives.fontFamily};
  box-sizing: border-box;
  padding: 20px;
  border-radius: 8px;
  margin: 0 auto;
  display: block;
`;

const Row = styled.div`
  display: grid;
  justify-content: space-between;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, max-content));
  align-items: center;
  margin-top: 8px;
`;

const Counter = styled.span`
  color: #fffa;
  font-size: 14px;
`;

const Skip = styled.button`
  font-weight: 600;
  color: #fff;
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 14px;
`;

const Button = styled.button`
  font-weight: 600;
  color: #fff;
  appearance: none;
  background: #423099;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
`;

const ButtonRow = styled.div`
  grid-template-columns: repeat(2, minmax(0, max-content));
  display: grid;
  grid-gap: 12px;
  align-items: center;
`;

const Messages = styled.p`
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const messages = [
  `What a year it's been!\nWhile we aren't able to gather as a company at our yearly holiday party, we still wanted to give you something special.`,
  `Each employee will receive one gift of their choosing. Look around by category or see all the gifts available.`,
  `Once you've selected one you can either confirm the gift immediately, or swap it out if you weren't quite ready.\nHappy holidays from everyone at DMSi!`,
];

const Tutorial = ({ onExit }) => {
  const [idx, setIdx] = useState(0);

  const advance = () => {
    if (idx + 1 === messages.length) {
      onExit();
    }
    setIdx(idx + 1);
  }

  return (
    <Overlay>
      <Container>
        <Messages>{messages[idx]}</Messages>
        <Row>
          <Counter>{idx + 1}/{messages.length}</Counter>
          <ButtonRow>
            {idx !== messages.length - 1 && <Skip onClick={() => onExit()}>Skip</Skip>}
            <Button onClick={advance}>
              {idx === messages.length - 1 ? 'Got it!' : 'Next'}
            </Button>
          </ButtonRow>
        </Row>
      </Container>
    </Overlay>
  );
};

export default Tutorial;
