import styled from 'styled-components';
import ptzCursor from 'util/static/images/ptz_mouse_cursor.cur';

export const TilePTZControlStyled = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  cursor: url(${ptzCursor}), pointer;
`;
