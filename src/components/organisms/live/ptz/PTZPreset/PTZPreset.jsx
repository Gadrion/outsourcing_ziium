import React from 'react';
import PropTypes from 'prop-types';
import { PresetSettingPopup } from 'components/organisms';
import { PTZPresetContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import {
  Container,
  TableWrapper,
  ButtonWrapper,
  PresetDisableMask,
  StyledTable,
  StyledButton,
  StyledPopup,
} from './PTZPresetStyled';

const presetHeader = [
  {
    Header: 'NO',
    accessor: 'no',
    sortable: true,
  },
  {
    Header: 'Name',
    accessor: 'name',
    sortable: true,
  },
];

const makePresetList = presetList => {
  const array = [];
  for (let idx = 1; idx <= presetList.length; idx += 1) {
    let item = presetList[idx - 1];
    array.push({
      index: idx,
      no: item.Preset,
      name: item.Name,
      isSelected: false,
    });
  }
  return array;
};


const PTZPreset = ({
  presetList,
  addPreset,
  deletePreset,
  onChangeData,
  maxPreset,
  showPopup,
  onCancel,
  onConfirm,
  currentPresetList,
}) => {
  return (
    <Container id="preset_wrapper">
      <StyledPopup
        isOpen={showPopup}
        shouldCloseOnOverlayClick={true}
      >
        <PresetSettingPopup
          presetList={presetList}
          maxPreset={maxPreset}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </StyledPopup>
      <PresetDisableMask id="preset_disable_mask" />
      <ButtonWrapper>
        <StyledButton onClick={addPreset}>
          저장
        </StyledButton>
        <StyledButton onClick={deletePreset}>
          삭제
        </StyledButton>
      </ButtonWrapper>
      <TableWrapper>
        { presetList !== null
        && presetList !== false
        && (
          <StyledTable
            onChangeData={onChangeData}
            scroll
            header={presetHeader}
            data={currentPresetList !== null ? currentPresetList : makePresetList(presetList)}
            selectRow
            rowHeight={30}
            pageSize={10}
          />
        )
      }
      </TableWrapper>
    </Container>
  );
}

PTZPreset.propTypes = {
  presetList: PropTypes.arrayOf(Object),
  maxPreset: PropTypes.number,
  currentChannel: PropTypes.number,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onClickSetPreset: PropTypes.func,
  isOpened: PropTypes.bool,
  attributes: PropTypes.instanceOf(Object),
  goPreset: PropTypes.func,
};

PTZPreset.defaultProps = {
  presetList: [],
  maxPreset: 1,
  currentChannel: -1,
  onConfirm: null,
  onCancel: null,
  onClickSetPreset: null,
  isOpened: false,
  attributes: {},
  goPreset: null,
};

export default withContainer(PTZPresetContainer, PTZPreset);
