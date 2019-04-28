import styled from 'styled-components';

export const OSDWrapperStyled = styled.div`
  position: absolute;
  width: calc(100% - 2px);
  height: 28px;
  top: 1px;
  left: 1px;
  right: 1px;
  background-blend-mode: multiply;
  background-image: linear-gradient(to bottom, rgba(30, 30, 30, 0.6), rgba(30, 30, 30, 0.6));
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 0 8px;
  font-size: 14px;
`;
