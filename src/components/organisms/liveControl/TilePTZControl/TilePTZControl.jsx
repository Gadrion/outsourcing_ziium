import React from 'react';
import PropTypes from 'prop-types';
import { TilePTZDirectionControl, TilePTZFunctionBar } from 'wisenet-ui/components/molecules';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TilePTZControlContainer } from 'containers/organisms';

import {
  TilePTZControlStyled,
} from './TilePTZControlStyled';

class TilePTZControl extends React.PureComponent {
  render() {
    const {
      openPTZDirectionControl,
      openPTZFunctionBar,
      onTilePTZControlEvent,
      onTilePTZDirectionMouseDown,
      onTilePTZDirectionMouseUp,
      onTilePTZFunctionEvent,
      returnTileMode,
      ptzInfo,
    } = this.props;

    return (
      <TilePTZControlStyled
        onMouseDown={onTilePTZControlEvent('down')}
        onMouseMove={onTilePTZControlEvent('move')}
        onMouseUp={onTilePTZControlEvent('up')}
        onWheel={onTilePTZControlEvent('wheel')}
        onMouseLeave={onTilePTZControlEvent('leave')}
      >
        { openPTZDirectionControl
          && (
          <TilePTZDirectionControl
            onMouseDown={onTilePTZDirectionMouseDown}
            onMouseUp={onTilePTZDirectionMouseUp}
          />
          )
        }
        { openPTZFunctionBar && (
          <TilePTZFunctionBar
            onClick={onTilePTZFunctionEvent}
            returnTileMode={returnTileMode}
            ptzInfo={ptzInfo}
          />
        )}
      </TilePTZControlStyled>
    );
  }
}

TilePTZControl.propTypes = {
  openPTZDirectionControl: PropTypes.bool.isRequired,
  openPTZFunctionBar: PropTypes.bool.isRequired,
  onTilePTZControlEvent: PropTypes.func.isRequired,
  onTilePTZDirectionMouseDown: PropTypes.func.isRequired,
  onTilePTZDirectionMouseUp: PropTypes.func.isRequired,
  onTilePTZFunctionEvent: PropTypes.func.isRequired,
  returnTileMode: PropTypes.func.isRequired,
  ptzInfo: PropTypes.instanceOf(Object).isRequired,
};

export default withContainer(TilePTZControlContainer, TilePTZControl);
