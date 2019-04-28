import styled, { withTheme } from 'styled-components';
import { IconButton } from 'wisenet-ui/components/atoms';

export const TilePTZDirectionWrapperStyled = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  flex-wrap: wrap;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 50%;
  height: 50%;
`;

export const TilePTZDirectionDivStyled = styled.div`
  flex: auto;
  width: 33%;
`;

export const IconButtonStyled = withTheme(styled(IconButton)`
  padding: 0;
  top: 50%;
  position: relative;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`);

export const ArrowIcon = withTheme(styled.div`
  &.normal {
    border-right: 14px solid transparent;
    border-left: 14px solid transparent;    
    border-bottom: 14px solid white;
  }
  &.diagonal {
    border-right: 20px solid transparent;
    border-top: 20px solid white;
  }
  transform: rotate(${props => `${props.deg ? props.deg : 0}deg`});
`);

export const TilePTZPointerStyled = styled.div`
  height: 31px;
  width: 31px;
  font-size: 31px;
  z-index: 4;
  position: absolute;
  left: 50%;
  top: 50%
  transform: translateX(-50%) translateY(-50%);
`;
