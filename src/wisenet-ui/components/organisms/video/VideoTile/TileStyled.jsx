import styled, { withTheme } from 'styled-components';

export default withTheme(styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colorSub7};
  ${props => (props.isSelectTile ? 'border: 1px solid #F37321;' : '')}

  &:hover {
    border: 1px solid orange;
  }

  &.noneDisplay {
    display: none;
  }
`);
