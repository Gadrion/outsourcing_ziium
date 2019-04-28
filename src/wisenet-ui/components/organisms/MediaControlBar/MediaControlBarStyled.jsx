import styled, { withTheme, css } from 'styled-components';
import {
  IconButton,
  Select,
  Input,
  Label,
} from 'wisenet-ui/components/atoms';
import { DropDownMenu } from 'wisenet-ui/components/organisms';

export const MediaControlBarStyled = withTheme(styled.div`
  display: flex;
`);

export const LeftStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const CenterStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const RightStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

export const IconButtonStyled = withTheme(styled(IconButton)`
  padding: 0;
`);

export const IconStyled = withTheme(styled.i`
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
  ${props => props.isActive && css`
    color: #f37321;
  `}
`);

export const PlaySpeedSelect = withTheme(styled(Select)`
  height: 20px;
  padding: 0;
  margin-left: 15px;
`);

export const LayoutPageInput = withTheme(styled(Input)`
  width: 15px;
  text-align: center;
  padding: 0;
`);

export const LayoutPageLabel = withTheme(styled(Label)`
  font-weight: 400;
`);

export const DropDownMenuStyled = styled(DropDownMenu)`
  & > div {
    bottom: 26px;
    z-index: 2;
  }
`;

export const SliderLabelStyled = withTheme(styled(Label)`
  width: 35px;
  height: 19px;
  margin-left: 5px;
`);

export const SliderDropDownMenuStyled = styled(DropDownMenu)`
  & > div {
    position: absolute;
    width: 88px;
    height: 153px;
    bottom: 26px;
  }
`;
