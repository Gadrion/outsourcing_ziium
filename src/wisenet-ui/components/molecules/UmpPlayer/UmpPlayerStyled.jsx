import styled from 'styled-components';

const transformCalc = ({ rotate }) => {
  const xChange = rotate >= 180;
  const yChagne = (rotate % 270) !== 0;
  const xRatio = xChange ? -100 : 0;
  const yRatio = yChagne ? -100 : 0;
  return `rotate(${rotate}deg) translateX(${xRatio}%) translateY(${yRatio}%)`;
};

const isRotate = ({ rotate }) => (rotate % 180 !== 0);

export default styled.div`
  width: 100%;
  height: 100%;

  video {
    width: ${props => (isRotate(props) ? props.height : props.width)}px !important;
    height: ${props => (isRotate(props) ? props.width : props.height)}px !important;
    transform: ${props => transformCalc(props)};
    object-fit: ${props => (props.isAspectRatioMode ? 'contain' : 'fill')};
    transform-origin: top left;
  }

  canvas {
    width: ${props => (isRotate(props) ? props.height : props.width)}px !important;
    height: ${props => (isRotate(props) ? props.width : props.height)}px !important;
    transform: ${props => transformCalc(props)};
    object-fit: ${props => (props.isAspectRatioMode ? 'contain' : 'fill')};
    transform-origin: top left;
  }
`;
