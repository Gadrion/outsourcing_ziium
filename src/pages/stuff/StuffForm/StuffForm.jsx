import React from 'react';
import { func, instanceOf, string } from 'prop-types';
import {
  Container, Grid, Box, Paper, FormGroup, FormControlLabel, Checkbox, TextField, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { withContainer } from 'wisenet-ui/util/hoc';

import StuffFormContainer from './StuffFormContainer';
import ImageSelector from '../ImageSelector/ImageSelector';

const StatusSelect = ({ onClick }) => (
  <div>
    <Button onClick={onClick}>변경</Button>
    <span>{`생성 (${'sample'})`}</span>
    <span>{`수정 (${'sample'})`}</span>
  </div>
);

StatusSelect.propTypes = {
  onClick: func.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const StuffForm = ({
  name, memo, option, options, files, _onChange, _onClick,
}) => {
  const classes = useStyles();

  const controls = [
    { label: '물건명', control: (<TextField value={name} variant="filled" fullWidth onChange={_onChange('name')} />) },
    { label: '상태', control: (<StatusSelect onClick={_onClick('location')} />) },
    {
      label: '메모',
      control: (<TextField
        id="filled-multiline-static"
        multiline
        rows={6}
        value={memo}
        variant="filled"
        fullWidth
        onChange={_onChange('memo')}
      />
      ),
    },
    {
      label: '옵션',
      control: (
        <FormGroup row>
          {options.map(({ key, label }) => (
            <FormControlLabel
              key={key}
              control={(
                <Checkbox name={key} color="primary" onChange={_onChange('option')} checked={!!option[key]} />
              )}
              label={label}
            />
          ))}
        </FormGroup>
      ),
    },
    {
      label: '사진',
      control: (<ImageSelector files={files} onChange={_onChange('images')} />),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container direction="column">
        {controls.map(control => (
          <Box width={1} key={control.label}>
            <Paper className={classes.paper}>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={4}>
                  {control.label}
                </Grid>
                <Grid item xs={8}>
                  {control.control}
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

StuffForm.propTypes = {
  name: string.isRequired,
  memo: string.isRequired,
  option: instanceOf(Object).isRequired,
  options: instanceOf(Object).isRequired,
  files: instanceOf(Object).isRequired,
  _onChange: func.isRequired,
  _onClick: func.isRequired,
};

export default withContainer(StuffFormContainer, StuffForm);
