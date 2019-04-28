import styled from 'styled-components';

export const Container = styled.div`
  width: 270px;
  min-height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: 'none';
  margin-left: 10px;
`;

export const DisableMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: block;
`;

export const ZoomFocusWrapper = styled.div`
  flex-basis: 90px;
  padding-bottom: 20px;
  display: flex;
`;

export const TabWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
