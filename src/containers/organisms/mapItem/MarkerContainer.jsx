import { Component } from 'react';
import PropTypes from 'prop-types';
import { MapActions } from 'store/actionCreators';
import { connect } from 'react-redux';

class MarkerContainer extends Component {
	state = {
		isOpen: false,
	};

	onLoad = marker => {
		this.marker = marker;
		console.log('marker: ', marker);
	}

	onClick = type => event => {
		switch(type) {
			case 'marker': {
				const { placeId } = this.props;
				MapActions.showMapData({ placeId });
				break;
			}
			case 'info': {
				const {
					userId, position, address, label, placeId, memo, history,
				} = this.props;
				MapActions.updateMapData({
					userId,
					position,
					address,
					label,
					placeId,
					memo,
					history,
				})
				break;
			}
			case 'delete': {
				const { placeId } = this.props;
				MapActions.deleteMapData({ placeId });
				break;
			}
		}
	}

	render() {
		const { render } = this.props;
		return render({
			...this,
			...this.state,
			...this.props,
		});
	}
}

MarkerContainer.defaultProps = {
	label: 'qwe',
	position: {
    lat: 37.772,
    lng: -122.214
  }
};

MarkerContainer.propTypes = {
	label: PropTypes.string,
	position: PropTypes.shape({
		lat: PropTypes.number,
		lag: PropTypes.number,
	})
};

export default connect(
  (state, props) => {
		const showPlaceId = state.mapModule.get('showPlaceId');
		const { placeId } = props;
		return ({
    	isOpen: showPlaceId === placeId,
		});
	},
)(MarkerContainer);
