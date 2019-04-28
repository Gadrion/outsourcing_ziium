import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Auth } from 'util/lib';
import { AlarmCenter } from 'components/organisms';
import Logo from 'util/static/images/wisenet_logo.svg';
import {
  HeaderWrapperStyled,
  LogoWrapperStyled,
  CenterWrapperStyled,
  NavigationWrapperStyled,
  AlarmAndFuncWrapperStyled,
  AlarmWrapperStyled,
  FuncWrapperStyled,
  NaviLinkStyled,
  NavIconStyled,
  NavSpanStyled,
  ToggleStyled,
  FuncIconButtonStyled,
  ModelNameStyled,
} from './HeaderStyled';

const links = [
  {
    name: 'Monitoring',
    to: '/live',
    icon: 'wni-monitoring',
  },
  {
    name: 'Search',
    to: '/search',
    icon: 'wni-search',
  },
  {
    name: 'Setup',
    to: '/setup',
    icon: 'wni-setup',
  },
];

const Header = ({
  onLogout,
  location,
  handleOpenOnlineHelp,
  themeValue,
  handleChangeTheme,
  modelName,
}) => {
  const currentPath = location.pathname.split('/').slice(1)[0];
  return (
    <HeaderWrapperStyled currentPath={currentPath}>
      <LogoWrapperStyled currentPath={currentPath}>
        <img src={Logo} alt="Wisenet" />
      </LogoWrapperStyled>
      <CenterWrapperStyled>
        <NavigationWrapperStyled>
          {
            links.map(item => (
              <NaviLinkStyled
                to={item.to}
                key={item.to}
                title={item.name}
                activeClassName="active"
              >
                <NavIconStyled className={`wni ${item.icon}`} />
                <NavSpanStyled>
                  {item.name}
                </NavSpanStyled>
              </NaviLinkStyled>
            ))
          }
        </NavigationWrapperStyled>
        <AlarmAndFuncWrapperStyled>
          <AlarmWrapperStyled>
            <AlarmCenter />
          </AlarmWrapperStyled>
          <FuncWrapperStyled>
            <ModelNameStyled>{modelName}</ModelNameStyled>
            <FuncIconButtonStyled className="wni wni-user" title={Auth.getUserid()} />
            {
              process.env.NODE_ENV !== 'production' && (
                <FuncIconButtonStyled className="wni wni-logout" title="Logout" onClick={onLogout} />
              )
            }
            <FuncIconButtonStyled className="wni wni-help" title="Online help" onClick={handleOpenOnlineHelp} />
            <ToggleStyled
              handleText={['B', 'W']}
              value={themeValue}
              onAfterChange={value => handleChangeTheme(value)}
            />
          </FuncWrapperStyled>
        </AlarmAndFuncWrapperStyled>
      </CenterWrapperStyled>
    </HeaderWrapperStyled>
  );
};

Header.defaultProps = {
  modelName: '',
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  handleOpenOnlineHelp: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  themeValue: PropTypes.number.isRequired,
  handleChangeTheme: PropTypes.func.isRequired,
  modelName: PropTypes.string,
};

export default withContainer(HeaderContainer, Header);
