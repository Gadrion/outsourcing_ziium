import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { withContainer } from 'wisenet-ui/util/hoc';
import * as themes from 'wisenet-ui/styles/themes';
import { LoginActions } from 'store/actionCreators';
import { WorkPageContainer } from 'containers/pages';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

class WorkPage extends React.Component {
  state = {
    isOpen: false,
  };

  containerStyle = {
    width: '400px',
    height: '400px'
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

  componentDidMount() {
    // this.setTest();
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
    const { children, theme } = this.props;
    const { isOpen } = this.state;
    const mapStyles = {
      width: '100%',
      height: '100%',
   };
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyDwKM1Pfr80o1hSX1C0tnHxplUzuaLe_Gw"
      >
        <GoogleMap
          mapContainerStyle={this.containerStyle}
          center={this.center}
          zoom={10}
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
    );
  }
}

WorkPage.propTypes = {
  // umpScriptOnload: PropTypes.func.isRequired,
};

export default withContainer(WorkPageContainer, WorkPage);
