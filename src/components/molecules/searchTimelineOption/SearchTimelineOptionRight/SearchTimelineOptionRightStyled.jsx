import styled from 'styled-components';
import { Button } from 'wisenet-ui/components/atoms';

export const SearchOptionRightStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;

  & > label {
    margin-right: 5px;
  }
`;

export const ButtonStyled = styled(Button)`
  padding: 0px 2px;
  margin-left: 3px;
`;
