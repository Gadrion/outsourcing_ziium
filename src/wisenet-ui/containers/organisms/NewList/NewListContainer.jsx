import React from 'react';
import PropTypes from 'prop-types';
import { NewListTitle } from 'wisenet-ui/components/molecules';
import { List, fromJS } from 'immutable';

class NewListContainer extends React.Component {
  dragStartItemId = '';

  dragStartItemIdx = -1;

  mouseDown = false;

  // Drag 선택 시 실시간으로 그려지는 사각형 TBD
  // dragRectLeft = 0;
  // dragRectTop = 0;

  state = {
    listData: List([]),
    selectedItems: List([]),
  }

  // Drag 선택 시 실시간으로 그려지는 사각형 TBD
  // constructor(props) {
  //   super(props);
  //   this.box = {};
  // }

  componentDidMount() {
    const {
      listData,
      showIndex,
      showCamChannelIndexIcon,
      showIcon,
      showCheckbox,
      dragAndDrop,
      realTimeEventComponent,
    } = this.props;
    const {
      selectedItems: curSelectedItemsTemp,
    } = this.state;
    const curSelectedItems = curSelectedItemsTemp.toJS();

    const listDataTemp = this.makeListTitle(
      listData,
      curSelectedItems,
      showIndex,
      showCamChannelIndexIcon,
      showIcon,
      showCheckbox,
      dragAndDrop,
      realTimeEventComponent,
    );

    this.setState({
      listData: fromJS(listDataTemp),
      selectedItems: fromJS(curSelectedItems),
    });

    this.forceUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      listData: prevPropsListDataTemp,
    } = prevProps;
    const {
      listData: curPropsListDataTemp,
      showIndex,
      showCamChannelIndexIcon,
      showIcon,
      showCheckbox,
      dragAndDrop,
      realTimeEventComponent,
    } = this.props;
    const {
      selectedItems: prevStateSelectedItemsTemp,
    } = prevState;
    const {
      listData: curStateListDataTemp,
      selectedItems: curStateSelectedItemsTemp,
    } = this.state;

    const prevPropsListData = prevPropsListDataTemp.toJS();
    const curPropsListData = curPropsListDataTemp.toJS();
    const prevStateSelectedItems = prevStateSelectedItemsTemp.toJS();
    const curStateSelectedItems = curStateSelectedItemsTemp.toJS();

    const curStateListData = curStateListDataTemp.toJS();

