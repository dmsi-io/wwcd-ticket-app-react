import styled from 'styled-components';

import colors from '@wedgekit/color';

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.B600};
  color: ${colors.N050};
  height: 5vh;
`;

export default Footer;
