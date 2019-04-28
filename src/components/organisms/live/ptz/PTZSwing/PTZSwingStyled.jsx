import styled, { withTheme } from 'styled-components';
import { Table } from 'wisenet-ui/components/organisms';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  pointer-events: 'none';
`;

export const SwingDisableMask = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: block;
`;

export const TableWrapper = withTheme(styled.div`
  margin: 15px;
  border: 1px solid ${props => props.theme.colorSub9};
  padding: 0px;
  height: 330px;
`);

export const StyledTable = withTheme(styled(Table)`
  .custom-header {
    background-color: ${props => props.theme.colorSub1};
  }
  border: 1px solid ${props => props.theme.colorSub9};
`);
