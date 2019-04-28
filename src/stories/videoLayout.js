import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { VideoLayout } from 'wisenet-ui/components/organisms';

storiesOf('videoLayout', module)
  .add('with text', () => <VideoLayout />);
  // .add('with text', () => <div>qweqwe</div>);