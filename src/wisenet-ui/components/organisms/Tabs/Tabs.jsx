import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TabsContainer } from 'wisenet-ui/containers/organisms';
import classNames from 'classnames';
import {
  HeaderStyled,
  ContentStyled,
} from './TabsStyled';

const renderTabHeadComponent = (
  children,
  noBorder,
  maxRow,
  align,
  handleTabClick,
  selectedTabIndex,
) => {
  if (maxRow) {
    const uiTamplate = [];
    const lineLength = Math.ceil(children.length / maxRow);
    for (let i = 0; i < lineLength; i += 1) {
      uiTamplate[i] = [];
      for (let j = 0; j < maxRow; j += 1) {
        const childIndex = (i * maxRow) + j;
        if (typeof children[childIndex] !== 'undefined') {
          uiTamplate[i][j] = React.cloneElement(children[childIndex], {
            onClick: handleTabClick,
            tabIndex: childIndex,
            isActive: childIndex === selectedTabIndex,
            noBorder,
            maxRow,
          });
        } else {
          const key = `undefined_${j}`;
          uiTamplate[i][j] = React.cloneElement(children[0], {
            header: null,
            key,
            noBorder,
          });
        }
      }
    }
    return uiTamplate.map(child => (
      <ul style={{ display: 'flex' }} key={child[0].key}>
        {child}
      </ul>
    ));
  }
  return children.map((child, index) => (
    React.cloneElement(child, {
      onClick: handleTabClick,
      tabIndex: index,
      isActive: index === selectedTabIndex,
      noBorder,
      align,
    })
  ));
};

const Tabs = ({
  className,
  align,
  maxRow,
  children,
  noBorder,
  handleTabClick,
  selectedTabIndex,
}) => (
  <div className={className}>
    <HeaderStyled
      className={`
        ${
          classNames({
            right: (align && align === 'right'),
            multiLine: maxRow,
          })
        }
      `}
    >
      {
        renderTabHeadComponent(children, noBorder, maxRow, align,
          handleTabClick, selectedTabIndex)
      }
    </HeaderStyled>
    {
      children.map((child, index) => (
        <ContentStyled
          className={
            classNames({
              noneDisplay: (selectedTabIndex !== index),
              noBorder,
            })
          }
          key={child.key}
        >
          {child.props.component}
        </ContentStyled>
      ))
    }
  </div>
);

Tabs.defaultProps = {
  noBorder: false,
  className: null,
  maxRow: 0,
  align: null,
  handleTabClick: () => {},
  selectedTabIndex: 0,
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  maxRow: PropTypes.number,
  align: PropTypes.string,
  handleTabClick: PropTypes.func,
  selectedTabIndex: PropTypes.number,
};

export default withContainer(TabsContainer, Tabs);
