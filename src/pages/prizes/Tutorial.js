import React from 'react';
import styled from 'styled-components';

import color from '@wedgekit/color';
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
  background: ${color.N050};
  position: absolute;
  color: #fff;
  font-family: ${primitives.fontFamily};
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  margin: 0 auto;
  display: block;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Messages = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 10px;
  color: ${color.N700};
  text-align: center;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const Close = styled.button`
  font-weight: 600;
  color: ${color.N700};
  appearance: none;
  background: ${color.N050};
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  padding: 3px 7px 5px;
  font-size: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  &:hover {
    background: ${color.N100};
  }

  &:focus {
    background: ${color.N300};
  }
`;

const messages = [
  `Welcome to the 2023 DMSi Holiday Party!`
];

const Tutorial = ({ onExit }) => {

  return (
    <Overlay>
      <Container>
      <ButtonRow>
        <Close onClick={() => onExit()}>&times;</Close>
        </ButtonRow>
        <Messages>{messages}</Messages>
      </Container>
    </Overlay>
  );
};

export default Tutorial;
