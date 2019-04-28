import styled, { withTheme, keyframes } from 'styled-components';

const LoadingKeyFrame = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.8) rotate(45deg);
  }
  100% {
    transform: translate(-50%, -50%) scale(1) rotate(90deg);
  }
`;

const LoadingShapeStyled = styled.div`
  width: 100%;
  height: 100%;

  z-index: 2000;
  opacity: 1;

  animation: ${LoadingKeyFrame} 1s ease-in-out;
  animation-iteration-count: infinite;
`;

const RoundStyled = withTheme(styled.div`
  width: 25%;
  height: 25%;
  border-radius: 50%;
  background-color: ${props => props.theme.colorPoint1};
  position: absolute;
    
  :nth-child(1) {
    top: 0;
    left: 0;
  }
  :nth-child(2) {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  :nth-child(3) {
    top: 0;
    right: 0;
  }
  :nth-child(4) {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  :nth-child(5) {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  :nth-child(6) {
    bottom: 0;
    left: 0;
  }
  :nth-child(7) {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  :nth-child(8) {
    bottom: 0;
    right: 0;
  }
`);

export {
  LoadingShapeStyled,
  RoundStyled,
};
