import React from 'react';
import { LoadingShape, ScreenMask } from 'wisenet-ui/components/atoms';
import LoadingStyled from './LoadingStyled';

const Loading = () => (
  <React.Fragment>
    <LoadingStyled>
      <LoadingShape />
    </LoadingStyled>
    <ScreenMask />
  </React.Fragment>
);

export default Loading;
