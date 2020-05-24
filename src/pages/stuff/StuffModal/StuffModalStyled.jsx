import styled from 'styled-components';

import { ReactModalAdapter } from 'wisenet-ui/components/atoms';

export const StuffModalStyled = styled(ReactModalAdapter).attrs({
  className: 'Popup',
})`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  
  .ReactModal__Overlay {
    width: 100%;
    height: 100%;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    background-color: rgba(0,0,0,.5) !important;
  }

  .ReactModal__Content {
    top: 50% !important;
    left: 50% !important;
    width: 80%;
    height: 70%;
    transform: translate(-50%, -50%) !important;
    background-color: #fff !important;
  }

  .ReactModal__Content--after-open {
    padding: 0px !important;
    overflow: hidden !important;
  }
`;

export const StuffStyled = styled.div`
  height: 100%;
  overflow: auto;
`;
