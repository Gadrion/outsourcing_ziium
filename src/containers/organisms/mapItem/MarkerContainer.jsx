import { Component } from 'react';
import PropTypes from 'prop-types';
import { MapActions } from 'store/actionCreators';

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
				console.log('marker: ', event);
				const { isOpen } = this.state;
				this.setState({
						isOpen: !isOpen,
				});
				break;
			}
			case 'info': {
				const {
					userId, position, address, label, placeId, memo,
				} = this.props;
				MapActions.updateMapData({
					userId,
					position,
					address,
					label,
					placeId,
					memo,
				})
				break;
			}
			case 'delete':
				break;
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

export default MarkerContainer;
