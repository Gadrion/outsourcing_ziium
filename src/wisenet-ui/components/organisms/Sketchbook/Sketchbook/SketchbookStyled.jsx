import styled from 'styled-components';
import { CraypasRect, CraypasCircle } from 'wisenet-ui/components/organisms/Sketchbook/Craypas/Craypas';

const styled100Percent = () => `
  width: 100%;
  height: 100%;
`;

export const styledCommonSvg = () => `
  ${styled100Percent};
  position: absolute;
  z-index: 4;
`;

export const SketchbookDefaultStyled = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const SketchbookAbsoluteStyled = styled.div`
  ${styled100Percent};
  position: relative;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const CraypasRectStyled = styled(CraypasRect)`
  ${styledCommonSvg};
`;

export const CraypasCircleStyled = styled(CraypasCircle)`
  ${styledCommonSvg};
`;
