import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LangActions } from 'store/actionCreators';

class LanguagePageContainer extends React.Component {
  changeLanguage = e => {
    const selectedLanguage = e.target.value;
    LangActions.changeLanguage(selectedLanguage);
  }

  render() {
    const {
      render,
    } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

LanguagePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    currentLanguage: state.langModule.get('currentLanguage'),
    lang: state.langModule.get('lang'),
  }),
)(LanguagePageContainer);
