/* eslint-disable react/prop-types */
import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { WorkPageContainer } from 'containers/pages';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker, SeachBox, PositionSearchListPopover } from 'components/organisms';
import { FirebaseDatabaseNode } from '@react-firebase/database';

import {
  ButtonStyled, LogoutAreaStyled, TopCenterAreaStyled, TopRightAreaStyled, LeftBottomAreaStyled,
  PendingDiv, SearchResultButtonStyled, RightBottomEdgeStyled,
} from './WorkPageStyled';
import { googleMapsApiKey } from '../../../firebase/config';
import ItemSearchForm from '../../ItemSearchForm/ItemSearchForm';

class WorkPage extends React.PureComponent {
  render() {
    const {
      libraries,
      onClick, viewType, addItemFocus, currentPosion, modifyMapList, load,
      positionSearchOpen, setSearchPositionOpen,
      itemSearchOpen, showIncompleteOpen,
    } = this.props;
    return (
      <>
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          libraries={libraries}
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
                    Object.keys(mapDataList).map(mapDataKey => (
                      <Marker key={mapDataList[mapDataKey].placeId} {...mapDataList[mapDataKey]} />
                    ))
                  ) : <></>
                );
              }}
            </FirebaseDatabaseNode>
            {/* 수정중인 맵 리스트 */}
            {modifyMapList.map(mapData => (
              <Marker key={mapData.placeId} {...mapData} />
            ))}
            {positionSearchOpen && (
              <SeachBox isOpen={positionSearchOpen} setSearchPositionOpen={setSearchPositionOpen} />
            )}
          </GoogleMap>
        </LoadScript>
        {/* map위에 올라오는 버튼들 */}
        <SearchResultButtonStyled>
          <PositionSearchListPopover />
        </SearchResultButtonStyled>
        <LogoutAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('logout')} disabled>로그아웃</ButtonStyled>
        </LogoutAreaStyled>
        <TopCenterAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('addItem')} color={addItemFocus ? 'primary' : 'default'}>물건추가</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('positionSearch')}>위치검색</ButtonStyled>
        </TopCenterAreaStyled>
        <TopRightAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('all')} color={viewType === 'all' ? 'primary' : 'default'}>전체</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('newItem')} color={viewType === 'newItem' ? 'primary' : 'default'}>신축</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('oldItem')} color={viewType === 'oldItem' ? 'primary' : 'default'}>구옥</ButtonStyled>
        </TopRightAreaStyled>
        <LeftBottomAreaStyled onMouseLeave={onClick('itemSearchClose')}>
          <ButtonStyled variant="outlined" onClick={onClick('itemSearch')}>물건검색</ButtonStyled>
          <ItemSearchForm isOpen={itemSearchOpen} />
        </LeftBottomAreaStyled>
        <RightBottomEdgeStyled right bottom>
          <ButtonStyled variant="outlined" onClick={onClick('showIncomplete')} color={showIncompleteOpen ? 'primary' : 'default'}>완료물건안보기</ButtonStyled>
          {/* <ButtonStyled variant="contained" onClick={onClick('refresh')}>새로고침</ButtonStyled> */}
        </RightBottomEdgeStyled>
        {load && <PendingDiv />}
      </>
    );
  }
}

WorkPage.propTypes = {
  // umpScriptOnload: PropTypes.func.isRequired,
};

export default withContainer(WorkPageContainer, WorkPage);
