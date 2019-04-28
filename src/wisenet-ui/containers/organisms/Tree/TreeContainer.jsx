import React from 'react';
import PropTypes from 'prop-types';
import { TreeTitle } from 'wisenet-ui/components/organisms';

class TreeContainer extends React.Component {
  state = {
    treeDataRender: [],
  }

  componentDidMount() {
    this.updateTreeData();
  }

  componentDidUpdate(prevProps) {
    const {
      exportTreeData,
      treeData,
    } = this.props;

    if (exportTreeData) {
      this.exportTreeDataFunc();
    }

    if (JSON.stringify(prevProps.treeData) !== JSON.stringify(treeData)) {
      this.updateTreeData();
    }
  }

  updateTreeData = () => {
    const {
      treeData,
      showCheckbox,
      showIcon,
    } = this.props;
    if (showCheckbox || showIcon) {
      const treeDataTemp = this.makeTreeTitle(
        treeData,
        showCheckbox,
        showIcon,
      );

      this.setState({
        treeDataRender: treeDataTemp,
      });
    } else {
      const treeDataTemp = treeData.map(titem => {
        const treeMakedInfo = { ...titem, title: <span>{titem.name}</span> };
        return treeMakedInfo;
      });
      this.setState({
        treeDataRender: treeDataTemp,
      });
    }
  }


  makeTreeTitle = (
    treeData,
    showCheckbox,
    showIcon,
  ) => {
    const tempNode = treeData.map(titem => {
      const treeItem = titem;
      const treeMakedInfo = {
        id: '',
        name: {},
      };

      treeMakedInfo.id = treeItem.id;
      if (treeItem.name) {
        treeMakedInfo.name = treeItem.name;
      }
      if (treeItem.icon !== undefined) {
        treeMakedInfo.icon = treeItem.icon;
      }
      if (treeItem.checked !== undefined) {
        treeMakedInfo.checked = treeItem.checked;
      }
      if (treeItem.expanded) {
        treeMakedInfo.expanded = treeItem.expanded;
      }
      if (treeItem.parents) {
        treeMakedInfo.parents = treeItem.parents;
      }
      if (treeItem.children) {
        treeMakedInfo.children = treeItem.children;
      }
      if (treeItem.data) {
        treeMakedInfo.data = treeItem.data;
      }

      treeMakedInfo.title = (
        <TreeTitle
          treeItem={{ ...treeItem, title: <span>{treeItem.name}</span> }}
          onClickNode={this.onChangeCheck}
          showCheckbox={showCheckbox}
          showIcon={showIcon}
        />
      );

      if (treeItem.children) {
        if (treeItem.children.length !== 0) {
          treeMakedInfo.children = this.makeTreeTitle(
            treeItem.children,
            showCheckbox,
            showIcon,
          );
        }
      }
      return treeMakedInfo;
    });

    return tempNode;
  }

  // 콜백 (노드를 클릭하면 받는 함수)
  onChangeCheck = selectedNode => {
    const { treeDataRender: stateTreeData } = this.state;
    const treeData = stateTreeData.splice(0);
    const {
      treeNodeClick,
      showCheckbox,
      showIcon,
      onSelectChanged,
    } = this.props;

    const checkChangedTreeData = this.checkedTreeData(selectedNode, treeData);
    const allParentsChangedData = this.parentsNodeStatusChange(
      selectedNode,
      checkChangedTreeData,
      treeData,
    );
    const treeDataTemp = this.makeTreeTitle(
      allParentsChangedData,
      showCheckbox,
      showIcon,
    );

    this.setState({
      treeDataRender: treeDataTemp,
    });
    treeNodeClick(selectedNode);

    if (onSelectChanged) {
      onSelectChanged(treeDataTemp);
    }
  }

  // 로직
  checkedTreeData = (selectedNode, treeDataChildren) => {
    // 어떤 노드의 체크 상태를 변경 했을 때 해당 노드의 checked 상태 변경 하는 함수
    const changedTreeData = treeDataChildren.map(t => {
      const currentTreeNode = t;
      if (selectedNode.id === currentTreeNode.id) {
        if (currentTreeNode.checked === 0 || currentTreeNode.checked === 2) {
          currentTreeNode.checked = 1;
        } else if (currentTreeNode.checked === 1) {
          currentTreeNode.checked = 0;
        }
        if (currentTreeNode.children) {
          currentTreeNode.children = this.recursiveCallToCheckTreeChilde(currentTreeNode);
        }
      }

      if (currentTreeNode.children) {
        if (currentTreeNode.children.length !== 0) {
          currentTreeNode.children = this.checkedTreeData(selectedNode, currentTreeNode.children);
        }
      }
      return currentTreeNode;
    });
    return changedTreeData;
  }

