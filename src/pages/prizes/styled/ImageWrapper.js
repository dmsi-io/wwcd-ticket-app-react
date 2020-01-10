import styled from 'styled-components';

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
  }
`;

export default ImageWrapper;
