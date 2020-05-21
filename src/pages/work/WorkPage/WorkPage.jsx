import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { withContainer } from 'wisenet-ui/util/hoc';
import * as themes from 'wisenet-ui/styles/themes';
import { LoginActions } from 'store/actionCreators';
import { WorkPageContainer } from 'containers/pages';
import * as firebase from 'firebase';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import {
  ButtonStyled, LogoutAreaStyled, TopCenterAreaStyled, TopRightAreaStyled, LeftBottomAreaStyled
} from './WorkPageStyled';

class WorkPage extends React.Component {
  state = {
    isOpen: false,
  };

  containerStyle = {
    width: '100wv',
    height: '100vh'
  };

  center = {
    lat: 37.772,
    lng: -122.214
  };

  position = {
    lat: 37.772,
    lng: -122.214
  }

  position2 = {
    lat: 37.772,
    lng: -122.214
  }

  onLoad = marker => {
    this.marker = marker;
    console.log('marker: ', marker)
  }

  onClick = marker => {
    console.log('marker: ', marker);
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { onClick, viewType, addItemFocus } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <LoadScript
          googleMapsApiKey="AIzaSyDwKM1Pfr80o1hSX1C0tnHxplUzuaLe_Gw"
        >
          <GoogleMap
            mapContainerStyle={this.containerStyle}
            center={this.center}
            zoom={10}
            onClick={onClick('map')}
            options={{
              fullscreenControl: false,
            }}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <Marker
              onLoad={this.onLoad}
              position={this.position}
              label='qweqwq'
              onClick={this.onClick}
            >
              {isOpen && <InfoWindow anchor={this.marker}>
                <div>
                  qweqwq
                  {/* <Button>qweqwe</Button> */}
                </div>
              </InfoWindow>}
            </Marker>
          </GoogleMap>
        </LoadScript>
        <LogoutAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('logout')}>로그아웃</ButtonStyled>
        </LogoutAreaStyled>
        <TopCenterAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('addItem')} checkType={addItemFocus}>물건추가</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('positionSearch')}>위치검색</ButtonStyled>
        </TopCenterAreaStyled>
        <TopRightAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('all')} checkType={viewType === 'all'}>전체</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('newItem')} checkType={viewType === 'newItem'}>신축</ButtonStyled>
          <ButtonStyled variant="outlined" onClick={onClick('oldItem')} checkType={viewType === 'oldItem'}>구옥</ButtonStyled>
        </TopRightAreaStyled>
        <LeftBottomAreaStyled>
          <ButtonStyled variant="outlined" onClick={onClick('itemSearch')}>물건검색</ButtonStyled>
        </LeftBottomAreaStyled>
      </>
    );
  }
}

WorkPage.propTypes = {
  // umpScriptOnload: PropTypes.func.isRequired,
};

export default withContainer(WorkPageContainer, WorkPage);
