import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { DateTimeSubmitterContainer } from 'containers/organisms';
import {
  ButtonContainer,
  StyledButton,
} from './DateTimeSubmitterStyled';

const DateTimeSubmitter = ({
  flag,
  onCancel,
  onApply,
}) => (
  <ButtonContainer>
    <StyledButton onClick={() => onApply(flag)}>적용</StyledButton>
    <StyledButton onClick={() => onCancel()}>취소</StyledButton>
  </ButtonContainer>
);

DateTimeSubmitter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  flag: PropTypes.string,
};

DateTimeSubmitter.defaultProps = {
  flag: '',
};

export default withContainer(DateTimeSubmitterContainer, DateTimeSubmitter);
