import { Component } from 'react';
import PropTypes from 'prop-types';

class MarkerContainer extends Component {
	state = {
		isOpen: false,
	};

	onLoad = marker => {
		this.marker = marker;
		console.log('marker: ', marker);
	}

	onClick = marker => {
		console.log('marker: ', marker);
		const { isOpen } = this.state;
		this.setState({
				isOpen: !isOpen,
		});
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
