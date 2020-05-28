import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { WorkPageContainer } from 'containers/pages';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker, SeachBox, PositionSearchListPopover } from 'components/organisms';
import { FirebaseDatabaseNode } from "@react-firebase/database";
import {
  ButtonStyled, LogoutAreaStyled, TopCenterAreaStyled, TopRightAreaStyled, LeftBottomAreaStyled,
  PendingDiv, SearchResultButtonStyled,
} from './WorkPageStyled';
import { googleMapsApiKey } from '../../../firebase/config';

class WorkPage extends React.Component {
  render() {
    const {
      onClick, viewType, addItemFocus, currentPosion, modifyMapList, load,
      positionSearchOpen, setSearchPositionOpen,
    } = this.props;
    return (
      <>
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          libraries={['places']}
        >
          <GoogleMap
            mapContainerStyle={{ width: '100wv', height: '100vh' }}
            center={currentPosion}
            zoom={15}
            onClick={onClick('map')}
            options={{
              fullscreenControl: false,
            }}
          >
            <FirebaseDatabaseNode path="map">
              {event => {
                console.log('event', event);
                const mapDataList = event.value;
                return (
                  mapDataList ? (
                    Object.keys(mapDataList).map(
                      mapDataKey => <Marker key={mapDataList[mapDataKey].placeId} {...mapDataList[mapDataKey]} />)
                  ) : <></>
                );
              }}
            </FirebaseDatabaseNode>
            {/* 수정중인 맵 리스트 */}
            {modifyMapList.map((mapData) => (
              <Marker key={mapData.placeId} {...mapData} />
            ))}
            {positionSearchOpen && <SeachBox isOpen={positionSearchOpen} setSearchPositionOpen={setSearchPositionOpen} />}
          </GoogleMap>
        </LoadScript>
        {/* map위에 올라오는 버튼들 */}
        <SearchResultButtonStyled>
          <PositionSearchListPopover />
        </SearchResultButtonStyled>
        <LogoutAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('logout')}>로그아웃</ButtonStyled>
        </LogoutAreaStyled>
        <TopCenterAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('addItem')} checkViewType={addItemFocus}>물건추가</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('positionSearch')}>위치검색</ButtonStyled>
        </TopCenterAreaStyled>
        <TopRightAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('all')} checkViewType={viewType === 'all'}>전체</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('newItem')} checkViewType={viewType === 'newItem'}>신축</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('oldItem')} checkViewType={viewType === 'oldItem'}>구옥</ButtonStyled>
        </TopRightAreaStyled>
        <LeftBottomAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('itemSearch')}>물건검색</ButtonStyled>
        </LeftBottomAreaStyled>
        {load && <PendingDiv></PendingDiv>}
      </>
    );
  }
}

WorkPage.propTypes = {
  // umpScriptOnload: PropTypes.func.isRequired,
};

export default withContainer(WorkPageContainer, WorkPage);
