import styled, { withTheme } from 'styled-components';

export const Container = withTheme(styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  justify-content: center;
  border-left: 1px solid ${props => props.theme.colorSub6};
  border-right: 1px solid ${props => props.theme.colorSub6};
  border-bottom: 1px solid ${props => props.theme.colorSub6};
  color: ${props => props.theme.colorSub8};
  background-color: ${props => props.theme.colorMain};
`);

export const Stepper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90px;
`;

export const StepperInput = withTheme(styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 13px;
  height: 50px;
  text-align: center;
  border: 1px solid ${props => props.theme.colorSub6};
  background: transparent;
  color: ${props => props.theme.colorSub8};
`);

export const StepperUpButton = withTheme(styled.span`
  width: 1.4em;
  font-weight: 300;
  font-size: 1.2em;
  transform: rotate(270deg);
  cursor: default;
  color: ${props => props.theme.colorSub8};
  visibility: hidden;
  margin-right: 3px;
`);

export const StepperDownButton = withTheme(styled.span`
  width: 1.4em;
  font-weight: 300;
  font-size: 1.2em;
  transform: rotate(90deg);
  cursor: default;
  color: ${props => props.theme.colorSub8};
  visibility: hidden;
  margin-left: 4px;
`);

export const Divider = styled.span`
  margin-left: 10px;
  margin-right: 10px;
`;
