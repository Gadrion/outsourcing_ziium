import styled from 'styled-components';
import { Paper, Box } from '@material-ui/core';

export const PaperStyled = styled(Paper)`
  width: 450px;
  box-sizing: content-box;
  padding: 5px 10px;
  display: ${({ display }) => display}
`;

export const LayerStyled = styled(Box)`
  margin: 4px 0px;
`;
