import styled from 'styled-components';
import { Modal, Paper } from '@material-ui/core';

export const ModalStyled = styled(Modal)`
  display:flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const StuffStyled = styled.div`
  height: 80vh;
  width: 80vw;
  overflow: auto;
`;

export const PaperStyled = styled(Paper)`
  position: absolute;
`;
