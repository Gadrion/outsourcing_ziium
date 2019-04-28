import React from 'react';
import PropTypes from 'prop-types';
import { AlarmCenterContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import {
  AlarmCenterWrapperStyled,
  IconStyled,
  DropDownMenuStyled,
  ErrorMessageWrapperStyled,
  ErrorTitleStyled,
  ErrorMessageStyled,
} from './AlarmCenterStyled';

const alarmMessage = {
  system: [
    {
      id: 'fanError',
      title: 'Fan error',
      message: 'Fan 상태가 원활하지 않습니다. 장치를 확인해 주십시오.',
    },
    {
      id: 'dualSmps',
      title: 'Dual SMPS',
      message: '전원에 문제가 발생하였습니다. 전원 LED를 확인해 주십시오.',
    },
    {
      id: 'recordingStatusWarning',
      title: 'Recording status warning',
      message: '디바이스 문제로 레코딩이 원활히 이루어지지 않고 있습니다.',
    },
    {
      id: 'recordingRestriction',
      title: 'Recording restriction',
      message: '레코딩 데이터가 한계를 초과하였습니다. 키프레임만 녹화되오니, 레코딩 설정을 확인해 주십시오.',
    },
  ],
  hdd: [
    {
      id: 'hddFull',
      title: 'HDD is full, cannot record',
      message: '녹화를 위한 하드디스크의 공간이 부족합니다. 하드디스크를 확인해 주십시오.',
    },
    {
      id: 'noHdd',
      title: 'No HDD',
      message: '연결되어 있는 하드디스크가 없습니다. 장치를 확인해 주십시오.',
    },
    {
      id: 'hddError',
      title: 'HDD error',
      message: '하드디스크에 불량이 있습니다. 장치를 확인해 주십시오.',
    },
    {
      id: 'raidError',
      title: 'Raid error',
      message: 'RAID 디스크에 오류가 생겼습니다. 상태를 확인해 주십시오.',
    },
    {
      id: 'raidRebuilding',
      title: 'Raid rebuilding',
      message: 'RAID에 오류가 발생하여 복구작업을 진행중입니다.',
    },
    {
      id: 'raidFail',
      title: 'Raid fail',
      message: 'Raid array를 사용할 수 없습니다. 상태를 확인해 주십시오.',
    },
    {
      id: 'iscsiDisconnected',
      title: 'iSCSI disconnected',
      message: 'iSCSI 장치가 연결 해제되었습니다.',
    },
  ],
  network: [
    {
      id: 'amdRestriction',
      title: 'AMD restriction',
      message: '10fps 미만 또는 1080p를 초과하여 해당 채널의 AMD가 동작하지 않습니다.',
    },
    {
      id: 'limitedNetwork',
      title: 'Limited network',
      message: '네트워크에 과부하가 발생하였습니다. 카메라 설정을 조절하여 주십시오.',
    },
  ],
  notification: [
    {
      id: 'update',
      title: 'Update',
      message: '서버에 업데이트 할 펌웨어가 있습니다. 최신 데이터로 업그레이드를 진행해주십시오.',
    },
  ],
};

const AlarmCenter = ({
  className,
}) => {
  const systemItems = false && alarmMessage.system.map(item => (
    <ErrorMessageWrapperStyled key={item.id}>
      <ErrorTitleStyled>{item.title}</ErrorTitleStyled>
      <ErrorMessageStyled>{item.message}</ErrorMessageStyled>
    </ErrorMessageWrapperStyled>
  ));
  const hddItems = true && alarmMessage.hdd.map(item => (
    <ErrorMessageWrapperStyled key={item.id}>
      <ErrorTitleStyled>{item.title}</ErrorTitleStyled>
      <ErrorMessageStyled>{item.message}</ErrorMessageStyled>
    </ErrorMessageWrapperStyled>
  ));
  const networkItems = true && alarmMessage.network.map(item => (
    <ErrorMessageWrapperStyled key={item.id}>
      <ErrorTitleStyled>{item.title}</ErrorTitleStyled>
      <ErrorMessageStyled>{item.message}</ErrorMessageStyled>
    </ErrorMessageWrapperStyled>
  ));
  const notificationItems = false && alarmMessage.notification.map(item => (
    <ErrorMessageWrapperStyled key={item.id}>
      <ErrorTitleStyled>{item.title}</ErrorTitleStyled>
      <ErrorMessageStyled>{item.message}</ErrorMessageStyled>
    </ErrorMessageWrapperStyled>
  ));
  const dropDownMenus = [
    {
      id: 'system',
      icon: 'wni wni-alarm-device',
      items: systemItems,
    },
    {
      id: 'hdd',
      icon: 'wni wni-alarm-hdd',
      items: hddItems,
    },
    {
      id: 'network',
      icon: 'wni wni-alarm-network',
      items: networkItems,
    },
    {
      id: 'notification',
      icon: 'wni wni-alarm-notice',
      items: notificationItems,
    },
  ];
  return (
    <AlarmCenterWrapperStyled className={className}>
      {
        dropDownMenus.map(dropDown => dropDown.items && (
          <DropDownMenuStyled
            key={dropDown.id}
            menuItems={dropDown.items}
          >
            <IconStyled className={dropDown.icon} />
          </DropDownMenuStyled>
        ))
      }
    </AlarmCenterWrapperStyled>
  );
};

AlarmCenter.defaultProps = {
  className: null,
};

AlarmCenter.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default withContainer(AlarmCenterContainer, AlarmCenter);
