import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class TableExamplePageContainer extends React.Component {
  state = {
    presetData: [],
    checkData: [],
    eventExportData: [],
  }

  componentDidMount() {
    const newPresetData = [];
    for (let i = 0; i < 300; i += 1) {
      let name = null;
      if (i < 9) {
        name = `Preset 00${i + 1}`;
      } else if (i < 99) {
        name = `Preset 0${i + 1}`;
      } else {
        name = `Preset ${i + 1}`;
      }
      newPresetData.push({
        index: i,
        no: i + 1,
        name,
        isSelected: false,
      });
    }
    const newCheckData = [
      {
        index: 0,
        ch: 1,
        name: 'Main Door',
        isSelected: false,
      },
      {
        index: 1,
        ch: 2,
        name: 'Hallway',
        isSelected: false,
      },
      {
        index: 2,
        ch: 3,
        name: 'Door',
        isSelected: false,
      },
      {
        index: 3,
        ch: 4,
        name: 'Main Door2',
        isSelected: false,
      },
      {
        index: 4,
        ch: 5,
        name: 'Hallway',
        isSelected: false,
      },
      {
        index: 5,
        ch: 6,
        name: 'Door2',
        isSelected: false,
      },
      {
        index: 6,
        ch: 7,
        name: 'Door3',
        isSelected: false,
      },
      {
        index: 7,
        ch: 8,
        name: 'Main Door3',
        isSelected: false,
      },
    ];
    const newEventExportData = [];
    for (let i = 0; i < 20; i += 1) {
      const data = {
        index: i,
        no: i + 1,
        ch: i + 1,
        startTime: `00:0${i}:00`,
        endTime: `00:0${20 - i}:00`,
        event: i % 2 === 0 ? 'MD' : 'IVA',
        dst: `DST${i % 2 === 0 ? 1 : 2}`,
        status: (<progress value={i * 5} max="100" />),
      };
      newEventExportData.push(data);
    }
    const newRecordStatusData = [];
    for (let i = 0; i < 64; i += 1) {
      newRecordStatusData.push({
        index: i,
        ch: i > 9 ? i : `0${i}`,
        profile: '-',
        type: '-',
        frame: '-',
        input: '-',
        record: '-',
        limit: '-',
        bpsInput: '-',
        bpsRecord: '-',
        inputAndLimit: '-',
        test11: i > 9 ? i : `0${i}`,
        test12: i > 9 ? i : `0${i}`,
        test21: i > 9 ? i : `0${i}`,
        test22: i > 9 ? i : `0${i}`,
        test31: i > 9 ? i : `0${i}`,
        test32: i > 9 ? i : `0${i}`,
      });
    }
    this.setState({
      presetData: newPresetData,
      checkData: newCheckData,
      eventExportData: newEventExportData,
      recordStatusData: newRecordStatusData,
    });
  }

  onChangeCheckTableData = (newData, selectedRow) => {
    console.log('[Table] Change check table data', newData, selectedRow);
    this.setState({
      checkData: newData,
    });
  }

  onChangePresetTableData = (newData, selectedRow) => {
    console.log('[Table] Change preset table data', newData, selectedRow);
    this.setState({
      presetData: newData,
    });
  }

  onChangeEventExportTableData = (newData, selectedRow) => {
    console.log('[Table] Change event exprt table data', newData, selectedRow);
    this.setState({
      eventExportData: newData,
    });
  }

  onChangeSelectedRow = selectedRow => {
    console.log('[Table] Change selected row', selectedRow);
  }

  render() {
    const { render } = this.props;
    const presetHeader = [
      {
        Header: (
          <span>No</span>
        ),
        accessor: 'no',
        sortable: false,
        width: 59,
      },
      {
        Header: 'Name',
        accessor: 'name',
        sortable: false,
      },
    ];

    const recordStatusHeader = [
      {
        Header: 'Camera',
        columns: [
          {
            Header: 'CH',
            accessor: 'ch',
            sortable: false,
          },
          {
            Header: 'Profile',
            accessor: 'profile',
            sortable: false,
          },
        ],
      },
      {
        Header: 'Record',
        columns: [
          {
            Header: 'Type',
            accessor: 'type',
            sortable: false,
          },
          {
            Header: 'Frame',
            accessor: 'frame',
            sortable: false,
          },
        ],
      },
      {
        Header: 'Frame rate(fps)',
        columns: [
          {
            Header: 'Input',
            accessor: 'input',
            sortable: false,
          },
          {
            Header: 'Record',
            accessor: 'record',
            sortable: false,
          },
        ],
      },
      {
        Header: 'Bitrate (bps)',
        columns: [
          {
            Header: 'Limit',
            accessor: 'limit',
            sortable: false,
          },
          {
            Header: 'Input',
            accessor: 'bpsInput',
            sortable: false,
          },
          {
            Header: 'Record',
            accessor: 'bpsRecord',
            sortable: false,
          },
          {
            Header: 'Input/Limit',
            accessor: 'inputAndLimit',
            sortable: false,
          },
        ],
      },
    ];

    const checkHeader = [
      {
        Header: (
          <span>CH</span>
        ),
        accessor: 'ch',
        sortable: true,
      },
      {
        Header: 'Name',
        accessor: 'name',
        sortable: true,
      },
    ];

    const eventExportHeader = [
      {
        Header: 'No',
        accessor: 'no',
        sortable: true,
      },
      {
        Header: 'CH',
        accessor: 'ch',
        sortable: true,
      },
      {
        Header: 'Start time',
        accessor: 'startTime',
        sortable: true,
      },
      {
        Header: 'End Time',
        accessor: 'endTime',
        sortable: true,
      },
      {
        Header: 'Event',
        accessor: 'event',
        sortable: true,
      },
      {
        Header: 'DST',
        accessor: 'dst',
        sortable: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortable: false,
      },
    ];

    return render({
      ...this,
      ...this.state,
      ...this.props,
      presetHeader,
      recordStatusHeader,
      checkHeader,
      eventExportHeader,
    });
  }
}

TableExamplePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default TableExamplePageContainer;
