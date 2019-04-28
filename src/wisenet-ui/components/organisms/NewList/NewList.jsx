import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import classNames from 'classnames';
import { List as ListImmutable } from 'immutable';
import { NewListContainer } from 'wisenet-ui/containers/organisms';
import {
  ListULStyled,
  ListLIStyled,
  ListToolTipStyled,
  // ListMultiSelectRect, // Drag 선택 시 실시간으로 그려지는 사각형 TBD
} from './NewListStyled';

class NewList extends Component {
  componentDidMount() {
    // 처음 theme 적용을 위한 재 랜더
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps) {
    const {
      listData: nextlistData,
    } = nextProps;

    const {
      listData,
    } = this.props;

    if (JSON.stringify(nextlistData) === JSON.stringify(listData)) {
      return false;
    }
    return true;
  }

  render() {
    const {
      listData: propsListData,
      onMouseDownToSelectItems,
      onMouseUpToSelectItems,
      onMouseDoubleClickItem,
      showHoverData,
      realTimeEventComponent,
      // setRef, // Drag 선택 시 실시간으로 그려지는 사각형 TBD
      // onClickListItem,
      // ...rest
    } = this.props;
    const listData = propsListData.toJS();

    return (
      <div style={{ position: 'relative' }} className="NewList">
        {/* Drag 선택 시 실시간으로 그려지는 사각형 TBD
        <ListMultiSelectRect
          ref={e => {
            setRef(e);
          }}
        /> */}
        <ListULStyled>
          {listData.map((item, idx) => (
            <ListLIStyled
              className={classNames({ tooltip: showHoverData, realTimeEventComponent })}
              key={item.id}
              onMouseDown={() => onMouseDownToSelectItems(item.id, idx)}
              onMouseUp={e => onMouseUpToSelectItems(e, item.id, idx)}
              onDoubleClick={() => onMouseDoubleClickItem(idx, item)}
            >
              {showHoverData
                && (
                  <ListToolTipStyled
                    className={classNames({ tooltiptext: showHoverData })}
                  >
                    <p>{item.data.model}</p>
                    <p>{item.data.ipAddress}</p>
                  </ListToolTipStyled>
                )
              }
              {item.title}
            </ListLIStyled>
          ))}
        </ListULStyled>
      </div>
    );
  }
}

NewList.defaultProps = {
  onMouseDownToSelectItems: () => {},
  onMouseUpToSelectItems: () => {},
  onMouseDoubleClickItem: () => {},
  showHoverData: false,
  realTimeEventComponent: false,
  // setRef: () => {}, // Drag 선택 시 실시간으로 그려지는 사각형 TBD
  // onMouseMoveToDrawRect: () => {}, // Drag 선택 시 실시간으로 그려지는 사각형 TBD
  // maxItemNumber: 50,
  // pagenation: 100,
  // onClickNextPage: () => {},
  // onClickPrevPage: () => {},
  // onClickViewMore: () => {},
  // onClickViewAll: () => {},
  // setApply: () => {},
  // exportListData: false,
  // exportListDataFunc: () => {},
};

NewList.propTypes = {
  // listData: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.string,
  //   // idx: PropTypes.string,
  //   // title: PropTypes.element,
  //   title: PropTypes.instanceOf(Object),
  //   icon: PropTypes.instanceOf(Object),
  //   focused: PropTypes.bool, // text Bold. 외부로 부터
  //   checked: PropTypes.bool, // 0 : checked false, 1: checked true
  // })).isRequired,
  listData: PropTypes.instanceOf(ListImmutable).isRequired,
  onMouseDownToSelectItems: PropTypes.func,
  onMouseUpToSelectItems: PropTypes.func,
  onMouseDoubleClickItem: PropTypes.func,
  showHoverData: PropTypes.bool,
  realTimeEventComponent: PropTypes.bool,
  // setRef: PropTypes.func, // Drag 선택 시 실시간으로 그려지는 사각형 TBD
  // onMouseMoveToDrawRect: PropTypes.func, // Drag 선택 시 실시간으로 그려지는 사각형 TBD
  // maxItemNumber: PropTypes.number,
  // pagenation: PropTypes.number,
  // onClickNextPage: PropTypes.func,
  // onClickPrevPage: PropTypes.func,
  // onClickViewMore: PropTypes.func,
  // onClickViewAll: PropTypes.func,
  // setApply: PropTypes.func,
  // exportListData: PropTypes.bool,
  // exportListDataFunc: PropTypes.func,
};

export default withContainer(NewListContainer, NewList);
