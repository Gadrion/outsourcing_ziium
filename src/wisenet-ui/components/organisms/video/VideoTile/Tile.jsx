import React from 'react';
import PropTypes from 'prop-types';
import { UmpPlayer } from 'wisenet-ui/components/molecules';
import TileStyled from './TileStyled';

class Tile extends React.PureComponent {
  render() {
    const {
      uid,
      selectClick,
      onCapture,
      className,
      isSelectTile,
    } = this.props;

    return (
      <TileStyled
        className={className}
        key={uid}
        isSelectTile={isSelectTile}
        onClick={e => {
          e.stopPropagation();
          selectClick(uid, e);
        }}
      >
        <UmpPlayer
          {...this.props}
          onCapture={event => onCapture(event, this.props)}
        />
      </TileStyled>
    );
  }
}

Tile.defaultProps = {
  // event function
  onCapture: () => {},
  selectClick: () => {},
  uid: '',
  className: '',
  isSelectTile: false,
};

Tile.propTypes = {
  onCapture: PropTypes.func,
  selectClick: PropTypes.func,
  uid: PropTypes.string,
  className: PropTypes.string,
  isSelectTile: PropTypes.bool,
};

export default Tile;
