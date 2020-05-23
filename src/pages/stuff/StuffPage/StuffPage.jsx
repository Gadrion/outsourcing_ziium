import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

import SutffForm from '../StuffForm/StuffForm';
import Edge from '../Edge/Edge';

export const SutffFormPage = () => (
  <div>
    <SutffForm />
    <Edge left bottom>
      <ButtonGroup orientation="vertical" color="default" variant="contained">
        <Button>저장</Button>
        <Button>파일 추가</Button>
        <Button>위로</Button>
        <Button>아래로</Button>
      </ButtonGroup>
    </Edge>
    <Edge right top>
      <ButtonGroup color="default" variant="contained">
        <Button>삭제</Button>
        <Button>저장</Button>
        <Button>닫기</Button>
        <Button>구옥 복사</Button>
      </ButtonGroup>
    </Edge>
  </div>
);

export default SutffFormPage;
