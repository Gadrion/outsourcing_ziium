import styled from 'styled-components';
import { Range } from 'rc-slider';
import { Button } from 'wisenet-ui/components/atoms';

export const SelectTimeRangeWrapperStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

export const ExportButtonStyled = styled(Button)`
  position: absolute;
  bottom: 14px;
  transform: translateY(100%);
`;

export const TimeRangeStyled = styled(Range)`
  position: absolute !important;
  top: 4px;
`;
