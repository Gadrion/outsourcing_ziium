import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { VideoLayoutMatrixCell } from 'wisenet-ui/components/atoms';
import styles from './VideoLayoutMatrix.scss';

const cx = classnames.bind(styles);

class VideoLayoutMatrix extends PureComponent {
  render() {
    const {
      matrix,
      dragArea,
      duplicateDragArea,
    } = this.props;

    const columns = [];
    const test = [];

    for (let i = 0; i < matrix.columnCount; i += 1) {
      columns.push(i.toString());
    }

    for (let i = 0; i < matrix.rowCount; i += 1) {
      test.push(
        <div
          className={cx('row')}
          key={`videoLayoutMatrixCell-row-${i}`}
        >
          {columns.map(column => {
            // console.log('dragArea', dragArea);
            const hoverActive = !duplicateDragArea
              ? (dragArea.rowStart <= i && i <= dragArea.rowEnd)
              && (dragArea.colStart <= column && column <= dragArea.colEnd) : false;
            // const nowDraw = startDragIndex !== -1;
            return (
              <VideoLayoutMatrixCell
                key={`videoLayoutMatrixCell-${i}-${column}`}
                row={i}
                col={column}
                hoverActive={hoverActive}
                // nowDraw={nowDraw}
                duplicateDragArea={duplicateDragArea}
              />
            );
          })}
        </div>,
      );
    }

    return (
      <React.Fragment>
        {test}
      </React.Fragment>
    );
  }
}

VideoLayoutMatrix.propTypes = {
  matrix: PropTypes.objectOf(PropTypes.number).isRequired,
  dragArea: PropTypes.objectOf(PropTypes.number).isRequired,
  duplicateDragArea: PropTypes.bool.isRequired,
};

export default VideoLayoutMatrix;
