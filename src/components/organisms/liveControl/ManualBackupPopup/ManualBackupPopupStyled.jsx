import styled, { withTheme } from 'styled-components';
import {
  Label,
  Select,
  Input,
  Checkbox,
  Button,
  Span,
} from 'wisenet-ui/components/atoms';

export const Container = withTheme(styled.div`
  height: 682px;
  width: 608px;
  border: 1px solid ${props => props.theme.colorSub8}
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.theme.colorSub1};
`);

export const Header = withTheme(styled.div`
  margin-top: 0px;
  height: 44px;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colorSub8};
`);

export const Footer = styled.div`
  height: 60px;
  width: 100%;
`;

export const Body = withTheme(styled.div`
  height: 578px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`);

export const SubBody1 = withTheme(styled.div`
  height: 417px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colorSub8};
`);

export const SubBody2 = withTheme(styled.div`
  height: 138px;
  width: 100%;
  margin-top: 10px;
`);

export const TitleSpan = withTheme(styled(Span)`
  width: 42px;
  height: 19px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  float: left;
  margin-left: 16px;
  margin-top: 10px;
  color: ${props => props.theme.colorSub8};
`);

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const FooterButton = styled(Button)`
  width: 100px;
  height: 28px;
  margin: 16px;
  object-fit: contain;
  padding-top: 4px;
  padding-bottom: 5px;
`;

export const ButtonLabel = styled(Label)`
  width: 98px;
  height: 19px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  text-align: center;
  color: ${props => props.theme.colorSub8};
`;

export const ChannelTable = withTheme(styled.div`
  width: 100%;
  height: 234px;
  border: 1px solid ${props => props.theme.colorSub8};
  margin-top: 10px;
`);

export const LayoutSelect = styled(Select)`
  width: 136px;
  height: 28px;
  object-fit: contain;
  float: left;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  width: 480px;
  height: 38px;
  margin-left: 16px;
`;

export const MenuSpan = withTheme(styled(Span)`
  width: 66px;
  height: 19px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  float: left;
  text-align: left;
  color: ${props => props.theme.colorSub8};
`);

export const PathInput = styled(Input)`
  width: 248px;
  height: 28px;
`;

export const FileTypeSelect = styled(Select)`
  width: 100px;
  height: 28px;
`;

export const FileInput = styled(Input)`
  width: 248px;
  height: 28px;
`;

export const PathButton = styled(Button)`
  width: 100px;
  height: 28px;
  object-fit: contain;
  padding-top: 4px;
  padding-bottom: 5px;
`;

export const PasswordLabel = withTheme(styled(Label)`
  width: 66px;
  height: 19px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  float: left;
  text-align: left;
  color: ${props => props.theme.colorSub8};
  margin-left: 10px;
`);

export const PasswordCheckbox = styled(Checkbox)`
  font-size: 14px;
  margin-top: 4px;
`;

export const PasswordButton = styled(Button)`
  width: 60px;
  height: 25px;
  margin-left: 10px;
  padding: 0px;
`;

export const TextDataLabel = withTheme(styled(Label)`
  width: 66px;
  height: 19px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  float: left;
  text-align: left;
  color: ${props => props.theme.colorSub8};
  margin-left: 10px;
`);


export const TextDataCheckbox = styled(Checkbox)`
  font-size: 14px;
  margin-left: 45px;
  margin-top: 4px;
`;

export const PasswordInput = styled(Input)`
  width: 148px;
  height: 28px;
  margin-left: 10px;
`;

export const OptionWrapper = styled.div`
  display: flex;
  display-direction: row;
  justify-content: center;
  padding: 0px;
  width: 480px;
  height: 38px;
  margin-left: 50px;
  margin-top: 15px;
  padding: 0px;
`;

export const StatusWrapper = styled.div`
  display: flex;
  display-direction: row;
  padding: 0px;
  width: 480px;
  height: 38px;
  margin-left: 50px;
  padding: 0px;
`;

export const StatusLabel = withTheme(styled(Label)`
  width: auto;
  height: 17px;
  font-family: NotoSans;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  color: ${props => props.theme.colorSub8};
  margin-left: 10px;
`);

export const StatusInput = styled(Input)`
  width: 100px;
  height: 28px;
  margin-left: 10px;
`;
