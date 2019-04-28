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
    <Header />
    {/* <button onClick={onClick}>test</button>
    <VideoTile
      type={umpPlayMode.BACKUP}
      channel={1}
      backup={backup}
      sessionKey={sessionKey}
      startTime={'2019-04-15T15:00:00Z'}
      endTime={'2019-04-15T15:01:00Z'}
    /> */}
    <MainRoute />
  </MainContainerStyled>
);

export default withContainer(MainPageContainer, MainPage);
