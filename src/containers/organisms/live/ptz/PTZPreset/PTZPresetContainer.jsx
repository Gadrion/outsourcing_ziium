import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PTZSequenceActions } from 'store/actionCreators';

class PTZPresetContainer extends React.Component {
  state = {
    isPresetSelected: false,
    showPopup: false,
    isPresetSelected: false,
    currentPresetList: null,
    prevPreset: null,
  };

  componentWillReceiveProps(nextProps) {
    const { currentChannel } = nextProps;
    const { prevChannel } = this.props;
    if (currentChannel !== -1) {
      const { presetList, attributes, attributesLoaded } = nextProps;
      if ((presetList === null || prevChannel !== currentChannel)
        && (attributesLoaded && attributes.PresetSupportByChannel[currentChannel])) {
        // PTZSequenceActions.setPresetPending(true);
        const getData = {
          Channel: currentChannel,
        };

        PTZSequenceActions.getPreset(getData);

        const maxPreset = attributes.MaxPresetByChannel;
        PTZSequenceActions.setMaxPreset(maxPreset[currentChannel]);

        PTZSequenceActions.setPrevChannel(currentChannel);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      currentChannel,
      attributesLoaded,
      attributes,
      presetList,
    } = nextProps;

    const { presetList : prevPresetList } = this.props;

    if (!attributesLoaded) {
      document.getElementById('preset_disable_mask').style.display = 'block';
      document.getElementById('preset_wrapper').style.pointerEvents = 'none';
    }

    if (typeof attributes.PresetSupportByChannel !== 'undefined'
      && attributes.PresetSupportByChannel[currentChannel] === true) {
      document.getElementById('preset_disable_mask').style.display = 'none';
      document.getElementById('preset_wrapper').style.pointerEvents = 'auto';
    } else {
      document.getElementById('preset_disable_mask').style.display = 'block';
      document.getElementById('preset_wrapper').style.pointerEvents = 'none';
    }

    if (presetList !== null && prevPresetList !== null) {
      // 채널 변경 또는 리스트 업데이트
      if ((presetList).join('') !== prevPresetList.join('')) {
        return true;
      }
      // 프리셋 팝업 상태 변경
      const { showPopup } = this.state;
      if (showPopup !== nextState.showPopup) {
        return true;
      }
      return false;
    }

    // 최초 로드
    if (presetList !== null) {
      return true;
    }
    return false;
  }

  onConfirm = () => {
    const { currentChannel, currentPreset, currentPresetName } = this.props;
    const getData = {
      Channel: currentChannel,
      Preset: currentPreset,
      Name: encodeURIComponent(currentPresetName),
    };

    PTZSequenceActions.addPreset(getData);

    this.setState({
      showPopup: false,
    });
  }

  onCancel = () => {
    this.setState({
      showPopup: false,
    });
  }

  addPreset = () => {
    this.setState({
      showPopup: true,
    });
  }

  deletePreset = () => {
    const { currentPresetList } = this.state;
    const { currentChannel } = this.props;
    for (const item in currentPresetList) {
      if (item.isSelected) {
        const getData = {
          Channel: currentChannel,
          Preset: item.no,
        };
        PTZSequenceActions.deletePreset(getData);
      }
    }
  }

  onChangeData = (dataList, selectedData) => {
    this.setState({
      currentPresetList: dataList,
      prevPreset: selectedData,
    });
  }

  goPreset = target => {
    const { currentChannel } = this.props;
    const getData = {
      Channel: currentChannel,
      Preset: target.no,
    };

    PTZSequenceActions.controlPreset(getData);
  }

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

PTZPresetContainer.propTypes = {
  render: PropTypes.func.isRequired,
  presetList: PropTypes.arrayOf(Object),
  currentPreset: PropTypes.number,
  currentPresetName: PropTypes.string,
  currentChannel: PropTypes.number,
  prevChannel: PropTypes.number,
  attributesLoaded: PropTypes.bool,
  attributes: PropTypes.instanceOf(Object),
};

PTZPresetContainer.defaultProps = {
  presetList: [],
  currentPreset: 1,
  currentPresetName: '',
  currentChannel: -1,
  prevChannel: -1,
  attributesLoaded: false,
  attributes: {},
};

export default connect(
  state => ({
    isPresetPending: state.ptzSequenceModule.get('isPresetPending'),
    presetList: state.ptzSequenceModule.get('presetList'),
    maxPreset: state.ptzSequenceModule.get('maxPreset'),
    currentPreset: state.ptzSequenceModule.get('currentPreset'),
    currentPresetName: state.ptzSequenceModule.get('currentPresetName'),
    attributes: state.sunapiModule.get('attributes'),
    attributesLoaded: state.sunapiModule.get('loaded'),
    prevChannel: state.ptzSequenceModule.get('prevChannel'),
  }),
)(PTZPresetContainer);
