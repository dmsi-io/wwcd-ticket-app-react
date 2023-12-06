import styled from 'styled-components';

import colors from '@wedgekit/color';

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;

  p {
    background-color: ${colors.R500};
    border-radius: 50%;
    height: 2em;
    width: 2em;
    font-size: 1.5em;
    line-height: 2em;
    text-align: center;
    vertical-align: middle;
    color: ${colors.N050};

    position: absolute;
    top: -1em;
    right: 0;
    z-index: 1;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
  }
`;

export default ImageWrapper;
