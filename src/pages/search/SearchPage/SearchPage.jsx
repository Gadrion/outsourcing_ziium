import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { FlexiblePage } from 'wisenet-ui/components/organisms';
import { SearchPageContainer, SearchCurrentTimeContainer } from 'containers/pages';
import {
  TextSearchTab,
  EventSearchTab,
  PlaybackVideoLayout,
  SearchResultWrapper,
} from 'components/organisms';
import { List } from 'immutable';
import {
  TabsStyled,
  TabStyled,
  MediaAndResultWrapperStyled,
  MideaWrapperStyled,
  ResultWrapperStyled,
  ResultControlStyled,
  SideControlButtonStyled,
  SearchPageWrapperStyled,
  SideComponentWrapperStyled,
  SideControlWrapperStyled,
  SearchTimelineStyled,
  SearchContentStyled,
  SearchMediaControlBarStyled,
  // TabIconStyled,
} from './SearchPageStyled';

class SearchPage extends React.PureComponent {
  render() {
    const {
      cameraList,
      onSelectedTab,
      currentTabName,
      resultFolding,
      onChangeFolding,
      isFolding,
      isFullscreen,
      setRef,
      timelineFolding,
    } = this.props;
    const searchTabData = [
      {
        key: 'tab_event',
        name: 'eventTab',
        header: 'Event',
        component: (
          <EventSearchTab data={cameraList} />
        ),
        toolTip: 'Event',
      },
      {
        key: 'tab_text',
        name: 'textTab',
        header: 'Text',
        component: <TextSearchTab />,
        toolTip: 'Text',
      },
    ];
    return (
      <SearchPageWrapperStyled
        ref={e => {
          setRef(e);
        }}
        isFolding={isFolding}
        resultFolding={resultFolding}
      >
        <FlexiblePage
          headerSize={isFullscreen ? 0 : 60}
          sideFolding
          isFolding={isFolding}
          sideControlComponent={(
            <SideControlWrapperStyled
              noDisplay={isFullscreen}
            >
              <SideControlButtonStyled
                className="wni wni-side-showhidden side"
                onClick={onChangeFolding}
                isFolding={isFolding}
              />
            </SideControlWrapperStyled>
          )}
          defaultSideWidth={292}
          sideComponent={(
            <SideComponentWrapperStyled>
              <TabsStyled
                noBorder
              >
                {searchTabData.map(data => (
                  <TabStyled
                    key={data.key}
                    name={data.name}
                    header={data.header}
                    component={data.component}
                    toolTip={data.toolTip}
                    onSelectedTab={onSelectedTab}
                  />
                ))}
              </TabsStyled>
            </SideComponentWrapperStyled>
          )}
          sideNoDisplay={isFullscreen}
        >
          <SearchCurrentTimeContainer
            currentTabName={currentTabName}
            render={({
              currentTime,
              setCurrentTime,
              setCurrentTimeWork,
            }) => (
              <SearchContentStyled>
                <MediaAndResultWrapperStyled>
                  <MideaWrapperStyled>
                    <PlaybackVideoLayout
                      currentTabName={currentTabName}
                      setCurrentTime={setCurrentTime}
                    />
                  </MideaWrapperStyled>
                  <ResultControlStyled
                    isOver={(isFullscreen && resultFolding)}
                  >
                    <SideControlButtonStyled
                      className="wni wni-side-showhidden result"
                      onClick={() => onChangeFolding('result')}
                      resultFolding={resultFolding}
                      isOver={(isFullscreen && resultFolding)}
                    />
                  </ResultControlStyled>
                  <ResultWrapperStyled
                    isVisible={resultFolding}
                  >
                    <SearchResultWrapper currentTabName={currentTabName} />
                  </ResultWrapperStyled>
                </MediaAndResultWrapperStyled>
                <SearchMediaControlBarStyled currentTabName={currentTabName} />
                <SearchTimelineStyled
                  noDisplay={isFullscreen && timelineFolding}
                  currentTabName={currentTabName}
                  currentTime={currentTime}
                  setCurrentTimeWork={setCurrentTimeWork}
                />
              </SearchContentStyled>
            )}
          />
        </FlexiblePage>
      </SearchPageWrapperStyled>
    );
  }
}

SearchPage.defaultProps = {
  currentTabName: 'eventTab',
};

SearchPage.propTypes = {
  cameraList: PropTypes.instanceOf(List).isRequired,
  onSelectedTab: PropTypes.func.isRequired,
  currentTabName: PropTypes.string,
  resultFolding: PropTypes.bool.isRequired,
  onChangeFolding: PropTypes.func.isRequired,
  isFolding: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  setRef: PropTypes.func.isRequired,
  timelineFolding: PropTypes.bool.isRequired,
};

export default withContainer(SearchPageContainer, SearchPage);
