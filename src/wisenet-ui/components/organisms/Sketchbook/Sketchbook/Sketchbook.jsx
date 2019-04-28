import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SketchbookContainer } from 'wisenet-ui/containers/organisms';
import {
  SketchbookDefaultStyled,
  SketchbookAbsoluteStyled,
  CraypasRectStyled,
  CraypasCircleStyled,
} from './SketchbookStyled';

class Sketchbook extends React.PureComponent {
  render() {
    const {
      children,
      shape,
      // sketchinfo,
      updateObject,
      objects,
      readonly,
      aim,
      aimEdge,
      screenwidth,
      screenheight,
    } = this.props;

    // console.log('render!(Sketchbook)', objects, aim);
    return (
      <SketchbookDefaultStyled width="100%" height="100%">
        { children }
        <SketchbookAbsoluteStyled id="sketchbook">
          {
            (shape === 'rect')
              ? <CraypasRectStyled id="craypasrect" updateObject={updateObject} screenwidth={screenwidth} screenheight={screenheight} objects={objects} readonly={readonly} aim={aim} aimEdge={aimEdge} />
              : <CraypasCircleStyled id="craypascircle" updateObject={updateObject} screenwidth={screenwidth} screenheight={screenheight} objects={objects} readonly={readonly} aim={aim} aimEdge={aimEdge} />
          }
        </SketchbookAbsoluteStyled>
      </SketchbookDefaultStyled>
    );
  }
}

Sketchbook.propTypes = {
  children: PropTypes.node,
  shape: PropTypes.string,
  sketchinfo: PropTypes.shape({
    workType: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }).isRequired,
  updateObject: PropTypes.func,
  objects: PropTypes.arrayOf(PropTypes.object),
  readonly: PropTypes.bool,
  aim: PropTypes.bool,
  aimEdge: PropTypes.bool,
  screenwidth: PropTypes.number,
  screenheight: PropTypes.number,
};

Sketchbook.defaultProps = {
  shape: 'rect',
  updateObject: null,
  objects: [],
  children: null,
  readonly: false,
  aim: false,
  aimEdge: false,
  screenwidth: 100,
  screenheight: 100,
};

export default withContainer(SketchbookContainer, Sketchbook);
