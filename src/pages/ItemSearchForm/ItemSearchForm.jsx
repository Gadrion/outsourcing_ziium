import React from 'react';
import {
  bool, func, instanceOf, string,
} from 'prop-types';
import {
  Grid, FormGroup, FormControlLabel, Checkbox, Button, TextField,
} from '@material-ui/core';

import { withContainer } from 'wisenet-ui/util/hoc';

import ItemSearchFormContainer from './ItemSearchFormContainer';

import { PaperStyled, LayerStyled } from './ItemSearchFormStyled';

const ItemSearchForm = ({
  isOpen, options, _onClick, _onChange, option,
  resultOnly, otherwise,
  resultOnly1, resultOnly2, otherwise1, otherwise2,
}) => (
  <PaperStyled variant="outlined" component="div" display={isOpen ? 'inline-block' : 'none'}>
    <Grid container direction="column">
      <LayerStyled width={1}>
        <FormGroup row>
          {options.map(({ key, label }) => (
            <FormControlLabel
              key={key}
              label={label}
              control={(<Checkbox name={key} color="primary" onClick={_onClick('check', key)} checked={option[key]} />)}
            />
          ))}
        </FormGroup>
      </LayerStyled>
      <LayerStyled width={1}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={4}>
            <FormControlLabel
              label="결과만"
              control={(<Checkbox name="resultOnly" color="primary" onClick={_onClick('resultOnly')} checked={resultOnly} />)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField variant="filled" fullWidth size="small" onChange={_onChange('resultOnly1')} value={resultOnly1} />
            <TextField variant="filled" fullWidth size="small" onChange={_onChange('resultOnly2')} value={resultOnly2} />
          </Grid>
        </Grid>
      </LayerStyled>
      <LayerStyled width={1}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={4}>
            <FormControlLabel
              label="결과외"
              control={(<Checkbox name="otherwise" color="primary" onClick={_onClick('otherwise')} checked={otherwise} />)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField variant="filled" fullWidth size="small" onChange={_onChange('otherwise1')} value={otherwise1} />
            <TextField variant="filled" fullWidth size="small" onChange={_onChange('otherwise2')} value={otherwise2} />
          </Grid>
        </Grid>
      </LayerStyled>
      <LayerStyled width={1} justifyContent="flex-end" display="flex">
        <Button onClick={_onClick('search')}>검색</Button>
      </LayerStyled>
    </Grid>
  </PaperStyled>
);

ItemSearchForm.defaultProps = {
  isOpen: false,
  _onClick: () => () => { },
  _onChange: () => () => { },
  options: [],
  option: {},
  resultOnly: false,
  otherwise: false,

  resultOnly1: '',
  resultOnly2: '',
  otherwise1: '',
  otherwise2: '',
};

ItemSearchForm.propTypes = {
  isOpen: bool,
  _onClick: func,
  _onChange: func,
  options: instanceOf(Object),
  option: instanceOf(Object),
  resultOnly: bool,
  otherwise: bool,
  resultOnly1: string,
  resultOnly2: string,
  otherwise1: string,
  otherwise2: string,
};

export default withContainer(ItemSearchFormContainer, ItemSearchForm);
