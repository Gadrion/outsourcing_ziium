import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TextResultTabContainer } from 'containers/organisms';
import { Accordion } from 'wisenet-ui/components/organisms';
import { TextList, TextResult } from 'components/organisms';

const TextSearchTab = () => {
  const menuItems = [
    {
      title: 'Text List',
      content: <TextList />,
    },
    {
      title: 'Data',
      content: <TextResult />,
    },
  ];

  return (
    <div>
      <Accordion menus={menuItems} />
    </div>
  );
};

TextSearchTab.propTypes = {
};

TextSearchTab.defaultProps = {
};

export default withContainer(TextResultTabContainer, TextSearchTab);
