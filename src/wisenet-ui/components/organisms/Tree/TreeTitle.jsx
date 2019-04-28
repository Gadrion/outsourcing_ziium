import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  TreeTitleStyled,
  TreeCheckboxStyled,
  TreeSpanStyled,
  TreeIconSpanStyled,
  IconCircle,
} from './TreeStyled';

class TreeTitle extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      treeItem: nextTreeItem,
    } = nextProps;

    const {
      treeItem,
    } = this.props;

    if (JSON.stringify(nextTreeItem) === JSON.stringify(treeItem)) {
      return false;
    }
    return true;
  }

  render() {
    const {
      treeItem,
      showCheckbox,
      showIcon,
      onClickNode,
    } = this.props;

    return (
      <TreeTitleStyled>
        {showCheckbox
          ? (
            <React.Fragment>
              <TreeCheckboxStyled
                name="treeCheckbox"
                onChange={() => { onClickNode(treeItem); }}
                checked={treeItem.checked === 1}
                className={classNames({ haveCheckedChild: treeItem.checked === 2 })}
              />
              {(showIcon && treeItem.icon)
                && (
                  <TreeIconSpanStyled>
                    {/* {treeItem.icon} */}
                    <IconCircle color={treeItem.icon.color} />
                  </TreeIconSpanStyled>
                )
              }
              <TreeSpanStyled>
                {treeItem.title}
              </TreeSpanStyled>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {(showIcon && treeItem.icon)
                && (
                  <TreeIconSpanStyled>
                    {/* {treeItem.icon} */}
                    <IconCircle color={treeItem.icon.color} />
                  </TreeIconSpanStyled>
                )
              }
              <TreeSpanStyled onClick={() => { onClickNode(treeItem); }}>
                {treeItem.title}
              </TreeSpanStyled>
            </React.Fragment>
          )}
      </TreeTitleStyled>
    );
  }
}

TreeTitle.defaultProps = {
  showCheckbox: false,
  showIcon: false,
  onClickNode: () => {},
};

TreeTitle.propTypes = {
  treeItem: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.instanceOf(Object),
    icon: PropTypes.instanceOf(Object),
    checked: PropTypes.number, // 0 : checked false, 1: checked true, 2: checked some children
    expanded: PropTypes.bool,
    parents: PropTypes.any,
    children: PropTypes.any,
  }).isRequired,
  showCheckbox: PropTypes.bool,
  showIcon: PropTypes.bool,
  onClickNode: PropTypes.func,
};

export default TreeTitle;
