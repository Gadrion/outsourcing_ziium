import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SideMenuContainer } from 'wisenet-ui/containers/organisms';
import classNames from 'classnames';
import {
  SubmenuStyled,
  MenuStyled,
  LinkMenuStyled,
  MenuIconStyled,
  ArrowIconStyled,
} from './SideMenuStyled';

const isActivation = (location, menu, depth) => {
  const currentPath = location.pathname.split('/').slice(2);
  const menuPath = menu.id.split('_');
  return currentPath[depth] === menuPath[depth];
};

const makeSideMenuTag = (mainHeight, subHeight, submenu, clickMenu, location, data, depth) => {
  const padding = '0 20px';
  const paddingLeft = 10;
  const newSubmenu = submenu;
  return data.map(item => {
    if (item.isSupport) {
      if (Object.prototype.hasOwnProperty.call(item, 'childs')) {
        const active = isActivation(location, item, depth);
        return (
          <React.Fragment key={item.id}>
            <MenuStyled
              className={
                classNames({
                  main: (depth === 0),
                  sub: (depth !== 0),
                  active,
                })
              }
              style={{
                height: (depth === 0) ? mainHeight : subHeight,
                padding,
                paddingLeft: (depth * paddingLeft) + 10,
              }}
              onClick={e => clickMenu(e, item)}
              role="button"
            >
              {item.icon && <MenuIconStyled className={item.icon} style={{ verticalAlign: 'baseline' }} />}
              {item.label}
              <ArrowIconStyled className={`tui ${item.isOpen ? 'tui-down' : 'tui-left'}`} />
            </MenuStyled>
            <SubmenuStyled ref={e => { newSubmenu[item.id] = e; }} className={`${item.isOpen && 'open'}`}>
              {makeSideMenuTag(mainHeight, subHeight, newSubmenu, clickMenu,
                location, item.childs, depth + 1)}
            </SubmenuStyled>
          </React.Fragment>
        );
      }
      return (
        <li
          key={item.id}
        >
          <LinkMenuStyled
            exact
            to={item.link}
            className={
              classNames({
                end: true,
              })
            }
            style={{
              height: subHeight,
              padding,
              paddingLeft: (depth * paddingLeft) + 10,
            }}
            activeClassName="active"
          >
            {item.icon && <i className={item.icon} />}
            {item.label}
          </LinkMenuStyled>
        </li>
      );
    }
    return null;
  });
};

const SideMenu = ({
  menu,
  mainHeight,
  subHeight,
  submenu,
  clickMenu,
  location,
  className,
}) => (
  <ul className={className}>
    {menu && makeSideMenuTag(mainHeight, subHeight, submenu, clickMenu, location, menu, 0)}
  </ul>
);

SideMenu.defaultProps = {
  mainHeight: 40,
  subHeight: 30,
  clickMenu: () => {},
  menu: null,
  className: null,
};

SideMenu.propTypes = {
  mainHeight: PropTypes.number,
  menu: PropTypes.instanceOf(Array),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  subHeight: PropTypes.number,
  clickMenu: PropTypes.func,
  submenu: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default withContainer(SideMenuContainer, SideMenu);
