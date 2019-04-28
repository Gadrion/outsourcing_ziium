import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { EventResult, TextResultTab } from 'components/organisms';
import { SearchResultWrapperContainer } from 'containers/organisms';

const SearchResultWrapper = ({ currentTabName }) => {
  let showBox = null;
  if (currentTabName === 'textTab') {
    showBox = <TextResultTab />;
  } else {
    showBox = <EventResult />;
  }

  return (
    <React.Fragment>
      {showBox}
    </React.Fragment>
  );
};

SearchResultWrapper.defaultProps = {
};

SearchResultWrapper.propTypes = {
  currentTabName: PropTypes.string.isRequired,
};

export default withContainer(SearchResultWrapperContainer, SearchResultWrapper);
