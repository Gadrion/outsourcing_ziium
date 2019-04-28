import styled from 'styled-components';
import { TileControlBar } from 'wisenet-ui/components/molecules';

export const LiveVideoTileStyled = styled.div`
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const TileControlBarStyled = styled(TileControlBar)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const LiveVideoTileStatusStyled = styled.div`
  position: absolute;
  top:40%; left:40%;
  font-size:52px;
`;
