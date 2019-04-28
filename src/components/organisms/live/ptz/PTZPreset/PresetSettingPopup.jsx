import React from 'react';
import PropTypes from 'prop-types';
import { PTZSequenceActions } from 'store/actionCreators';
import {
  Container,
  Body,
  Header,
  Footer,
  TitleSpan,
  NameInput,
  PresetNameWrapper,
  PresetListWrapper,
  PresetSelect,
  CloseButton,
  CancelButton,
  SaveButton,
  PresetLabel,
} from './PresetSettingPopupStyled';

class PresetSettingPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSelected.bind(this);
    this.onTyped.bind(this);
  }

  makePresetList = () => {
    const { maxPreset, presetList, currentPreset } = this.props;
    const array = [];
    for (let idx = 1; idx <= maxPreset; idx += 1) {
      let found = false;
      presetList.some(item => {
        if (item.Preset === idx) {
          found = true;
          if (currentPreset === idx) {
            array.push(<option id={`preset_${idx}`} key={idx} value={idx}>{`${item.Preset} : ${item.Name}`}</option>);
          } else {
            array.push(<option id={`preset_${idx}`} key={idx} value={idx}>{`${item.Preset} : ${item.Name}`}</option>);
          }
          return true;
        }
        return false;
      });
  
      if (!found) {
        if (currentPreset === idx) {
          array.push(<option id={`preset_${idx}`} key={idx} value={idx}>{`${idx} : `}</option>);
        } else {
          array.push(<option id={`preset_${idx}`} key={idx} value={idx}>{`${idx} : `}</option>);
        }
      }
    }
    return array;
  }

  onSelected = selectedItem => {
    PTZSequenceActions.setCurrentPreset(Number(selectedItem.currentTarget.value));
  }

  onTyped = typedData => {console.info(444, typedData);
    PTZSequenceActions.setCurrentPresetName(typedData.currentTarget.value);
  }

  render() {
    const {
      presetList,
      onConfirm,
      onCancel,
    } = this.props;
    return (
      <Container>
        <Header>
          <TitleSpan>Set Preset</TitleSpan>
          <CloseButton onClick={onCancel}>
            <i className="wni wni-close" />
          </CloseButton>
        </Header>
        <Body>
          { presetList !== null
            && presetList !== false
            && (
              <PresetListWrapper>
                <PresetLabel>Number</PresetLabel>
                <PresetSelect onChange={this.onSelected}>
                  {this.makePresetList()}
                </PresetSelect>
              </PresetListWrapper>
            )
          }
          <PresetNameWrapper>
            <PresetLabel>Name</PresetLabel>
            <NameInput
              onKeyUp={this.onTyped}
              type="text"
            />
          </PresetNameWrapper>
        </Body>
        <Footer>
          <SaveButton onClick={onConfirm}>Save</SaveButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </Footer>
      </Container>
    );
  }
}

PresetSettingPopup.propTypes = {
  maxPreset: PropTypes.number,
  currentPreset: PropTypes.number,
  currentPresetName: PropTypes.string,
  presetList: PropTypes.arrayOf(Object),
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onSelected: PropTypes.func,
};

PresetSettingPopup.defaultProps = {
  presetList: [],
  maxPreset: 0,
  currentPreset: 1,
  currentPresetName: '',
  onConfirm: null,
  onCancel: null,
  onSelected: null,
};

export default PresetSettingPopup;
