import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class TabsContainer extends React.Component {
  state = {
    selectedTabIndex: 0,
  }

  componentDidMount() {
    const { align, children, defaultTabIndex } = this.props;
    this.setState({
      selectedTabIndex: (align === 'right') ? children.length - 1 : defaultTabIndex,
    });
  }

  handleTabClick = tabIndex => {
    if (tabIndex === null) {
      return;
    }
    this.setState({
      selectedTabIndex: tabIndex,
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

TabsContainer.defaultProps = {
  defaultTabIndex: 0,
  align: null,
};

TabsContainer.propTypes = {
  render: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  defaultTabIndex: PropTypes.number,
  align: PropTypes.string,
};

export default TabsContainer;
