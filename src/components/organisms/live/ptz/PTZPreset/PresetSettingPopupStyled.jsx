import styled, { withTheme } from 'styled-components';
import {
  Button,
  Span,
  Input,
  Label,
  Select
} from 'wisenet-ui/components/atoms';

export const Container = styled.div`
  width: 292px;
  height: 207px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colorSub6};
`;

export const Header = withTheme(styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 44px;
  border-bottom: 1px solid ${props => props.theme.colorSub6};
`);

export const Body = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 292px;
  height: 101px;
  border-bottom: 1px solid ${props => props.theme.colorSub6};
`);

export const Footer = withTheme(styled.div`
  height: 61px;
  width: 100%;
  display: block;
  display: flex;
  flex-direction: row;
`);

export const TitleSpan = withTheme(styled(Span)`
  width: 65px;
  height: 19px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  color: ${props => props.theme.colorSub8};
  margin-left: 16px;
  margin-top: 13px;
  margin-bottom: 8px;
`);

export const CloseButton = styled(Button)`
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin-left: 175px;
  padding: 0px;
  margin-top: 13px;
  margin-bottom: 8px;
`;

export const CancelButton = styled(Button)`
  width: 100px;
  height: 28px;
  object-fit: contain;
  margin-left: 4px;
  margin-top: 16px;
  padding-top: 2px;
`;

export const SaveButton = styled(Button)`
  width: 100px;
  height: 28px;
  object-fit: contain;
  margin-left: 44px;
  margin-top: 16px;
  padding-top: 2px;
`;

export const NameInput = withTheme(styled(Input)`
  width: 136px !important;
  height: 28px;
  object-fit: contain;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.3px;
  color: ${props => props.theme.colorSub8};
`);

export const PresetLabel = withTheme(styled(Label)`
  width: 46px;
  height: 57px;
  font-family: NotoSans;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  color: ${props => props.theme.colorSub8};
`);

export const PresetSelect = withTheme(styled(Select)`
  width: 136px;
  height: 28px;
  object-fit: contain;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.3px;
  color: ${props => props.theme.colorSub8};
  padding: 0px;
`);

export const PresetNameWrapper = styled.div`
  display: grid;
  grid-column-gap: 35px;
  grid-template-columns: 50px 150px;
  margin-left: 28px;
  margin-top: 3px;
  padding: 0px;
  height: 28px;
`;

export const PresetListWrapper = styled.div`
  display: grid;
  grid-column-gap: 35px;
  grid-template-columns: 50px 150px;
  margin-top: 10px;
  margin-left: 28px;
  padding: 0px;
  height: 28px;
`;

export const LabelWrapper = styled.div`
  font-size: 1.2em;
`;

export const InputWrapper = styled.div`
  margin: auto;
`;

export const SelectWrapper = styled.div`
  min-width: 160px;
  min-height: 10px;
`;
