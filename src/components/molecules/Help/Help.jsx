import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'wisenet-ui/components/atoms';

const Help = ({ handleHelp, ...rest }) => (
  <IconButton
    onClick={handleHelp}
    {...rest}
  >
    <i className="tui tui-wn5-help-question" />
  </IconButton>
);

Help.propTypes = {
  handleHelp: PropTypes.func,
};

Help.defaultProps = {
  handleHelp: () => {},
};

export default Help;
