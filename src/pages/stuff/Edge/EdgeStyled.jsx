import styled from 'styled-components';

export const EdgeStyled = styled.div`
  position: fixed;
  ${({ top }) => top && 'top : 0'}
  ${({ left }) => left && 'left : 0'}
  ${({ bottom }) => bottom && 'bottom : 0'}
  ${({ right }) => right && 'right : 0'}
`;
