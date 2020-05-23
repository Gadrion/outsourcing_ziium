import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { MarkerContainer } from 'containers/organisms';
import { Marker as GMarker, InfoWindow } from '@react-google-maps/api';

const Marker = ({
	onLoad, position, label, onClick, marker, isOpen
}) => (
	<GMarker
			onLoad={onLoad}
			position={position}
			label={label}
			onClick={onClick}
	>
		{isOpen && <InfoWindow anchor={marker}>
		<div>
				qweqwq
				{/* <Button>qweqwe</Button> */}
		</div>
		</InfoWindow>}
	</GMarker>
)

export default withContainer(MarkerContainer, Marker);