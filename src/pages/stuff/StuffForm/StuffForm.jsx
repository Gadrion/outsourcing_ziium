import React from 'react';
import { func, instanceOf, string } from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Box, Paper, FormGroup, FormControlLabel, Checkbox, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { withContainer } from 'wisenet-ui/util/hoc';

import StuffFormContainer from './StuffFormContainer';
import ImageSelector from '../ImageSelector/ImageSelector';

const StatusSelect = () => (
  <div>
    <Link to="/home">home</Link>
    <span>{`생성 (${'sample'})`}</span>
    <span>{`수정 (${'sample'})`}</span>
  </div>
);

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

const options = ['1룸', '1.5룸', '2룸', '3룸', '4룸', '복층', '테라스', '월세', '전세', '구옥'];

const StuffForm = ({
  name, memo, option, files, _onChange,
}) => {
  const classes = useStyles();
  const optionKeys = Object.keys(option);

  const controls = [
    { label: '물건명', control: (<TextField defaultValue={name} variant="filled" fullWidth onChange={_onChange('name')} />) },
    { label: '상태', control: (<StatusSelect />) },
    {
      label: '메모',
      control: (<TextField
        id="filled-multiline-static"
        multiline
        rows={6}
        defaultValue={memo}
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
          {options.map(op => (
            <FormControlLabel
              key={op}
              control={(
                <Checkbox name={op} color="primary" onChange={_onChange('option')} checked={optionKeys.includes(op)} />
              )}
              label={op}
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
  files: instanceOf(Object).isRequired,
  _onChange: func.isRequired,
};

export default withContainer(StuffFormContainer, StuffForm);
