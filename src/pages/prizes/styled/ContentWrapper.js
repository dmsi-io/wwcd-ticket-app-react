import styled from 'styled-components';

const ContentWrapper = styled.div`
  height: 100%;
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    max-width: 500px;
  }
`;

export default ContentWrapper;
