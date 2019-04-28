import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TextSearchTabContainer } from 'containers/organisms';
import { Accordion } from 'wisenet-ui/components/organisms';
import { PosTargetDevice, TextSearch } from 'components/organisms';

const TextSearchTab = () => {
  const menuItems = [
    {
      title: 'Target Device',
      content: <PosTargetDevice />,
    },
    {
      title: 'Text Search',
      content: <TextSearch />,
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

export default withContainer(TextSearchTabContainer, TextSearchTab);
