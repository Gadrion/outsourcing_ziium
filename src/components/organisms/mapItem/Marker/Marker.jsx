/* eslint-disable react/prop-types */
import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { MarkerContainer } from 'containers/organisms';
import { Marker as GMarker, InfoWindow } from '@react-google-maps/api';
import { Button, TextField, Input } from '@material-ui/core';
import { InfoWrapperStyled, InfoButtonWrapperStyled } from './MarkerStyled';
import StuffModal from '../../../../pages/stuff/StuffModal/StuffModal';

const Marker = ({
  onLoad, position, label, onClick, marker, isOpen, memo,
  visible,
}) => (
  <GMarker
    onLoad={onLoad}
    position={position}
    label={label}
    onClick={onClick('marker')}
    visible={visible}
    icon={{
      // url: `http://maps.google.com/mapfiles/ms/icons/blue.png`,
      // scaledSize: new window.google.maps.Size(19,19),
      // fillColor: '#2ecc71',
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: '#34495e',
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1,
    }}
    options
  >
    {isOpen && (
      <>
        <InfoWindow anchor={marker} onCloseClick={onClick('close')}>
          <InfoWrapperStyled>
            <TextField
              label="상세정보"
              multiline
              rows={4}
              value={memo}
              variant="outlined"
              size="small"
              disabled
            />
            <InfoButtonWrapperStyled>
              <Button size="small" variant="outlined" onClick={onClick('info')}>상세정보 입력</Button>
              <Button size="small" variant="outlined" onClick={onClick('delete')}>삭제</Button>
            </InfoButtonWrapperStyled>
          </InfoWrapperStyled>
        </InfoWindow>
        <StuffModal />
      </>
    )}

  </GMarker>
);

export default withContainer(MarkerContainer, Marker);
