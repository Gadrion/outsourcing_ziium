import styled from 'styled-components';
import { DropDownMenu } from 'wisenet-ui/components/organisms';

export const AlarmCenterWrapperStyled = styled.div`
  font-size: 24px;
`;

export const IconStyled = styled.i`
  margin-left: 12px;
  cursor: pointer;
  color: #ca030a;
`;

export const DropDownMenuStyled = styled(DropDownMenu)`
  display: inline-block;
  & > div {
    top: 38px;
    right: -206.5px;
    padding: 12px 20px 20px 20px;
    box-shadow: none;
    border: 1px solid #797979;
    &::before {
      content: "";
      position: absolute;
      top: -12px;
      left: 50%;
      border-width: 0 8px 11.6px 8px;
      border-style: solid;
      border-color: transparent transparent #797979 transparent;
    }
    &::after {
      content: "";
      position: absolute;
      top: -10px;
      left: 50%;
      border-width: 0 8px 11.6px 8px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
  }
`;

export const ErrorMessageWrapperStyled = styled.div`
  width: 410px;
  background-color: #e9e9e9;
  margin-top: 8px;
  padding: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.2px;
  white-space: normal;
  line-height: initial;
`;

export const ErrorTitleStyled = styled.div`
  font-size: 12px;
  color: #4c4c4c;
`;

export const ErrorMessageStyled = styled.div`
  font-size: 14px;
  color: #000;
  padding-top: 3px;
`;
