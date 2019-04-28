import styled, { withTheme, css } from 'styled-components';

const WrapperStyled = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  &.vertical {
    flex-direction: column;
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

  .rc-slider {
    padding: 0;
  }

  .rc-slider-disabled {
    background-color: ${props => props.theme.colorMain};
    opacity: 0.35;
  }

  .rc-slider-handle {
    ${props => props.handleText && css`
      &::after {
        content: '${props.handleText[props.value]}';
        position: absolute;
        font-size: 12px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #797979;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
    &:focus {
      box-shadow: none;
    }
  }
`);

export {
  WrapperStyled,
  SliderWrapperStyled,
};
