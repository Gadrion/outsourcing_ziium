import styled from 'styled-components';
import GridLayout from 'react-grid-layout';

export const VideoDynamicLayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const GridLayoutStyled = styled(GridLayout)`
  position: absolute;
  width: 100%;
`;

export const DragItemStyled = styled.div`
  display: flex;
`;
