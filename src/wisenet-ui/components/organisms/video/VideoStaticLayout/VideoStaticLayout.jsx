import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VideoStaticLayoutContainer } from 'wisenet-ui/containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { ResizeObserver } from 'util/lib';
import {
  VideoStaticLayoutWrapper,
  GridLayoutStyled,
  DragItemStyled,
  DragItemEmptyStyled,
} from './VideoStaticLayoutStyled';

class VideoStaticLayout extends Component {
  constructor(props) {
    super(props);
    // Lib에서 제공하지 않아서 Item에 CustomEvent 추가
    this.dragItem = toData => el => {
      const element = el;
      if (element && !element.allReadyAddEvent) {
        const eventFunc = event => {
          const { dragItemDragEnd } = this.props;
          const { detail: { isChange } } = event;
          element.allReadyAddEvent = false;
          if (!isChange) {
            return dragItemDragEnd(event)(toData);
          }
          return undefined; // lint error prevention
        };
        element.addEventListener('dragItemDragEnd', eventFunc, { once: true });
        element.allReadyAddEvent = true;
        element.isTile = true;
      }
    };
  }

  componentDidMount() {
    const {
      setComponentSize,
    } = this.props;

    this.videoLayout.handleResize = ({ contentRect }) => {
      setComponentSize(contentRect);
    };

    ResizeObserver.observe(this.videoLayout);
  }

  // shouldComponentUpdate(prevProps) {
  //   const {
  //     tileList: prevPropsTileList,
  //     width: prevWidth,
  //     height: prevHeight,
  //   } = prevProps;
  //   const {
  //     tileList,
  //     width,
  //     height,
  //   } = this.props;

  //   if (JSON.stringify(prevPropsTileList) === JSON.stringify(tileList)
  //   ) {
  //     if (prevWidth === width && prevHeight === height) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  generateTileDom = item => {
    const {
      VideoTile,
      onMouseUpItem,
      itemWidth,
      rowHeight,
    } = this.props;
    const {
      channel,
      uid,
      w,
      h,
    } = item;

    const videoTile = React.cloneElement(VideoTile, {
      channel,
      uid,
      width: itemWidth * w,
      height: rowHeight * h,
    });

    // 영상 상태 표시 영상 비 할당(Default) + 아이콘으로 변경 필요
    const dragItemComponent = item.empty ? (
      <DragItemEmptyStyled>
        <i className="wni wni-add" />
      </DragItemEmptyStyled>
    ) : (videoTile);

    return (
      // libray에서 이렇게 사용하지 않으면 동작하지 않도록 막아둠.
      <DragItemStyled
        ref={this.dragItem(item)}
        key={item.i}
        data-grid={{ ...item }}
        onMouseUpCapture={() => onMouseUpItem(item)}
      >
        {dragItemComponent}
      </DragItemStyled>
    );
  };

  render() {
    const {
      tileList: propsTileList,
      moveCheck,
    } = this.props;
    const tileList = propsTileList.toJS();
    const layout = tileList;

    const newTileList = tileList.map(item => (this.generateTileDom(item)));

    return (
      <VideoStaticLayoutWrapper
        ref={ref => {
          const el = ref;
          if (el) {
            el.isTile = true;
          }
          this.videoLayout = el;
        }}
      >
        <GridLayoutStyled
          layout={layout}
          {...this.props}
          onDragStart={moveCheck('dragStart')}
          onDragStop={moveCheck('dragStop')}
        >
          {newTileList}
        </GridLayoutStyled>
      </VideoStaticLayoutWrapper>
    );
  }
}

VideoStaticLayout.propTypes = {
  VideoTile: PropTypes.objectOf(PropTypes.any).isRequired,
  setComponentSize: PropTypes.func,
  tileList: PropTypes.oneOfType([PropTypes.any]),
  dragItemDragEnd: PropTypes.func,
  width: PropTypes.number.isRequired,
  moveCheck: PropTypes.func,
  onMouseUpItem: PropTypes.func,
  itemWidth: PropTypes.number,
  rowHeight: PropTypes.number,
};

VideoStaticLayout.defaultProps = {
  setComponentSize: () => {},
  tileList: [],
  dragItemDragEnd: () => {},
  moveCheck: () => {},
  onMouseUpItem: () => {},
  rowHeight: 300,
  itemWidth: 300,
};

export default withContainer(VideoStaticLayoutContainer, VideoStaticLayout);
