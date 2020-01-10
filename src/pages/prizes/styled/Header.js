import styled from 'styled-components';
import color from '@wedgekit/color';
import primitives from '@wedgekit/primitives';

const Header = styled.header`
  z-index: 1000;
  box-shadow: 0 -6px 22px 0 rgba(0,0,0,0.4);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  background: ${color.N050};
  padding: ${primitives.base * 2}px;
  align-items: center;
`;

export default Header;
