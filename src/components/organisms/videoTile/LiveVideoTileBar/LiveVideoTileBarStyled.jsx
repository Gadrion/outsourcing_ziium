import styled from 'styled-components';

export const OSDWrapperStyled = styled.div`
position: absolute;
width: calc(100% - 2px);
height: 28px;
top: 1px;
left: 1px;
right: 1px;
background-blend-mode: multiply;
background-image: linear-gradient(to bottom, rgba(30, 30, 30, 0.6), rgba(30, 30, 30, 0.6));
color: #fff;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 8px 0 8px;
`;

export const OSDLeftWrapperStyled = styled.span`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

export const OSDRightWrapperStyled = styled.span`
white-space: nowrap;
display: flex;
align-items: center;
`;

export const ChannelNameStyled = styled.span`
font-size: 14px;
`;

export const EventIconStyled = styled.i`
font-size: 24px;
margin-left: 4px;
`;

export const VerticalLineStyled = styled.div`
display: inline-block;
width: 1px;
height: 16px;
border-left: 1px solid rgba(255, 255, 255, 0.2);
margin: 0 8px;
`;

export const CloseIconStyled = styled.i`
font-size: 20px;
cursor: pointer;
&:hover {
  color: #f37321;
}
`;
