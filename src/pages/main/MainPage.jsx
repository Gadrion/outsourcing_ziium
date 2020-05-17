import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { MainRoute } from 'routes';
import { MainPageContainer } from 'containers/pages';
import { Header } from 'components/organisms';
import { MainContainerStyled } from './MainPageStyled';
import { VideoTile } from 'wisenet-ui/components/organisms';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';

const MainPage = ({ onClick, backup, sessionKey }) => (
  <MainContainerStyled>
    <MainRoute />
  </MainContainerStyled>
);

export default withContainer(MainPageContainer, MainPage);
