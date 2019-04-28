import styled, { withTheme } from 'styled-components';
import { Span, Button, Label } from 'wisenet-ui/components/atoms';

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
  height: 300px;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &:hover {
    background-color: #dcdcdc;
    width: 100%;
  }
`;

export const DateLabel = withTheme(styled(Label)`
  border: 1px solid ${props => props.theme.colorSub8};
  width: 280px;
  padding: 3px;
  background-color: ${props => props.theme.colorMain};
`);

export const TextListItemWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px;
  padding: 0px;
`;

export const ListItem = styled(Span)`
  margin-top: 10px;
  margin-left: 15px;
`;

export const DescendingButton = styled(Button)`
  width: 80px;
  height: 35px;
`;

export const ListCounter = styled(Span)`
  padding-top: 10px;
`;
