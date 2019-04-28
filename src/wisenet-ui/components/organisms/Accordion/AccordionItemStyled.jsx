import styled, { withTheme } from 'styled-components';

export const Title = withTheme(styled.h2`
  padding-left: 5px;
  font-size: 15px;
  line-height: 34px;
  font-weight: bold;
  letter-spacing: 1px;
  display: inline-block;
  width: 80%;
  margin-left: 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout: none;
  user-select: none;
  color: ${props => props.theme.colorSub8};
`);

export const ListItem = withTheme(styled.li`
  position: relative;
  margin: auto;
  border-top: 1px solid ${props => props.theme.colorSub6};
  border-left: 1px solid ${props => props.theme.colorSub6};
  border-right: 1px solid ${props => props.theme.colorSub6};
  &:nth-of-type(1) {
    animation-delay: 0.5s;
  }
  &:nth-of-type(2) {
    animation-delay: 0.75s;
  }
  &:nth-of-type(3) {
    animation-delay: 1.0s;
  }
  &:last-of-type {
    border-bottom: 1px solid ${props => props.theme.colorSub6};
  }
  background-color: ${props => props.theme.colorMain};
`);

export const I = withTheme(styled.i`
  position: absolute;
  transform: translate( -6px , 0 );
  margin-top: 16px;
  right: 15px;
  &:before , &:after {
    content: "";
    transition: all 0.25s ease-in-out;
    position: absolute;
    background-color: ${props => props.theme.colorSub8};
    width: 3px;
    height: 9px;
  }
  &:before {
    transform: translate( -2px , 0 ) rotate( 45deg );
  }
  &:after {
    transform: translate( 2px , 0 ) rotate( -45deg );
  }
`);

export const Input = styled.input`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  left: 100%;
  transform: translateX(-100%);
  margin: 0;
  z-index: 1;
  opacity: 0;
  &:checked {
    &~div {
      margin-top: 0;
      max-height: 0;
      opacity: 0;
      transform: translate( 0 , 50% );
    }
    &~i {
      &:before {
        transform: translate( 2px , 0 ) rotate( 45deg );
      }
      &:after {
        transform: translate( -2px , 0 ) rotate( -45deg );
      }
    }
  }
`;

export const OverFlowContent = withTheme(styled.div`
  position: relative;
  overflow: auto;
  /* max-height: 300px; */
  transition: all 0.25s ease-in-out;
  opacity: 1;
  transform: translate( 0 , 0 );
  z-index: 2;
  width: 100%;
  border-top: 1px solid ${props => props.theme.colorSub6};
  background-color: ${props => props.theme.colorMain};
`);

export const Content = withTheme(styled.div`
  position: relative;
  max-height: 350px;
  transition: all 0.25s ease-in-out;
  opacity: 1;
  transform: translate( 0 , 0 );
  z-index: 3;
  width: 100%;
  border-top: 1px solid ${props => props.theme.colorSub6};
  background-color: ${props => props.theme.colorMain};
`);