    if (JSON.stringify(prevPropsListData) !== JSON.stringify(curPropsListData)) {
      const listDataTemp = this.makeListTitle(
        fromJS(curPropsListData),
        curStateSelectedItems,
        showIndex,
        showCamChannelIndexIcon,
        showIcon,
        showCheckbox,
        dragAndDrop,
        realTimeEventComponent,
      );
      this.onUpdate(
        fromJS(listDataTemp),
        fromJS(curStateSelectedItems),
      );
    }
    if (JSON.stringify(prevStateSelectedItems) !== JSON.stringify(curStateSelectedItems)) {
      const listDataTemp = this.makeListTitle(
        fromJS(curStateListData),
        curStateSelectedItems,
        showIndex,
        showCamChannelIndexIcon,
        showIcon,
        showCheckbox,
        dragAndDrop,
        realTimeEventComponent,
      );
      this.onUpdate(
        fromJS(listDataTemp),
        fromJS(curStateSelectedItems),
      );
    }
  }

  onUpdate = (listData, selectedItems) => (
    this.setState({
      listData,
      selectedItems,
    })
  )

  makeListTitle = ( // 조건에 따라 List의 내용물 만들기 위한 함수
    immListData,
    selectedItems,
    showIndex,
    showCamChannelIndexIcon,
    showIcon,
    showCheckbox,
    dragAndDrop,
    realTimeEventComponent,
  ) => {
    const listData = immListData.toJS();
    const tempNode = listData.map((titem, idx) => {
      const listItem = titem;
      const listMakedInfo = {
        id: '',
        text: '',
        title: {},
      };

      listMakedInfo.id = listItem.id;
      listMakedInfo.text = listItem.text;

      if (listItem.iconLeft !== undefined) {
        listMakedInfo.iconLeft = listItem.iconLeft;
      }
      if (listItem.iconRight !== undefined) {
        listMakedInfo.iconRight = listItem.iconRight;
      }
      if (listItem.assigned !== undefined) {
        listMakedInfo.assigned = listItem.assigned;
      }
      if (listItem.focused !== undefined) {
        listMakedInfo.focused = listItem.focused;
      }
      if (listItem.data !== undefined) {
        listMakedInfo.data = listItem.data;
      }
      if (listItem.data.disableItem !== true || listItem.data.disableItem === undefined) {
        listMakedInfo.data.disableItem = false;
      }

      let selected = false;
      if (selectedItems.length > 0) {
        for (let i = 0; i < selectedItems.length; i += 1) {
          if (selectedItems[i].id === listItem.id) {
            selected = true;
          }
        }
      }

      listMakedInfo.title = (
        <NewListTitle
          listItem={listItem}
          disableItem={listItem.data.disableItem}
          status={listItem.data.status}
          idx={idx}
          selected={selected}
          showIndex={showIndex}
          showCamChannelIndexIcon={showCamChannelIndexIcon}
          showIcon={showIcon}
          showCheckbox={showCheckbox}
          dragAndDrop={dragAndDrop}
          dragFunc={this.onDragItemEnd}
          onInputChange={this.onInputValueChange}
          realTimeEventComponent={realTimeEventComponent}
        />
      );
      return listMakedInfo;
    });
    return tempNode;
  }

  onMouseDownToSelectItems = (id, idx) => {
    this.mouseDown = true;
    this.dragStartItemId = id;
    this.dragStartItemIdx = idx;

    // Drag 선택 시 실시간으로 그려지는 사각형 TBD
    // const ul = this.box.parentNode.querySelector('ul');
    // dragRectLeft = e.clientX - ul.offsetLeft;
    // dragRectTop = e.clientY - ul.offsetTop;
    // dragRectLeft = e.clientX;
    // dragRectTop = e.clientY;
    // const leftTemp = String(dragRectLeft);
    // const topTemp = String(dragRectTop);
    // const px = 'px';
    // this.box.style.left = leftTemp + px;
    // this.box.style.top = topTemp + px;
  }

  // Drag 선택 시 실시간으로 그려지는 사각형 TBD
  // onMouseMoveToDrawRect = e => {
  //   if (this.mouseDown) {
  //     const widthTemp = String(e.clientX - dragRectLeft);
  //     const heightTemp = String(e.clientY - dragRectTop);
  //     const px = 'px';
  //     this.box.style.width = widthTemp + px;
  //     this.box.style.height = heightTemp + px;
  //     this.box.style.display = 'block';
  //   }
  // }

  onDragItemEnd = e => {
    const targetTile = document.elementFromPoint(e.clientX, e.clientY);

    if (targetTile.isTile !== undefined) {
      if (this.mouseDown) {
        const {
          listData: stateListData,
          selectedItems: curStateSelectedItemsTemp,
        } = this.state;
        const listData = stateListData.toJS();
        const selectedItems = curStateSelectedItemsTemp.toJS();
        const result = [];

        for (let j = 0; j < listData.length; j += 1) {
          for (let i = 0; i < selectedItems.length; i += 1) {
            if (Number(listData[j].id) === Number(selectedItems[i].id)) {
              result.push(j);
            }
          }
        }
        this.dragEndListItem(result);
      }
    } else {
      this.recursiveCallToCheckTile(targetTile.parentElement, 0);
    }
  }

  recursiveCallToCheckTile = (e, count) => {
    let lCount = count;
    if (lCount < 5) {
      if (e.isTile) {
        if (this.mouseDown) {
          const {
            listData: stateListData,
            selectedItems: curStateSelectedItemsTemp,
          } = this.state;
          const listData = stateListData.toJS();
          const selectedItems = curStateSelectedItemsTemp.toJS();
          const result = [];

          for (let j = 0; j < listData.length; j += 1) {
            for (let i = 0; i < selectedItems.length; i += 1) {
              if (Number(listData[j].id) === Number(selectedItems[i].id)) {
                result.push(j);
              }
            }
          }
          this.dragEndListItem(result);
        }
      } else {
        this.recursiveCallToCheckTile(e.parentElement, lCount += 1);
      }
    }
  }

  dragEndListItem = selectedItems => { // 외부로 드래그 된 list item 또는 items를 알려주기 위한 함수
    const { exportDragListItems } = this.props;
    exportDragListItems(selectedItems);
  }

  onMouseUpToSelectItems = (e, dragEndItemId, dragEndItemIdx) => {
    const {
      multiSelect,
    } = this.props;
    const {
      listData: curStateListData,
    } = this.state;
    const listData = curStateListData.toJS();
    // Drag 선택 시 실시간으로 그려지는 사각형 TBD
    // this.box.style.display = 'none';

    if (this.dragStartItemId !== dragEndItemId && this.dragStartItemIdx !== -1 && multiSelect) {
      // 마우스 이벤트가 Drag 일때
      const {
        selectedItems: curSelectedItems,
      } = this.state;

      const tempSelectedItems = (e.shiftKey || e.ctrlKey) ? curSelectedItems.toJS() : [];
      if (dragEndItemIdx >= this.dragStartItemIdx) {
        for (let temp = this.dragStartItemIdx; temp <= dragEndItemIdx; temp += 1) {
          tempSelectedItems.push(listData[temp]);
        }
      } else if (dragEndItemIdx < this.dragStartItemIdx) {
        for (let temp = dragEndItemIdx; temp <= this.dragStartItemIdx; temp += 1) {
          tempSelectedItems.push(listData[temp]);
        }
      }

      this.dragStartItemId = '';
      this.dragStartItemIdx = -1;
      this.mouseDown = false;

      this.setState({
        selectedItems: fromJS(tempSelectedItems),
      });
    } else { // 마우스 이벤트가 Drag가 아닐때
      this.dragStartItemId = '';
      this.dragStartItemIdx = -1;
      this.mouseDown = false;

      this.onClickListItem(e, dragEndItemIdx);
    }
  }

  onMouseDoubleClickItem = (idx, item) => {
    this.dragStartItemId = '';
    this.dragStartItemIdx = -1;
    this.mouseDown = false;
    const tempSelectedItems = [];
    tempSelectedItems.push(item);

    const tempSelectedItemIdxToExport = [];
    tempSelectedItemIdxToExport.push(idx);

    this.setState({
      selectedItems: fromJS(tempSelectedItems),
    });
    this.doubleClickListItem(tempSelectedItemIdxToExport);
  }

  doubleClickListItem = selectedItems => { // 외부에서 선택된 list item 또는 items를 알려주기 위한 함수
    const { exportDBClickedListItems } = this.props;
    exportDBClickedListItems(selectedItems);
  }

  onClickListItem = (e, idx) => {
    const {
      multiSelect,
    } = this.props;
    const {
      listData: stateListData,
      selectedItems: curSelectedItems,
    } = this.state;
    const listData = stateListData.toJS();
    const selectedItems = curSelectedItems.toJS();

    if (multiSelect) {
      if (e.shiftKey && (selectedItems.length > 0)) {
        // Shift + click
        this.updateShiftSelectedItemsList(idx);
      } else if (e.ctrlKey) {
        // Ctrl + click
        if (idx < 0) {
          this.updateCTRLSelectedItemsList(0);
        } else if (listData.length < idx) {
          this.updateCTRLSelectedItemsList(listData.length);
        } else {
          this.updateCTRLSelectedItemsList(idx);
        }
      } else {
        // Nomarl Select
        this.updateNomarlSelectedItemsList(idx);
      }
    } else {
      // Nomarl Select
      this.updateNomarlSelectedItemsList(idx);
    }
  }

  updateShiftSelectedItemsList = selectedItem => {
    const {
      listData: curStateListData,
      selectedItems: curSelectedItems,
    } = this.state;
    const listData = curStateListData.toJS();
    const selectedItems = curSelectedItems.toJS();
    const tempSelectedItems = [];

    let startIndexNum = -1;
    for (let i = 0; i < listData.length; i += 1) {
      if (listData[i].id === selectedItems[0].id) {
        startIndexNum = i;
      }
    }

    if (selectedItems.length === 1) {
      if (Number(listData[selectedItem].id) > Number(selectedItems[0].id)) {
        for (let temp = startIndexNum; temp <= selectedItem; temp += 1) {
          tempSelectedItems.push(listData[temp]);
        }
      } else if (Number(listData[selectedItem].id) < Number(selectedItems[0].id)) {
        for (let temp = selectedItem; temp <= startIndexNum; temp += 1) {
          tempSelectedItems.push(listData[temp]);
        }
      }
    } else if (selectedItems.length > 1) {
      // 사전에 선택 된것이 있을 때 연속적으로 항목 추가
      if (Number(listData[selectedItem].id) > Number(selectedItems[selectedItems.length - 1].id)) {
        for (let temp = startIndexNum; temp <= selectedItem; temp += 1) {
          tempSelectedItems.push(listData[temp]);
        }
      } else if (Number(listData[selectedItem].id)
        < Number(selectedItems[selectedItems.length - 1].id)) {
        for (let temp = selectedItem; temp <= startIndexNum; temp += 1) {
          tempSelectedItems.push(listData[temp]);
        }
      }
    }
    this.setState({
      selectedItems: fromJS(tempSelectedItems),
    });
  }

  updateCTRLSelectedItemsList = selectedItem => {
    const {
      listData: curStateListData,
      selectedItems: curSelectedItems,
    } = this.state;
    const listData = curStateListData.toJS();
    const selectedItems = curSelectedItems.toJS();

    if (selectedItems.indexOf(listData[selectedItem]) !== -1) {
      // 이미 클릭 된 항목 제거
      selectedItems.splice(selectedItems.indexOf(listData[selectedItem]), 1);
      this.setState({
        selectedItems: fromJS(selectedItems),
      });
    } else {
      // 새로 클릭 된 항목 추가
      selectedItems.push(listData[selectedItem]);
      this.setState({
        selectedItems: fromJS(selectedItems),
      });
    }
  }

  updateNomarlSelectedItemsList = selectedItem => {
    const {
      listData: curStateListData,
      selectedItems: curSelectedItems,
    } = this.state;
    const {
      useExportOneClickListItem,
      exportClickListItem,
    } = this.props;
    const listData = curStateListData.toJS();
    const selectedItems = curSelectedItems.toJS();
    // 새로 클릭 된 항목 추가. 기존에 있는 경우면 항목 제거
    const tempSelectedItems = [];
    if (selectedItems.indexOf(listData[selectedItem]) === -1) {
      tempSelectedItems.push(listData[selectedItem]);
    }

    if (useExportOneClickListItem) {
      exportClickListItem(listData[selectedItem]);
    }

    this.setState({
      selectedItems: fromJS(tempSelectedItems),
    });
  }

  onInputValueChange = inputValue => {
    const { onChangeInputValue } = this.props;
    onChangeInputValue(inputValue);
  }

  // Drag 선택 시 실시간으로 그려지는 사각형 TBD
  // setRef = el => { // Drag 시 보여질 Rect를 그리기 위해 div를 직접 접근 // setState로 접근 할 경우 타이밍 이슈가 생길 수 있음
  //   this.box = el;
  // }

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

