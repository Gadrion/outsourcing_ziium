import React from 'react';
import PropTypes from 'prop-types';
import { TextSearchContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { DatePickerWrapper, Tree } from 'wisenet-ui/components/organisms';
import {
  Container,
  KeywordInput,
  KeywordLabel,
  OptionLabel,
  OptionCheckbox,
  OptionContainer,
  KeywordTreeWrapper,
  ButtonContainer,
  StyledButton,
} from './TextSearchStyled';

class TextSearch extends React.PureComponent {
  render() {
    const {
      lang,
      onKeywordChange,
      onApply,
      onCancel,
      onOptionChange,
      isCaseSensitive,
      isWholeWord,
      eventKeywordList,
      onSelectChanged,
      disableKeyword,
    } = this.props;

    return (
      <Container>
        <DatePickerWrapper
          title={{ start: lang.START, end: lang.END }}
        />
        <KeywordLabel>Event Keywords</KeywordLabel>
        <KeywordTreeWrapper>
          {
            eventKeywordList.length >= 0 && (
            <Tree
              treeData={eventKeywordList}
              onSelectChanged={onSelectChanged}
              showCheckbox
              showIcon
              canDrag={false}
            />
            )
          }
        </KeywordTreeWrapper>
        <KeywordLabel>Keyword</KeywordLabel>
        <KeywordInput
          type="text"
          onChange={onKeywordChange}
          placeholder="All"
          disabled={disableKeyword}
        />
        <OptionContainer>
          <OptionCheckbox checked={isCaseSensitive === 'True'} id="case_sensitive" value="case_sensitive" onClick={onOptionChange} />
          <OptionLabel>Case Sensitive</OptionLabel>
        </OptionContainer>
        <OptionContainer>
          <OptionCheckbox checked={isWholeWord === 'True'} id="whole_word" value="whole_word" onClick={onOptionChange} />
          <OptionLabel>Whole Word</OptionLabel>
        </OptionContainer>
        <ButtonContainer>
          <StyledButton onClick={onApply}>적용</StyledButton>
          <StyledButton onClick={onCancel}>취소</StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}

TextSearch.propTypes = {
  lang: PropTypes.objectOf(PropTypes.string).isRequired,
  onKeywordChange: PropTypes.func,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onOptionChange: PropTypes.func,
  isCaseSensitive: PropTypes.string,
  isWholeWord: PropTypes.string,
  eventKeywordList: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectChanged: PropTypes.func,
  disableKeyword: PropTypes.bool.isRequired,
};

TextSearch.defaultProps = {
  onKeywordChange: () => {},
  onApply: () => {},
  onCancel: () => {},
  onOptionChange: () => {},
  isCaseSensitive: 'True',
  isWholeWord: 'True',
  onSelectChanged: () => {},
};

export default withContainer(TextSearchContainer, TextSearch);
