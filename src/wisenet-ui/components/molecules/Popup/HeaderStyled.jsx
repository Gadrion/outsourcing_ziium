import styled from 'styled-components';
import { Button } from 'wisenet-ui/components/atoms';

export const Container = styled.div`
  margin: auto;
  padding: 5px;
  width: 300px;
  height: 30px;
`;

export const TitleWrapper = styled.div`
  margin: auto;
  padding: 5px;
  font-weight: 700;
  font-size: 1.2em;
  position: absolute;
  left: 3px;
`;

export const CloseButtonStyled = styled(Button)`
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 5px 7px;
`;
