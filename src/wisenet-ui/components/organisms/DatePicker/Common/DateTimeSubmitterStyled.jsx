import styled, { withTheme } from 'styled-components';
import { Button } from 'wisenet-ui/components/atoms';

export const ButtonContainer = withTheme(styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${props => props.theme.colorMain};
  border-left: 1px solid ${props => props.theme.colorSub6};
  border-right: 1px solid ${props => props.theme.colorSub6};
  border-bottom: 1px solid ${props => props.theme.colorSub6};
`);

export const StyledButton = styled(Button)`
  margin: 5px;
  width: 80px;
  height: 30px;
  padding: 3px;
  font-weight: bold;
`;
