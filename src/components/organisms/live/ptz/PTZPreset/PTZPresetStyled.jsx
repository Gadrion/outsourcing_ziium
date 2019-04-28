import styled, { withTheme } from 'styled-components';
import { Table } from 'wisenet-ui/components/organisms';
import { Button, ReactModalAdapter } from 'wisenet-ui/components/atoms';

export const StyledPopup = styled(ReactModalAdapter).attrs({
    className: "Popup",
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
    width: 292px;
    height: 207px;
    transform: translate(-50%, -50%) !important;
    background-color: #fff !important;
  }

  .ReactModal__Content--after-open {
    padding: 0px !important;
    overflow: hidden !important;
  }
`;

export const Container = styled.div`
  position: relative;
  pointer-events: 'none';
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  & > div {
    :nth-last-child(1) {
      & > div {
        width: 100%;
        overflow-y: auto;
        height: 100%;
      }
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 15px;
`;

export const TableWrapper = withTheme(styled.div`
  margin: 15px;
  border: 1px solid ${props => props.theme.colorSub9};
  height: 330px;
`);

export const PresetDisableMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: block;
`;

export const StyledTable = withTheme(styled(Table)`
  .custom-header {
    background-color: ${props => props.theme.colorSub1};
  }
  border: 1px solid ${props => props.theme.colorSub9};
`);

export const StyledButton = withTheme(styled(Button)`
  border-left-width: 1px;
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colorSub9};
  text-align: center;
  font-family: NotoSans;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  width: 70px;
  height: 30px;
  padding: 0px;
  margin-left: 5px;
`);
