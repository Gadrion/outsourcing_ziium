import styled, { withTheme } from 'styled-components';
import { IconButton } from 'wisenet-ui/components/atoms';

export const TilePTZFunctionWrapperStyled = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  flex-wrap: wrap;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 150px;
  height: 100px;
`;

export const TilePTZFunctionDivStyled = styled.div`
  flex: auto;
  width: 50%;
`;

export const TileCenter = styled.div`
  font-size: 28px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  cursor: default;
  color: white;
  font-weight: bolder;
`;

export const IconButtonStyled = withTheme(styled(IconButton)`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`);

export const IconStyled = withTheme(styled.i`
  font-size: 27px;
  cursor: pointer;
  color: #ffffff;

  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`);
