import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { WorkPageContainer } from 'containers/pages';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { Marker } from 'components/organisms';
import { FirebaseDatabaseNode } from "@react-firebase/database";
import {
  ButtonStyled, LogoutAreaStyled, TopCenterAreaStyled, TopRightAreaStyled, LeftBottomAreaStyled,
  PendingDiv,
} from './WorkPageStyled';
import { googleMapsApiKey } from '../../../firebase/config';

class WorkPage extends React.Component {
  onLoad = ref => this.searchBox = ref;

  onPlacesChanged = () => console.log(this.searchBox.getPlaces());

  render() {
    const {
      onClick, viewType, addItemFocus, currentPosion, modifyMapList, load,
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
            <StandaloneSearchBox
              onLoad={this.onLoad}
              onPlacesChanged={
                this.onPlacesChanged
              }
            >
              <input
                type="text"
                placeholder="Customized your placeholder"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px"
                }}
              />
            </StandaloneSearchBox>
          </GoogleMap>
        </LoadScript>
        {/* map위에 올라오는 버튼들 */}
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
