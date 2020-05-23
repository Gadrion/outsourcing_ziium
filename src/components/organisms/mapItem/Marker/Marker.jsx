import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { MarkerContainer } from 'containers/organisms';
import { Marker as GMarker, InfoWindow } from '@react-google-maps/api';
import { Button, TextField } from '@material-ui/core';
import { InfoWrapperStyled, InfoButtonWrapperStyled } from './MarkerStyled';

const Marker = ({
	onLoad, position, label, onClick, marker, isOpen, memo,
}) => (
	<GMarker
			onLoad={onLoad}
			position={position}
			label={label}
			onClick={onClick('marker')}
	>
		{isOpen && <InfoWindow anchor={marker}>
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
		</InfoWindow>}
	</GMarker>
)

export default withContainer(MarkerContainer, Marker);