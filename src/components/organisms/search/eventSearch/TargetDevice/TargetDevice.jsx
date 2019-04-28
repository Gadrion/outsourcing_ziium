import React from 'react';
import { TargetDeviceContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SearchCameraList } from 'components/organisms';
import { Container, ListWrapper } from './TargetDeviceStyled';

const TargetDevice = () => (
  <Container>
    <ListWrapper>
      <SearchCameraList />
    </ListWrapper>
  </Container>
);

export default withContainer(TargetDeviceContainer, TargetDevice);
