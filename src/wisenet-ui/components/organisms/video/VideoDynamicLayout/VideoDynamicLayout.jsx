import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VideoDynamicLayoutContainer } from 'wisenet-ui/containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { ResizeObserver } from 'util/lib';
import {
  VideoDynamicLayoutWrapper,
  GridLayoutStyled,
  DragItemStyled,
} from './VideoDynamicLayoutStyled';

class VideoDynamicLayout extends Component {
  componentDidMount() {
    const {
      setComponentSize,
    } = this.props;

    this.videoLayout.handleResize = ({ contentRect }) => {
      setComponentSize(contentRect);
    };

    ResizeObserver.observe(this.videoLayout);
  }

  shouldComponentUpdate(prevProps) {
    const {
      tileList: prevPropsTileList,
      width: prevWidth,
      height: prevHeight,
    } = prevProps;
    const {
      tileList,
      width,
      height,
    } = this.props;

    if (JSON.stringify(prevPropsTileList) === JSON.stringify(tileList)
    ) {
      if (prevWidth === width && prevHeight === height) {
        return false;
      }
    }

    return true;
  }

  generateTileDom = item => {
    const { VideoTile } = this.props;
    const { channel, uid } = item;
    return (
      // libray에서 이렇게 사용하지 않으면 동작하지 않도록 막아둠.
      <DragItemStyled key={item.i} data-grid={{ ...item }}>
        {React.cloneElement(VideoTile, {
          channel,
          uid,
        })}
      </DragItemStyled>
    );
  };

  render() {
    const {
      tileList: propsTileList,
      dynamicCreationCheck,
      dynamicMoveCheck,
      selectClick,
      width,
      left,
    } = this.props;

    const tileList = propsTileList.toJS();
    const layout = tileList;

    return (
      <VideoDynamicLayoutWrapper
        ref={ref => {
          const el = ref;
          if (el) {
            el.isTile = true;
          }
          this.videoLayout = el;
        }}
        style={{
          overflow: 'hidden',
        }}
        onClick={e => selectClick('none', e)}
        // {...rest}
      >
        <GridLayoutStyled
          style={{
            width,
            left: `${-left}px`,
            overflow: 'hidden',
            // transform: isClick ? 'scale(0.9)' : 'none',
            // transition: '0.5s',
          }}
          layout={layout}
          {...this.props}
          onLayoutChange={dynamicCreationCheck}
          onDrag={dynamicMoveCheck}
          onResize={dynamicMoveCheck}
        >
          {tileList.map(item => (this.generateTileDom(item)))}
        </GridLayoutStyled>
      </VideoDynamicLayoutWrapper>
    );
  }
}

VideoDynamicLayout.propTypes = {
  setComponentSize: PropTypes.func.isRequired,
  tileList: PropTypes.oneOfType([PropTypes.any]).isRequired,
  VideoTile: PropTypes.oneOfType([PropTypes.any]),
  selectClick: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number,
  dynamicCreationCheck: PropTypes.func.isRequired,
  dynamicMoveCheck: PropTypes.func.isRequired,
};

VideoDynamicLayout.defaultProps = {
  VideoTile: null,
  selectClick: () => {},
  left: 0,
};

export default withContainer(VideoDynamicLayoutContainer, VideoDynamicLayout);
