import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { DropDownMenuContainer } from 'wisenet-ui/containers/organisms';
import {
  DropDownMenuStyled,
  ContextMenuWrapperStyled,
} from './DropDownMenuStyled';

const DropDownMenu = ({
  children,
  onMenuOpen,
  isOpend,
  setRef,
  menuItems,
  className,
}) => (
  <DropDownMenuStyled
    className={className}
  >
    {
      React.cloneElement(children, {
        onClick: onMenuOpen,
      })
    }
    {
      isOpend && (
        <ContextMenuWrapperStyled
          ref={e => {
            setRef(e);
          }}
        >
          {
            menuItems.map(item => item)
          }
        </ContextMenuWrapperStyled>
      )
    }
  </DropDownMenuStyled>
);

DropDownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  onMenuOpen: PropTypes.func.isRequired,
  isOpend: PropTypes.bool.isRequired,
  setRef: PropTypes.func.isRequired,
  menuItems: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

DropDownMenu.defaultProps = {
  className: null,
};

export default withContainer(DropDownMenuContainer, DropDownMenu);
