import React from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SearchBoxContainer } from 'containers/organisms';
import { withStyles } from "@material-ui/core/styles";
import TextField  from '@material-ui/core/TextField';
import { SearchBoxWrapperStyled, SearchBoxBackgroundWrapperStyled, ContentsWrapperStyled, InputWrapperStyled } from './SeachBoxStyled';

const styles = {
  root: {
    backgroundColor: "white"
  },
  input: {
    backgroundColor: "white !important"
  }
};

const SeachBox = ({
  onLoad, onPlacesChanged, isOpen, onClick, classes
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
            <TextField
              className={classes.root}
              label="위치검색"
              variant="filled"
              fullWidth
              autoFocus
              InputProps={{
                className: classes.input
              }}
            />
            {/* <Button size='small' onClick={onClick('search')}>검색</Button> */}
          </InputWrapperStyled>
        </StandaloneSearchBox>
      </ContentsWrapperStyled>
    </SearchBoxWrapperStyled>
  );
};

export default withStyles(styles)(withContainer(SearchBoxContainer, SeachBox));
