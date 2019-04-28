import styled, { css } from 'styled-components';

export const PageNumberStyle = styled.button`
width: 22px;
height: 22px;
display: inline-block;
justify-content: center;
color: ${props => props.theme.colorSub8};
&:hover {
  cursor: pointer;
}
${props => props.selected && css`
color: #f37321;
    `};
${props => props.border && css`
border: 1px solid white; 
    `};
`;
