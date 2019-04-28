import React from 'react';
import PropTypes from 'prop-types';
import ThemeSwitcherStyled from './ThemeSwitcherStyled';

const ThemeSwitcher = ({
  // themes,
  theme,
  changeTheme,
  ...rest
}) => {
  const themes = ['black', 'white'];
  const themeOptions = themes.map(themeName => (
    <option
      key={themeName}
      value={themeName}
    >
      {themeName}
    </option>
  ));
  return (
    <ThemeSwitcherStyled
      value={theme}
      onChange={changeTheme}
      {...rest}
    >
      {themeOptions}
    </ThemeSwitcherStyled>
  );
};

ThemeSwitcher.propTypes = {
  // themes: PropTypes.arrayOf(PropTypes.string).isRequired,
  theme: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default ThemeSwitcher;
