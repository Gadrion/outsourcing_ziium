import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from 'wisenet-ui/components/atoms';
import { Header as WisenetHeader } from 'wisenet-ui/components/organisms';
// import { LogoutContainer } from 'containers/organisms';
import classnames from 'classnames/bind';
import styles from './Header.scss';

const cx = classnames.bind(styles);

const links = [
    {
        name: 'Live',
        to: '/live',
        icon: 'live',
    },
    {
        name: 'Playback',
        to: '/playback',
        icon: 'playback',
    },
    {
        name: 'Setup',
        to: '/setup/basic/videoProfile',
        icon: 'setup',
    },
    {
        name: 'Something',
        to: '/setup/basic/videoProfile',
        icon: 'something',
    },
];
  
// const Logout = (
//     <LogoutContainer
//         render={
//         ({ handleLogout }) => (
//             <Button
//             onClick={handleLogout}
//             className={cx('logout-button')}
//             >
//             LOGOUT
//             </Button>
//         )
//         }
//     />
// );

const Logout = (
  <div>
    Logout
  </div>
);

storiesOf('DSK', module)
.add('GNB', () => 
    <BrowserRouter>
        <WisenetHeader
            links={links}
            nodeRight={Logout}
        />
    </BrowserRouter>
);