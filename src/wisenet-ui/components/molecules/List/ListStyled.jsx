import styled, { css } from 'styled-components';

export const ListStyled = styled.div`  
  flex-wrap: nowrap;
  margin-left: 5px;
  &.active{
    color: #f37321;
  }
  ${props => props.horizonal && css`
      display: flex;
    `};
`;

export const ListItemStyled = styled.div`
${props => props.horizonal && css`
margin-right: 5px; 
    `};   
${props => props.border && css`
border: 5px solid black; 
    `};  
`;
