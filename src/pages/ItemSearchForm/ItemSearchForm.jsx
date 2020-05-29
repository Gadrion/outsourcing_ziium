import React from 'react';
import { bool, func } from 'prop-types';
import {
  Grid, FormGroup, FormControlLabel, Checkbox, Button, TextField,
} from '@material-ui/core';

import { PaperStyled, LayerStyled } from './ItemSearchFormStyled';

const options = [
  { key: 'room1', label: '1룸' },
  { key: 'room15', label: '1.5룸' },
  { key: 'room2', label: '2룸' },
  { key: 'room3', label: '3룸' },
  { key: 'room4', label: '4룸' },
  { key: 'all', label: '?' },
  { key: 'duplex', label: '복층' },
  { key: 'terrace', label: '테라스' },
  { key: 'monthly', label: '월세' },
  { key: 'charter', label: '전세' },
  { key: 'imprisonment', label: '구옥' },
];

const ItemSearchForm = ({ isOpen, onClick, onChange }) => (
  <PaperStyled variant="outlined" component="div" display={isOpen ? 'inline-block' : 'none'}>
    <Grid container direction="column">
      <LayerStyled width={1}>
        <FormGroup row>
          {options.map(({ key, label }) => (
            <FormControlLabel
              key={key}
              label={label}
              control={(<Checkbox name={key} color="primary" onClick={onClick('check', key)} />)}
            />
          ))}
        </FormGroup>
      </LayerStyled>
      <LayerStyled width={1}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={4}>
            <FormControlLabel
              label="결과만"
              control={(<Checkbox name="resultOnly1" color="primary" onClick={onClick('check')} />)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField variant="filled" fullWidth size="small" onChange={onChange('text11')} />
            <TextField variant="filled" fullWidth size="small" onChange={onChange('text12')} />
          </Grid>
        </Grid>
      </LayerStyled>
      <LayerStyled width={1}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={4}>
            <FormControlLabel
              label="결과만"
              control={(<Checkbox name="resultOnly2" color="primary" onClick={onClick('check')} />)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField variant="filled" fullWidth size="small" onChange={onChange('text21')} />
            <TextField variant="filled" fullWidth size="small" onChange={onChange('text22')} />
          </Grid>
        </Grid>
      </LayerStyled>
      <LayerStyled width={1} justifyContent="flex-end" display="flex">
        <Button onClick={onClick('search')}>검색</Button>
      </LayerStyled>
    </Grid>
  </PaperStyled>
);

ItemSearchForm.defaultProps = {
  isOpen: false,
  onClick: () => () => { },
  onChange: () => () => { },
};

ItemSearchForm.propTypes = {
  isOpen: bool,
  onClick: func,
  onChange: func,
};

export default ItemSearchForm;
