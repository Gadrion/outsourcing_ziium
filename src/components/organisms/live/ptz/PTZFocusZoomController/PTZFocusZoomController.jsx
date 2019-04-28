import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { PTZFocusZoomControllerContainer } from 'containers/organisms';
import {
  ZoomButton,
  NearButton,
  FarButton,
  AutoButton,
  ButtonWrapper,
  Container,
  StyledSlider,
} from './PTZFocusZoomControllerStyled';

const PTZFocusZoomController = ({
  zoom,
  onSliderAfterChange,
  onSliderChange,
  onZoomBtnChange,
  attributes,
  attributesLoaded,
  onFocusBtnChange,
}) => (
  <Container>
    <StyledSlider
      min={attributesLoaded === true ? attributes.ZoomLevel.minValue : 0}
      max={attributesLoaded === true ? attributes.ZoomLevel.maxValue : 0}
      value={zoom}
      leftButton={(
        <ZoomButton onClick={() => onZoomBtnChange('-')}>
          {'-'}
        </ZoomButton>
      )}
      rightButton={(
        <ZoomButton onClick={() => onZoomBtnChange('+')}>
          {'+'}
        </ZoomButton>
      )}
      trackStyle={{
        // backgroundColor: 'rgb(200, 200, 200)',
      }}
      onChange={value => onSliderChange({ value, id: 'zoom' })}
      onAfterChange={() => onSliderAfterChange({ id: 'zoom' })}
    />
    <ButtonWrapper>
      <NearButton
        onClick={() => onFocusBtnChange('Near')}
      >
        <i className="wni wni-ptz-near" />
      </NearButton>
      <FarButton
        onClick={() => onFocusBtnChange('Far')}
      >
        <i className="wni wni-ptz-far" />
      </FarButton>
      <AutoButton
        onClick={() => onFocusBtnChange('Auto')}
      >
        {'AF'}
      </AutoButton>
    </ButtonWrapper>
  </Container>
);

PTZFocusZoomController.defaultProps = {
  zoom: 0,
  // focus: 0,
  onSliderAfterChange: () => {},
  onSliderChange: () => {},
  onZoomBtnChange: () => {},
  onFocusBtnChange: () => {},
  // executeAutoFocus: () => {},
  attributes: {},
  attributesLoaded: false,
  // handleChange: () => {},
  // handleAfterChange: () => {},
};

PTZFocusZoomController.propTypes = {
  zoom: PropTypes.number,
  // focus: PropTypes.number,
  onSliderAfterChange: PropTypes.func,
  onSliderChange: PropTypes.func,
  onZoomBtnChange: PropTypes.func,
  onFocusBtnChange: PropTypes.func,
  // executeAutoFocus: PropTypes.func,
  attributes: PropTypes.instanceOf(Object),
  attributesLoaded: PropTypes.bool,
  // handleChange: PropTypes.func,
  // handleAfterChange: PropTypes.func,
};

export default withContainer(PTZFocusZoomControllerContainer, PTZFocusZoomController);
