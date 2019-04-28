import styled, { withTheme, keyframes } from 'styled-components';

const CircleKeyFrames = keyframes`
  0% {
    opacity: 0.6;
  }
  40% {
    width: 30%;
    height: 30%;
    opacity: 0.4;
  }
  100% {
    width: 200%;
    height: 200%;
    padding-bottom: 100%;
    opacity: 0.2;
  }
`;

const RippleStyled = withTheme(styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;

  display: flex;
  align-items: center;

  .js-ripple-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgb(255, 255, 255);
    animation: ${CircleKeyFrames} 0.45s ease-in;
  }
`);

const ChildrenStyled = styled.span`
  pointer-events: none;
`;

export {
  RippleStyled,
  ChildrenStyled,
};
