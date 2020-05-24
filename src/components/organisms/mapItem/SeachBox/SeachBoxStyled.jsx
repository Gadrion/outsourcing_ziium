import styled from 'styled-components';

export const SearchBoxWrapperStyled = styled.div`
  display: ${props => props.isOpen ? 'block': 'none'}
`;

export const SearchBoxBackgroundWrapperStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background: gray;
  position: absolute;
  opacity: 0.3;
  z-index: 1;
`;

export const ContentsWrapperStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 35%;
  background: white;
  min-width: 280px;
`;

export const InputWrapperStyled = styled.div`
  display: flex;
`;
