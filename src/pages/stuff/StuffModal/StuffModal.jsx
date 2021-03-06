import React from 'react';
import { func, bool } from 'prop-types';
import { ButtonGroup, Button } from '@material-ui/core';

import { withContainer } from 'wisenet-ui/util/hoc';

import SutffModalContainer from './StuffModalContainer';
import SutffForm from '../StuffForm/StuffForm';
import Edge from '../Edge/Edge';
import { ModalStyled, StuffStyled, PaperStyled } from './StuffModalStyled';

export const SutffModal = ({
  isOpen, _onClick, _onChange, setRootElem, load,
}) => (
  <ModalStyled open={isOpen}>
    {load ? <div>데이터를 로드 중입니다.</div> : (
      <PaperStyled>
        <StuffStyled ref={setRootElem}>
          <SutffForm />
        </StuffStyled>
        <Edge left bottom>
          <ButtonGroup orientation="vertical" color="default" variant="contained">
            {/* <Button onClick={_onClick('save')}>저장</Button> */}
            <Button component="label">
              파일 추가
              <input type="file" style={{ display: 'none' }} onChange={_onChange('file')} multiple />
            </Button>
            <Button onClick={_onClick('gotoTop')}>위로</Button>
            <Button onClick={_onClick('gotoEnd')}>아래로</Button>
          </ButtonGroup>
        </Edge>
        <Edge right top>
          <ButtonGroup color="default" variant="contained">
            {/* <Button onClick={_onClick('delete')} disabled={id == null}>삭제</Button> */}
            <Button onClick={_onClick('save')}>저장</Button>
            <Button onClick={_onClick('close')}>닫기</Button>
            {/* <Button onClick={_onClick('copy')}>구옥 복사</Button> */}
          </ButtonGroup>
        </Edge>
      </PaperStyled>
    )}
  </ModalStyled>
);

SutffModal.defaultProps = {
  isOpen: false,
};

SutffModal.propTypes = {
  isOpen: bool,
  _onClick: func.isRequired,
  _onChange: func.isRequired,
  setRootElem: func.isRequired,
};

export default withContainer(SutffModalContainer, SutffModal);
