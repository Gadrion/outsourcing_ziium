import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'wisenet-ui/components/atoms';
import { PatternIcons } from 'wisenet-ui/components/molecules';
import { PatternTabsStyled } from './PatternSelectStyled';

class PatternSelect extends Component {
  onClick = type => {
    const { onClick } = this.props;
    onClick(type);
  }

  render() {
    const tabData = [
      {
        key: 'tab_4_3',
        header: '4:3',
        component: (
          <PatternIcons type="4_3" onClick={this.onClick} />
        ),
      },
      {
        key: 'tab_16_9',
        header: '16:9',
        component: (
          <PatternIcons type="16_9" onClick={this.onClick} />
        ),
      },
    ];

    const tabArr = tabData.map(tab => (
      <Tab
        key={tab.key}
        header={tab.header}
        component={React.cloneElement(tab.component)}
      />
    ));

    return (
      <PatternTabsStyled>
        {tabArr}
      </PatternTabsStyled>
    );
  }
}

PatternSelect.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PatternSelect;
