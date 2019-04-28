import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { FlexiblePageContainer } from 'wisenet-ui/containers/organisms';
import {
  MainStyled,
  SidebarWrapperStyled,
  RndStyled,
  ContentWrapperStyled,
} from './FlexiblePageStyled';

const FlexiblePage = ({
  children,
  sideComponent,
  sideFolding,
  isFolding,
  sidePosition,
  sideResizing,
  margin,
  sideWidth,
  onResizeSidebar,
  innerRef,
  className,
  headerSize,
  sideNoDisplay,
  sideControlComponent,
}) => (
  <MainStyled
    className={className}
    sidePosition={sidePosition}
  >
    {
      sideComponent && (
        <React.Fragment>
          <SidebarWrapperStyled
            resizable={sideResizing}
            width={sideWidth}
            noDisplay={(isFolding || sideNoDisplay)}
          >
            {
              sideResizing ? (
                <RndStyled
                  ref={innerRef}
                  size={{
                    width: sideWidth,
                  }}
                  headerSize={headerSize}
                  margin={margin}
                  enableResizing={{
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                    left: sidePosition === 'right',
                    right: sidePosition !== 'right',
                    top: false,
                    topLeft: false,
                    topRight: false,
                  }}
                  onResize={onResizeSidebar}
                  disableDragging
                >
                  {sideComponent}
                </RndStyled>
              ) : (
                sideComponent
              )
            }
          </SidebarWrapperStyled>
          {
            sideFolding && (
              sideControlComponent
            )
          }
        </React.Fragment>
      )
    }
    <ContentWrapperStyled
      headerSize={headerSize}
    >
      {children}
    </ContentWrapperStyled>
  </MainStyled>
);

FlexiblePage.defaultProps = {
  children: null,
  sideComponent: null,
  sideFolding: false,
  isFolding: false,
  sideControlComponent: null,
  onResizeSidebar: () => {},
  innerRef: () => {},
  className: null,
  headerSize: 60,
  sideNoDisplay: false,
  margin: {},
};

FlexiblePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sideComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sideFolding: PropTypes.bool,
  isFolding: PropTypes.bool,
  sideControlComponent: PropTypes.oneOfType([PropTypes.any]),
  sideResizing: PropTypes.bool.isRequired,
  sidePosition: PropTypes.string.isRequired,
  sideWidth: PropTypes.number.isRequired,
  onResizeSidebar: PropTypes.func,
  innerRef: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  headerSize: PropTypes.number,
  sideNoDisplay: PropTypes.bool,
  margin: PropTypes.shape({
    left: PropTypes.number,
  }),
};

export default withContainer(FlexiblePageContainer, FlexiblePage);
