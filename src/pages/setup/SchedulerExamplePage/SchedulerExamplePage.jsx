import React from 'react';
// import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SchedulerExamplePageContainer } from 'containers/pages';
import { Scheduler } from 'wisenet-ui/components/organisms';

const SchedulerExamplePage = () => (
  <div style={{ width: '1220px', fontSize: '12px' }}>
    <Scheduler />
  </div>
);


// SchedulerExamplePage.propTypes = {
// };

// SchedulerExamplePage.defaultProps = {
// };

export default withContainer(SchedulerExamplePageContainer, SchedulerExamplePage);
