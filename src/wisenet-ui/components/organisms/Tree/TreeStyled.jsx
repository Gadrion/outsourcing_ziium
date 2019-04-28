import styled, { withTheme } from 'styled-components';
import {
  Label,
  Span,
  Checkbox,
  Button,
} from 'wisenet-ui/components/atoms';

const TreeStyled = withTheme(styled.div`
  height: 100%;

  ul li {
    background-color: ${props => props.theme.colorMain};
    color: ${props => props.theme.colorSub8};
  }
  
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    user-select: none;
    &:active{
      color: #f37321;
      cursor: 'pointer';
    }
    &:hover{
      opacity:.75;
      cursor:'pointer';
    }
  }
`);

const TreeTitleStyled = styled(Label)`
  width: 100%;
`;

const TreeIconSpanStyled = styled(Span)`
  margin-left : 5px;
`;

const TreeSpanStyled = styled(Span)`
  margin-left : 5px;
`;

const TreeCheckboxStyled = styled(Checkbox)`
  width: 100%;
`;

const TreeButtonStyled = styled(Button)`
  width: 25px !important;
  height: 25px !important;
  line-height: 25px !important;
  padding: 0px !important; 
  border: 0px !important;
  display: inline-block !important;
`;

const IconCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${props => props.color};
`;

export {
  TreeStyled,
  TreeTitleStyled,
  TreeIconSpanStyled,
  TreeSpanStyled,
  TreeCheckboxStyled,
  TreeButtonStyled,
  IconCircle,
};
