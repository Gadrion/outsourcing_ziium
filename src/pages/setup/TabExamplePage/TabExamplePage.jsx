import React from 'react';
import PropTypes from 'prop-types';
import { TabExamplePageContainer } from 'containers/pages';
import { Tabs } from 'wisenet-ui/components/organisms';
import { Tab } from 'wisenet-ui/components/atoms';
import {
  TabWrapperStyled,
  CustomTabStyled,
  DarkColorBackgroundStyled,
  DarkColorTabWrapperStyled,
  DarkTabsStyled,
  DarkTabStyled,
  MultiLineTabWrapperStyled,
  MultiLineTabsStyled,
  MultiLineTabStyled,
  InlineTabWrapper,
} from './TabExamplePageStyled';

const render = ({
  tabData1,
  tabData2,
  tabData3,
  tabData4,
}) => (
  <React.Fragment>
    <hr />
    <h1>Tab (default)</h1>
    <TabWrapperStyled>
      <Tabs>
        {tabData1.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </TabWrapperStyled>
    <h1>Tab (icon)</h1>
    <TabWrapperStyled>
      <Tabs>
        {tabData2.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </TabWrapperStyled>
    <h1>Tab (no border)</h1>
    <TabWrapperStyled>
      <Tabs
        noBorder
      >
        {tabData2.map(data => (
          <CustomTabStyled
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </TabWrapperStyled>
    <DarkColorBackgroundStyled>
      <h1>Tab (with user custom class)</h1>
      <DarkColorTabWrapperStyled>
        <DarkTabsStyled>
          {tabData2.map(data => (
            <DarkTabStyled
              key={data.key}
              header={data.header}
              component={data.component}
            />
          ))}
        </DarkTabsStyled>
      </DarkColorTabWrapperStyled>
    </DarkColorBackgroundStyled>
    <hr />
    <h1>Tab (multi line header - max row: 5)</h1>
    <MultiLineTabWrapperStyled>
      <Tabs
        maxRow={5}
      >
        {tabData3.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </MultiLineTabWrapperStyled>
    <h1>Tab (multi line header - max row: 4)</h1>
    <MultiLineTabWrapperStyled>
      <Tabs
        maxRow={4}
      >
        {tabData3.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </MultiLineTabWrapperStyled>
    <h1>Tab (multi line header - no border</h1>
    <MultiLineTabWrapperStyled>
      <Tabs
        maxRow={5}
        noBorder
      >
        {tabData3.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </MultiLineTabWrapperStyled>
    <h1>Tab (multi line header - custom style camera setup)</h1>
    <MultiLineTabWrapperStyled>
      <MultiLineTabsStyled
        maxRow={5}
      >
        {tabData4.map(data => (
          <MultiLineTabStyled
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </MultiLineTabsStyled>
    </MultiLineTabWrapperStyled>
    <hr />
    <h1>Tab (align header)</h1>
    <InlineTabWrapper>
      <Tabs
        align="left"
      >
        {tabData2.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </InlineTabWrapper>
    <span style={{ marginLeft: '100px' }} />
    <InlineTabWrapper>
      <Tabs
        align="right"
      >
        {tabData2.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </InlineTabWrapper>
    <hr />
    <h1>Tab (align header - no border)</h1>
    <InlineTabWrapper>
      <Tabs
        align="left"
        noBorder
      >
        {tabData2.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </InlineTabWrapper>
    <span style={{ marginLeft: '100px' }} />
    <InlineTabWrapper>
      <Tabs
        align="right"
        noBorder
      >
        {tabData2.map(data => (
          <Tab
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </Tabs>
    </InlineTabWrapper>
    <hr />
    <h1>Tab (align header - custom style)</h1>
    <InlineTabWrapper>
      <DarkTabsStyled
        align="left"
        noBorder
      >
        {tabData2.map(data => (
          <DarkTabStyled
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </DarkTabsStyled>
    </InlineTabWrapper>
    <span style={{ marginLeft: '100px' }} />
    <InlineTabWrapper>
      <DarkTabsStyled
        align="right"
        noBorder
      >
        {tabData2.map(data => (
          <DarkTabStyled
            key={data.key}
            header={data.header}
            component={data.component}
          />
        ))}
      </DarkTabsStyled>
    </InlineTabWrapper>
    <hr />
  </React.Fragment>
);

render.propTypes = {
  tabData1: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  tabData2: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  tabData3: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  tabData4: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

const TabExamplePage = () => (
  <TabExamplePageContainer render={render} />
);

export default TabExamplePage;
