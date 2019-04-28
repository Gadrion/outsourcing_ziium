import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { withContainer } from 'wisenet-ui/util/hoc';
import { FlexiblePage, Accordion } from 'wisenet-ui/components/organisms';
import { LivePageContainer } from 'containers/pages';
import {
  // EventTabWrapper,
  PTZTab,
  LiveVideoLayout,
  LiveCameraList,
  LayoutList,
  EventList,
  LiveMediaControlBar,
} from 'components/organisms';
import LayoutListButton from './LayoutListButton';
// import { UmpPlayer } from 'wisenet-ui/components/molecules';
import {
  TabsStyled,
  TabStyled,
  TabIconStyled,
  ContentStyled,
  SideControlButtonStyled,
  LivePageWrapperStyled,
  SideComponentWrapperStyled,
  SideControlWrapperStyled,
} from './LivePageStyled';

const LivePage = ({
  // listData,
  tileCameraList,
  selectedChannel,
  dragTileCameraList,
  setDragTileCamera,
  layoutListData,
  selectedLayoutListItem,
  addingLayoutListItem,
  updateSelectedLayoutListItem,
  onClickLayoutListCtrlButton,
  onKeyPress,
  isFullscreen,
  onChangeFolding,
  isFolding,
  updateInputValue,
  setRef,
}) => {
  const cameralistItems = [
    {
      title: 'Camera',
      content: <LiveCameraList setDragTileCamera={setDragTileCamera} />,
    },
    {
      title: 'Layout',
      addionalItem: <LayoutListButton
        onClickLayoutListCtrlButton={onClickLayoutListCtrlButton}
        addingNewLayoutList={addingLayoutListItem}
        layoutListData={layoutListData}
        selectedLayoutListItem={selectedLayoutListItem}
      />,
      content: <LayoutList
        layoutList={layoutListData}
        addingNewLayoutList={addingLayoutListItem}
        updateSelectedLayoutListItem={updateSelectedLayoutListItem}
        updateInputValue={updateInputValue}
      />,
    },
  ];

  const tabData = [
    {
      key: 'tab_list',
      header: <TabIconStyled className="wni wni-list-view" />,
      component: (
        <React.Fragment>
          <Accordion menus={cameralistItems} />
        </React.Fragment>
      ),
      toolTip: 'Camera list',
    },
    {
      key: 'tab_event',
      header: <TabIconStyled className="wni wni-alarm" />,
      component: (
        <React.Fragment>
          <EventList />
        </React.Fragment>
      ),
      toolTip: 'Event Tab',
    },
  ];

  const livePTZAccordion = [
    {
      title: 'PTZ',
      content: <PTZTab selectedChannel={selectedChannel} />,
    },
  ];

  return (
    <LivePageWrapperStyled
      ref={e => {
        setRef(e);
      }}
      tabIndex="-1"
      onKeyPress={onKeyPress}
      isFolding={isFolding}
    >
      <FlexiblePage
        headerSize={isFullscreen ? 0 : 60}
        sideFolding
        isFolding={isFolding}
        sideControlComponent={(
          <SideControlWrapperStyled
            isVideoOver={isFullscreen && isFolding}
          >
            <SideControlButtonStyled
              className="wni wni-side-showhidden"
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
              selectedChannel={selectedChannel}
            >
              {tabData.map(data => (
                <TabStyled
                  key={data.key}
                  header={data.header}
                  component={data.component}
                  toolTip={data.toolTip}
                />
              ))}
            </TabsStyled>
            <Accordion menus={livePTZAccordion} />
          </SideComponentWrapperStyled>
        )}
      >
        <ContentStyled>
          <LiveVideoLayout
            tileList={tileCameraList}
            dragTileCameraList={dragTileCameraList}
            setDragTileCamera={setDragTileCamera}
          />
          {
            !isFullscreen && (
              <LiveMediaControlBar />
            )
          }
        </ContentStyled>
      </FlexiblePage>
    </LivePageWrapperStyled>
  );
};

LivePage.propTypes = {
  // lang: PropTypes.objectOf(PropTypes.string).isRequired,
  // listData: PropTypes.instanceOf(Array),
  tileCameraList: PropTypes.instanceOf(Array).isRequired,
  selectedChannel: PropTypes.instanceOf(Map).isRequired,
  dragTileCameraList: PropTypes.instanceOf(List).isRequired,
  setDragTileCamera: PropTypes.func.isRequired,
  layoutListData: PropTypes.instanceOf(List).isRequired,
  selectedLayoutListItem: PropTypes.instanceOf(Object),
  addingLayoutListItem: PropTypes.bool,
  updateSelectedLayoutListItem: PropTypes.func.isRequired,
  onClickLayoutListCtrlButton: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  onChangeFolding: PropTypes.func.isRequired,
  isFolding: PropTypes.bool.isRequired,
  updateInputValue: PropTypes.func.isRequired,
  setRef: PropTypes.func.isRequired,
};

LivePage.defaultProps = {
  // listData: [{
  //   name: '',
  //   checked: false,
  //   icon: '',
  //   enable: '',
  //   deviceType: '',
  //   deviceName: '',
  //   additional: '',
  // }],
  selectedLayoutListItem: [],
  addingLayoutListItem: false,
};


export default withContainer(LivePageContainer, LivePage);
