import React from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SearchBoxContainer } from 'containers/organisms';
import Button from '@material-ui/core/Button';
import TextField  from '@material-ui/core/TextField';
import { SearchBoxWrapperStyled, SearchBoxBackgroundWrapperStyled, ContentsWrapperStyled, InputWrapperStyled } from './SeachBoxStyled';

const SeachBox = ({
  onLoad, onPlacesChanged, isOpen, onClick
}) => {
  return (
    <SearchBoxWrapperStyled isOpen={isOpen}>
      <SearchBoxBackgroundWrapperStyled onClick={onClick('backgroud')}>
      </SearchBoxBackgroundWrapperStyled>
      <ContentsWrapperStyled>
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <InputWrapperStyled>
            <TextField label="위치검색" variant="filled" fullWidth autoFocus />
            {/* <Button size='small' onClick={onClick('search')}>검색</Button> */}
          </InputWrapperStyled>
        </StandaloneSearchBox>
      </ContentsWrapperStyled>
    </SearchBoxWrapperStyled>
  );
};

export default withContainer(SearchBoxContainer, SeachBox);
