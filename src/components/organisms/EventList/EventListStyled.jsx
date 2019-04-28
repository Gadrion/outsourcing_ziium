import styled from 'styled-components';
import { DropDownMenu } from 'wisenet-ui/components/organisms';

export const EventTabWrapper = styled.div`
  height: 100%;
  min-height: 300px;
`;

export const TitleStyled = styled.div`
  font-size: 16px;
  padding-left: 20px;
  border-top: 1px solid black;
`;

export const Border = styled.hr`
  width: 230px;
  border: 1px solid #e9e9e9;
  text-align: center;
`;

export const DropDownMenuStyled = styled(DropDownMenu)`
  display: inline-block;
  left: 70%;
  & > div {
    /* bottom: 26px; */
    right: 0;
  }
`;

export const IconStyled = styled.i`
  display: inline-block;
  font-size: 20px;
`;

export const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 210px;
  margin-top: 10px;
  margin-left: 10px;
  height: 300px;
`;