NewListContainer.defaultProps = {
  useExportOneClickListItem: false,
  exportClickListItem: () => {},
  exportDBClickedListItems: () => {},
  exportDragListItems: () => {},
  multiSelect: false,
  showIndex: false,
  showCamChannelIndexIcon: false,
  showIcon: false,
  showCheckbox: false,
  dragAndDrop: false,
  onChangeInputValue: () => {},
  realTimeEventComponent: false,
  // setApply: () => {},
  // exportlistData: false,
  // exportlistDataFunc: () => {},
};

NewListContainer.propTypes = {
  render: PropTypes.func.isRequired,
  listData: PropTypes.instanceOf(List).isRequired,
  useExportOneClickListItem: PropTypes.bool,
  exportClickListItem: PropTypes.func,
  exportDBClickedListItems: PropTypes.func,
  exportDragListItems: PropTypes.func,
  multiSelect: PropTypes.bool,
  showIndex: PropTypes.bool,
  showCamChannelIndexIcon: PropTypes.bool,
  showIcon: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  dragAndDrop: PropTypes.bool,
  onChangeInputValue: PropTypes.func,
  realTimeEventComponent: PropTypes.bool,
  // setApply: PropTypes.func,
  // exportlistData: PropTypes.bool,
  // exportlistDataFunc: PropTypes.func,
};

export default NewListContainer;
