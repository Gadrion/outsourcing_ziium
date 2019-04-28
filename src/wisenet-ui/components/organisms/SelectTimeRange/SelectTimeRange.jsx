import 'wisenet-ui/styles/vendors/timeline-almende.css';
import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SelectTimeRangeContainer } from 'wisenet-ui/containers/organisms';
import {
  SelectTimeRangeWrapperStyled,
  ExportButtonStyled,
  TimeRangeStyled,
} from './SelectTimeRangeStyled';

class SelectTimeRange extends React.PureComponent {
  render() {
    const {
      value,
      handleSliderChange,
      handleExportRange,
    } = this.props;
    return (
      <SelectTimeRangeWrapperStyled>
        <TimeRangeStyled
          min={0}
          max={100}
          lowerBound={1}
          upperBound={100}
          value={value}
          railStyle={{
            height: '8px',
            borderRadius: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
          trackStyle={[{
            height: '7px',
            marginLeft: '-4px',
            borderRadius: 0,
            backgroundColor: '#f37321',
          }]}
          handleStyle={[
            {
              width: '6px',
              height: '21px',
              marginTop: '-6px',
              borderRadius: 0,
              backgroundColor: 'transparent',
              border: 'none',
              borderTop: '1px solid #333',
              borderBottom: '1px solid #333',
              borderLeft: '4px solid #333',
              boxShadow: 'none',
            },
            {
              width: '6px',
              height: '21px',
              marginTop: '-6px',
              borderRadius: 0,
              backgroundColor: 'transparent',
              border: 'none',
              borderTop: '1px solid #333',
              borderBottom: '1px solid #333',
              borderRight: '4px solid #333',
              boxShadow: 'none',
            },
          ]}
          onChange={handleSliderChange}
        />
        <ExportButtonStyled onClick={handleExportRange}>Export</ExportButtonStyled>
      </SelectTimeRangeWrapperStyled>
    );
  }
}

SelectTimeRange.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  handleExportRange: PropTypes.func,
};

SelectTimeRange.defaultProps = {
  handleExportRange: () => {},
};

export default withContainer(SelectTimeRangeContainer, SelectTimeRange);
