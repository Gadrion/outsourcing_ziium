import styled from 'styled-components';

export const HeaderStyled = styled.ul`
  display: flex;
  flex-flow : row wrap;
  width: 100%;
  position: relative;
  bottom: -1px;
  &.right {
    flex-flow: row-reverse wrap;
  }
  &.multiLine {
    flex-flow: column wrap;
    bottom: 0;
  }
`;

export const ContentStyled = styled.div`
  border: 1px solid ${props => props.theme.colorSub9};
  &.noneDisplay {
    display: none;
  }
  &.noBorder {
    border-width: 0;
  }
`;
