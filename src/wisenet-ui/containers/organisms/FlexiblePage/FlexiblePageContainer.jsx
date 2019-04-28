import React from 'react';
import PropTypes from 'prop-types';

class FlexiblePageContainer extends React.Component {
  state = {
    sideWidth: 300,
  }

  rnd = null;

  componentDidMount() {
    const {
      sideResizing,
      defaultSideWidth,
    } = this.props;

    if (sideResizing) {
      window.addEventListener('resize', this.onUpdateSidebarPosition);
      this.onUpdateSidebarPosition();
    }

    this.setState({
      sideWidth: defaultSideWidth,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      sidePosition,
    } = this.props;
    if (prevProps.sidePosition !== sidePosition && this.rnd !== null) {
      this.onUpdateSidebarPosition();
    }
  }

  componentWillUnmount() {
    const {
      sideResizing,
    } = this.props;

    if (sideResizing) {
      window.removeEventListener('resize', this.onUpdateSidebarPosition);
    }
  }

  innerRef = ref => {
    this.rnd = ref;
  };

  onResizeSidebar = e => {
    const {
      sidePosition,
    } = this.props;

    const sideWidth = sidePosition === 'right' ? document.body.offsetWidth - e.clientX : e.clientX;
    this.setState({
      sideWidth,
    });
  }

  onUpdateSidebarPosition = () => {
    const {
      sidePosition,
    } = this.props;

    const {
      sideWidth,
    } = this.state;

    if (this.rnd !== null) {
      const offsetWidth = sidePosition === 'right' ? document.body.offsetWidth - sideWidth : 0;
      this.rnd.updatePosition({ x: offsetWidth, y: 0 });
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

FlexiblePageContainer.defaultProps = {
  sidePosition: 'left',
  sideResizing: false,
  defaultSideWidth: 300,
};

FlexiblePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
  sidePosition: PropTypes.string,
  sideResizing: PropTypes.bool,
  defaultSideWidth: PropTypes.number,
};

export default FlexiblePageContainer;
