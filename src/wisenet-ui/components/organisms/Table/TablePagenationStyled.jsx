import styled from 'styled-components';

export const PagenationWrapper = styled.div`
  padding-top: 16px;
  color: #6e6e6e;
  font-size: 14px;
  user-select: none;
`;

export const PageChangeIconStyled = styled.i`
  font-size: 16px;
  cursor: pointer;
  margin: 0 8px;
  &:hover {
    color: #f37321;
  }
`;

export const CurrentPageStyled = styled.span`
  color: #f37321;
`;
