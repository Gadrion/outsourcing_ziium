import styled from 'styled-components';

export const ThumbStyled = styled.div`
  display: 'inline-flex';
  border-radius: 2;
  border: '1px solid #eaeaea';
  margin-bottom: 8;
  margin-right: 8;
  width: 100;
  height: 100;
  padding: 4;
  box-sizing: 'border-box';
`;

export const ThumbInner = styled.div`
  display: 'flex';
  min-width: 0;
  overflow: 'hidden';
`;

export const ImageStyled = styled.img`
  display: 'block';
  width: 'auto';
  height: '100%';
`;

export const ThumbRootStlyed = styled.aside`
  display: 'flex';
  flex-direction: 'row';
  flex-wrap: 'wrap';
  margin-top: 16;
`;
