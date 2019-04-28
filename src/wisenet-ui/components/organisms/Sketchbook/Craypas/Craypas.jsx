import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { CraypasRectContainer, CraypasCircleContainer } from 'wisenet-ui/containers/organisms';
import ResizeButton from '../ResizeButton/ResizeButton';
import Aim from '../Aim/Aim';
import AimEdge from '../AimEdge/AimEdge';
import {
  StyledAbsoluteDiv,
  StyledSvg,
  defaultAimStyle,
  defaultAimEdgeStyle,
  defaultRectStyle,
  selectedRectStyle,
} from './CraypasStyled';


const Craypas = ({
  svgObjects,
  onMouseOver,
  onMouseOut,
  onFocus,
  onBlur,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onWheel,
  onContextMenu,
  onResizeButtonMouseDown,
  onResizeButtonMouseUp,
  readonly,
  aim,
  screenwidth,
  screenheight,
  aimEdge,
}) => (
  <div
    style={StyledAbsoluteDiv}
    id="craypas"
    onMouseOver={readonly ? null : onMouseOver}
    onMouseOut={readonly ? null : onMouseOut}
    onFocus={readonly ? null : onFocus}
    onBlur={readonly ? null : onBlur}
    onMouseDown={readonly ? null : onMouseDown}
    onMouseMove={readonly ? null : onMouseMove}
    onMouseUp={readonly ? null : onMouseUp}
    onWheel={readonly ? null : onWheel}
    onContextMenu={readonly ? null : onContextMenu}
  >
    <canvas id="myCanvas" width={screenwidth} height={screenheight} z-index="9999" />
    <svg style={StyledSvg} id="sketchbook_svg" xmlns="http://www.w3.org/2000/svg">
      {
        svgObjects.map(object => {
          // 여기서 사이즈조절 버튼의 위치를 잡아줘야 함. (svg shape 들이 attributes 가 다르기 때문에)
          const obj = {
            ...object,
          };
          let locX = 0;
          let locY = 0;
          const size = 15;

          if (obj.tagname === 'rect') {
            locX = obj.x + obj.width;
            locY = obj.y + obj.height;
          }

          let tagStyle = obj.style ? obj.style : { ...defaultRectStyle };
          if (obj.selected) {
            tagStyle = selectedRectStyle;
          }

          const aimCustomStyle = obj.aimstyle ? obj.aimstyle : defaultAimStyle;
          const aimEdgeCustomStyle = obj.aimEdgeStyle ? obj.aimEdgeStyle : defaultAimEdgeStyle;
          delete obj.aimEdgeStyle;
          return (typeof obj.tagname !== 'undefined' && obj.tagname !== '')
            && (
            <g id={obj.id} key={obj.key}>
              <obj.tagname style={tagStyle} {...obj} />
              {
                obj.selected
                && (
                <ResizeButton
                  locX={locX}
                  locY={locY}
                  size={size}
                  onMouseDown={onResizeButtonMouseDown}
                  onMouseUp={onResizeButtonMouseUp}
                />
                )
              }
              {
                aim
                && (
                <Aim
                  locX={obj.x}
                  locY={obj.y}
                  width={obj.width}
                  height={obj.height}
                  style={aimCustomStyle}
                />
                )
              }
              {
                aimEdge
                && (
                <AimEdge
                  locX={obj.x}
                  locY={obj.y}
                  width={obj.width}
                  height={obj.height}
                  style={aimEdgeCustomStyle}
                />
                )
              }
            </g>
            );
        })
      }
    </svg>
  </div>
);

Craypas.propTypes = {
  svgObjects: PropTypes.instanceOf(Array),
  selectedObjectStyle: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
  }),
  unSelectedObjectStyle: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
  }),
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func,
  onWheel: PropTypes.func,
  onContextMenu: PropTypes.func,
  onResizeButtonMouseDown: PropTypes.func,
  onResizeButtonMouseUp: PropTypes.func,
  readonly: PropTypes.bool,
  aim: PropTypes.bool,
  screenwidth: PropTypes.number,
  screenheight: PropTypes.number,
  aimEdge: PropTypes.bool,
};

Craypas.defaultProps = {
  svgObjects: [],
  selectedObjectStyle: {
    fill: 'rgb(255,0,0)',
    stroke: 'rgb(0,0,255)',
    strokeWidth: 3,
  },
  unSelectedObjectStyle: {
    fill: 'rgb(128,0,0)',
    stroke: 'rgb(0,0,128)',
    strokeWidth: 2,
  },
  onMouseOver: null,
  onMouseOut: null,
  onFocus: null,
  onBlur: null,
  onMouseDown: null,
  onMouseMove: null,
  onMouseUp: null,
  onWheel: null,
  onContextMenu: null,
  onResizeButtonMouseDown: null,
  onResizeButtonMouseUp: null,
  readonly: false,
  aim: false,
  screenwidth: 300,
  screenheight: 200,
  aimEdge: false,
};

export const CraypasRect = withContainer(CraypasRectContainer, Craypas);
export const CraypasCircle = withContainer(CraypasCircleContainer, Craypas);
