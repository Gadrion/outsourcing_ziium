import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TableExamplePageContainer } from 'containers/pages';
import {
  TableStyled,
  TableExamplePageWrapperStyled,
  ExampleTitleStyled,
} from './TableExamplePageStyled';

const TableExamplePage = ({
  presetHeader,
  presetData,
  recordStatusHeader,
  recordStatusData,
  checkHeader,
  checkData,
  eventExportHeader,
  eventExportData,
  onChangeEventExportTableData,
  onChangeCheckTableData,
  onChangePresetTableData,
}) => (
  <TableExamplePageWrapperStyled>
    <ExampleTitleStyled>
      <h1> [ Event export example ] </h1>
    </ExampleTitleStyled>
    <div style={{ height: '600px' }}>
      <TableStyled
        header={eventExportHeader}
        data={eventExportData}
        selectCheck
        onChangeData={onChangeEventExportTableData}
        scroll
      />
    </div>
    <ExampleTitleStyled>
      <h1> [ Check example ] </h1>
    </ExampleTitleStyled>
    <div style={{ width: '500px' }}>
      <TableStyled
        header={checkHeader}
        data={checkData}
        selectCheck
        onChangeData={onChangeCheckTableData}
        pageSize={8}
      />
    </div>
    <ExampleTitleStyled>
      <h1> [ Preset example ] </h1>
    </ExampleTitleStyled>
    <div style={{ width: '252px' }}>
      <TableStyled
        header={presetHeader}
        data={presetData}
        selectRow
        onChangeData={onChangePresetTableData}
        showPagination
        pageSize={10}
      />
    </div>
    <ExampleTitleStyled>
      <h1> [ Record status example ] </h1>
    </ExampleTitleStyled>
    <div style={{ height: '600px', minWidth: '1547px', overflowX: 'auto' }}>
      <TableStyled
        header={recordStatusHeader}
        data={recordStatusData}
        isMultiHeader
        scroll
      />
    </div>
  </TableExamplePageWrapperStyled>
);

TableExamplePage.defaultProps = {
  presetHeader: [],
  presetData: [],
  recordStatusHeader: [],
  recordStatusData: [],
  checkHeader: [],
  checkData: [],
  eventExportHeader: [],
  eventExportData: [],
  onChangeEventExportTableData: () => {},
  onChangeCheckTableData: () => {},
  onChangePresetTableData: () => {},
};

TableExamplePage.propTypes = {
  presetHeader: PropTypes.instanceOf(Array),
  presetData: PropTypes.instanceOf(Array),
  recordStatusHeader: PropTypes.instanceOf(Array),
  recordStatusData: PropTypes.instanceOf(Array),
  checkHeader: PropTypes.instanceOf(Array),
  checkData: PropTypes.instanceOf(Array),
  eventExportHeader: PropTypes.instanceOf(Array),
  eventExportData: PropTypes.instanceOf(Array),
  onChangeEventExportTableData: PropTypes.func,
  onChangeCheckTableData: PropTypes.func,
  onChangePresetTableData: PropTypes.func,
};

export default withContainer(TableExamplePageContainer, TableExamplePage);
