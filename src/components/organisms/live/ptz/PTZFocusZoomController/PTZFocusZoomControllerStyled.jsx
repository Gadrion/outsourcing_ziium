import styled, { withTheme } from 'styled-components';
import { IconButton, Button } from 'wisenet-ui/components/atoms';
import { Slider } from 'wisenet-ui/components/molecules';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

export const StyledSlider = styled(Slider)`
  width: 270px;
  height: 2px;
  margin-top: 20px;
  padding-bottom: 20px;
`;

export const ZoomButton = withTheme(styled(IconButton)`
  color: ${props => props.theme.colorSub9};
  border: 1px solid ${props => props.theme.colorSub6};
  width: 30px;
  height: 30px;
  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`);

export const NearButton = withTheme(styled(IconButton)`
  color: ${props => props.theme.colorSub9};
  border: 1px solid ${props => props.theme.colorSub6};
  width: 75px;
  height: 30px;
  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`);

export const FarButton = withTheme(styled(IconButton)`
  color: ${props => props.theme.colorSub9};
  border: 1px solid ${props => props.theme.colorSub6};
  width: 75px;
  height: 30px;
  padding: 0;
  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`);

export const AutoButton = withTheme(styled(Button)`
  color: ${props => props.theme.colorSub9};
  border: 1px solid ${props => props.theme.colorSub6};
  width: 75px;
  height: 30px;
  padding: 2px;
`);
