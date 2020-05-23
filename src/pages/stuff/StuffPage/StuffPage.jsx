import React from 'react';
import { func } from 'prop-types';
import { ButtonGroup, Button } from '@material-ui/core';

import { withContainer } from 'wisenet-ui/util/hoc';

import SutffFormPageContainer from './StuffPageContainer';
import SutffForm from '../StuffForm/StuffForm';
import Edge from '../Edge/Edge';

export const SutffFormPage = ({ _onClick }) => (
  <div>
    <SutffForm />
    <Edge left bottom>
      <ButtonGroup orientation="vertical" color="default" variant="contained">
        <Button onClick={_onClick('save')}>저장</Button>
        <Button onClick={_onClick('addFile')}>파일 추가</Button>
        <Button onClick={_onClick('gotoTop')}>위로</Button>
        <Button onClick={_onClick('gotoEnd')}>아래로</Button>
      </ButtonGroup>
    </Edge>
    <Edge right top>
      <ButtonGroup color="default" variant="contained">
        <Button onClick={_onClick('delete')}>삭제</Button>
        <Button onClick={_onClick('save')}>저장</Button>
        <Button onClick={_onClick('close')}>닫기</Button>
        <Button onClick={_onClick('copy')}>구옥 복사</Button>
      </ButtonGroup>
    </Edge>
  </div>
);

SutffFormPage.propTypes = {
  _onClick: func.isRequired,
};

export default withContainer(SutffFormPageContainer, SutffFormPage);
