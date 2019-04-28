import React from 'react';
import PropTypes from 'prop-types';
import LanguageList from 'util/static/constants/constantLang.js';
import { Select } from 'wisenet-ui/components/atoms';

const LanguageSwitcher = ({
  currentLanguage,
  changeLanguage,
}) => {
  let currentLanguageIndex = 0;
  const languageOptions = LanguageList.map((lang, index) => {
    if (currentLanguage === lang.name) currentLanguageIndex = index;
    return (
      <option
        value={index}
        key={lang.value}
      >
        {lang.value}
      </option>
    );
  });
  return (
    <Select value={currentLanguageIndex} onChange={changeLanguage}>
      {languageOptions}
    </Select>
  );
};

LanguageSwitcher.propTypes = {
  currentLanguage: PropTypes.string,
  changeLanguage: PropTypes.func,
};

LanguageSwitcher.defaultProps = {
  currentLanguage: 'english',
  changeLanguage: () => {},
};

export default LanguageSwitcher;