  // 로직
  recursiveCallToCheckTreeChilde = currentTreeNode => {
    // 하위 노드 탐색하여 부모의 상태에 맞추어 바꿔 주는 함수
    const result = currentTreeNode.children.map(tc => {
      const treeChild = tc;
      treeChild.checked = currentTreeNode.checked;
      if (treeChild.children) {
        if (treeChild.children.length !== 0) {
          treeChild.children = this.recursiveCallToCheckTreeChilde(treeChild);
        }
      }
      return treeChild;
    });
    return result;
  }

  parentsNodeStatusChange = (selectedNode, searchData, treeAllData) => {
    // 하위 노드가 체크 해제 되었을 때 parents 노드를 탐색하여 parents 노드의 체크상태를 변경 하는 함수
    const changedTreeData = searchData.map(treeItemData => {
      const treeItem = treeItemData;
      if (selectedNode.parents) {
        if (selectedNode.parents[0] === treeItem.id) {
          const resultChildren = this.CheckAllChildren(selectedNode, treeItem.children);
          treeItem.checked = resultChildren;
          if (selectedNode.parents.length > 1) {
            this.parentsNodeStatusChange(treeItem, treeAllData, treeAllData);
          }
        }
      }
      if (treeItem.children) {
        if (treeItem.children.length !== 0) {
          this.parentsNodeStatusChange(selectedNode, treeItem.children, treeAllData);
        }
      }
      return treeItem;
    });

    return changedTreeData;
  }

  CheckAllChildren = (node, treeDatas) => {
    // 하위 노드가 모두 체크 되었을 때 parents 노드를 탐색하여 parents 노드의 체크 하는 함수
    let result = 0;
    const checkAllChildren = treeDatas.map(tdata => {
      const tData = tdata;
      if (tData.checked === 1) { return 1; }
      if (tData.checked === 2) { return 2; }
      return 0;
    });
    const ResultTrue = checkAllChildren.filter(item => (
      item === 1
    ));
    const ResultPartialTrue = checkAllChildren.filter(item => (
      item === 2
    ));
    if (ResultTrue.length === treeDatas.length) {
      result = 1;
    } else if (
      (ResultTrue.length < treeDatas.length && ResultTrue.length > 0)
      || ResultPartialTrue.length > 0) {
      result = 2;
    }
    return result;
  }

  onToggle = treeData => {
    // Tree의 하위 노드 open/close 함수
    this.setState({
      treeDataRender: treeData,
    });
  }

  exportTreeDataFunc = () => {
    // treeData를 외부로 내보내기 위한 함수
    const { treeDataRender } = this.state;
    const { exportTreeDataFunc, setApply } = this.props;

    exportTreeDataFunc(treeDataRender);
    setApply(false);
  }

  render() {
    const { render } = this.props;
    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

TreeContainer.defaultProps = {
  treeNodeClick: () => {},
  showCheckbox: false,
  showIcon: false,
  exportTreeData: false,
  exportTreeDataFunc: () => {},
  setApply: () => {},
  onSelectChanged: () => {},
};

TreeContainer.propTypes = {
  render: PropTypes.func.isRequired,
  treeData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.instanceOf(Object),
    checked: PropTypes.number, // 0 : checked false, 1: checked true, 2: checked some children
    expanded: PropTypes.bool,
    parents: PropTypes.any,
    children: PropTypes.any,
    data: PropTypes.instanceOf(Object),
  })).isRequired,
  treeNodeClick: PropTypes.func,
  showCheckbox: PropTypes.bool,
  showIcon: PropTypes.bool,
  exportTreeData: PropTypes.bool,
  exportTreeDataFunc: PropTypes.func,
  setApply: PropTypes.func,
  onSelectChanged: PropTypes.func,
};

export default TreeContainer;
