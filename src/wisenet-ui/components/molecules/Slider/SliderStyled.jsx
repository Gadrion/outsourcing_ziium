import styled, { withTheme } from 'styled-components';

const WrapperStyled = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  &.vertical {
    flex-direction: column;
  }
`;

const ButtonStyled = styled.span`
  flex-basis: 35px;
  display: none;
  justify-content: center;
  align-items: center;

  &.leftButton,
  &.rightButton {
    display: flex;
    transform: translateY(-2px);
  }

  &.topButton,
  &.bottomButton {
    display: flex;
    transform: translateX(-1px);
  }
`;

const SliderWrapperStyled = withTheme(styled.span`
  flex: 1;

  .wrapper.vertical & {
    padding: 15px 0;
  }

  .wrapper:not(.vertical) & {
    padding: 0 15px;
  }

  .rc-slider-disabled {
    background-color: ${props => props.theme.colorMain};
    opacity: 0.35;
  }
`);

export {
  WrapperStyled,
  ButtonStyled,
  SliderWrapperStyled,
};
