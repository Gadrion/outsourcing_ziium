import styled, { css } from 'styled-components';
import GridLayout from 'react-grid-layout';

export const VideoStaticLayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LibGridItemStyle = css`
  transition: all 700ms ease;
`;

export const GridLayoutStyled = styled(GridLayout)`
  position: absolute;
  overflow: hidden;
  width: ${props => props.width}px;
  & > div {
    &[class*='react-grid-item'] {
      ${props => (props.isDragEnd ? null : LibGridItemStyle)}
    }
  }
`;

export const DragItemStyled = styled.div`
  display: flex;
`;

export const DragItemEmptyStyled = styled.div`
  width: 100%;
  border: 1px solid #c9c9c9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:52px;
`;
