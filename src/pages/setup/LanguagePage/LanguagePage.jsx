import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { LanguageSwitcher } from 'wisenet-ui/components/molecules';
import { LanguagePageContainer } from 'containers/pages';

const LanguagePage = ({
  lang,
  currentLanguage,
  changeLanguage,
}) => {
  console.log(lang);
  return (
    <div>
      <LanguageSwitcher currentLanguage={currentLanguage.name} changeLanguage={changeLanguage} />
      <p>{lang.MSG_USE_ONE_MORE}</p>
    </div>
  );
};

LanguagePage.propTypes = {
  lang: PropTypes.objectOf(PropTypes.string).isRequired,
  currentLanguage: PropTypes.objectOf(PropTypes.string),
  changeLanguage: PropTypes.func,
};

LanguagePage.defaultProps = {
  currentLanguage: 'english',
  changeLanguage: () => {},
};

export default withContainer(LanguagePageContainer, LanguagePage);
