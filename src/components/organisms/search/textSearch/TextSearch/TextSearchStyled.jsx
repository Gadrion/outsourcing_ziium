import styled, { withTheme } from 'styled-components';
import {
  Label,
  Input,
  Checkbox,
  Button,
} from 'wisenet-ui/components/atoms';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 10px;
`;

export const KeywordLabel = styled(Label)`
  font-size: 12px;
  margin-left: 15px;
  margin-top: 10px;
`;

export const KeywordInput = styled(Input)`
  width: 270px;
  height: 30px;
  margin-top: 10px;
  align-self: center;
`;

export const OptionLabel = styled(Label)`
  font-size: 12px;
`;

export const OptionCheckbox = styled(Checkbox)`
  font-size: 12px;
  margin-left: 3px;
  margin-right: 7px;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-top: 10px;
  padding: 0px;
`;

export const KeywordTreeWrapper = withTheme(styled.div`
  border: 2px solid ${props => props.theme.colorSub8};
  width: 270px;
  height: 130px;
  overflow: auto;
  align-self: center;
  margin-top: 10px;
`);

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
`;

export const StyledButton = styled(Button)`
  margin: 5px;
  width: 80px;
  height: 30px;
  padding: 3px;
  font-weight: bold;
`;
