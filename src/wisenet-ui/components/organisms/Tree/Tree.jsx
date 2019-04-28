import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import SortableTree from 'react-sortable-tree';
import 'styles/vendors/reactSortableTreeStyle.css';
import { TreeContainer } from 'wisenet-ui/containers/organisms';
import { TreeStyled } from './TreeStyled';

class Tree extends Component {
  componentDidMount() {
    // 처음 theme 적용을 위한 재 랜더
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps) {
    const {
      treeDataRender: nextTreeData,
    } = nextProps;

    const {
      treeDataRender,
    } = this.props;

    if (JSON.stringify(nextTreeData) === JSON.stringify(treeDataRender)) {
      return false;
    }
    return true;
  }

  render() {
    const {
      treeDataRender,
      onToggle,
      canDrag,
      // ...rest
    } = this.props;

    return (
      <TreeStyled>
        <SortableTree treeData={treeDataRender} onChange={onToggle} canDrag={!!canDrag} />
      </TreeStyled>
    );
  }
}

Tree.defaultProps = {
  canDrag: true,
};

Tree.propTypes = {
  treeDataRender: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.instanceOf(Object),
    icon: PropTypes.instanceOf(Object),
    checked: PropTypes.number, // 0 : checked false, 1: checked true, 2: checked some children
    expanded: PropTypes.bool,
    parents: PropTypes.any,
    children: PropTypes.any,
  })).isRequired,
  onToggle: PropTypes.func.isRequired,
  canDrag: PropTypes.bool,
};

export default withContainer(TreeContainer, Tree);
