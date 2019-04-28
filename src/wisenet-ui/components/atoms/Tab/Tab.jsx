import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  HeaderListStyled,
} from './TabStyled';

const Tab = ({
  header,
  tabIndex,
  isActive,
  onClick,
  noBorder,
  maxRow,
  align,
  toolTip,
  className,
  name,
  onSelectedTab,
}) => (
  <React.Fragment>
    <HeaderListStyled
      className={`
        ${
          classNames({
            active: isActive,
            multiLine: maxRow,
            empty: (header === null),
            align,
            right: (align === 'right'),
            noBorder,
          })
        }
        ${className}
      `}
      onClick={e => {
        e.preventDefault();
        if (name) {
          onSelectedTab(name);
        }
        onClick(tabIndex);
      }}
      title={toolTip}
    >
      {header}
    </HeaderListStyled>
  </React.Fragment>
);


Tab.propTypes = {
  header: PropTypes.node,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  isActive: PropTypes.bool,
  noBorder: PropTypes.bool,
  maxRow: PropTypes.number,
  align: PropTypes.string,
  toolTip: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  name: PropTypes.string,
  onSelectedTab: PropTypes.func,
};

Tab.defaultProps = {
  onClick: () => null,
  tabIndex: 0,
  isActive: false,
  noBorder: false,
  maxRow: 0,
  align: null,
  header: null,
  toolTip: '',
  className: null,
  name: '',
  onSelectedTab: () => {},
};

export default Tab;
