import styled, { withTheme } from 'styled-components';
import {
  Span,
} from 'wisenet-ui/components/atoms';

const ListULStyled = withTheme(styled.ul`
  list-style-type: none;
  margin: 0;
  padding-top:10px;
  padding-inline-start: 0;
  user-select: none;
  max-height: 600px;
`);

const ListLIStyled = withTheme(styled.li`
  height: 28px;
  width: 100%;
  line-height: 26px;
  position: relative;

  :hover {
    background-color: #fbd5bc;
  }

  &.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    transition: opacity  0s linear 1s;
  }

  &.realTimeEventComponent {
    min-height: 68px;
  }
`);

const ListMultiSelectRect = withTheme(styled.div`
  position: fixed;
  z-index: 1090;
  border:1px dashed black;
  pointer-events: none;
  display: none;
`);

const ListToolTipStyled = styled(Span)`
  visibility: hidden;
  width: 155px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: -50%;
  left: 45%;
  /* margin-left: -60px; */
  opacity: 0;
  transition: opacity 0.3s;

  &.tooltiptext::after {
    content: "";
    position: absolute;
    top: 50%;
    left: -5px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #555  transparent transparent;
  } 
`;

export {
  ListULStyled,
  ListLIStyled,
  ListToolTipStyled,
  ListMultiSelectRect,
};
