import React from 'react';
// import PropTypes from 'prop-types';
import {
  Grid, Box, Paper, FormGroup, FormControlLabel, Checkbox, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const StatusSelect = () => (
  <>구현 중</>
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

const StuffForm = () => {
  const classes = useStyles();

  const name = '';
  const memo = '';
  const options = ['1룸', '1.5룸', '2룸', '3룸', '4룸', '복층', '테라스', '월세', '전세', '구옥'];

  const controls = [
    { label: '물건명', control: (<TextField defaultValue={name} variant="filled" fullWidth />) },
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
      />
      ),
    },
    {
      label: '옵션',
      control: (
        <FormGroup row>
          {options.map(option => (
            <FormControlLabel
              control={(<Checkbox name={option} color="primary" />)}
              label={option}
            />
          ))}
        </FormGroup>
      ),
    },
    {
      label: '사진',
      control: (<></>),
    },
  ];

  return (
    <Box width="75%">
      <Grid container direction="column">
        {controls.map(control => (
          <Box width={1}>
            <Paper className={classes.paper}>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={4} spacing={3}>
                  {control.label}
                </Grid>
                <Grid item xs={8} spacing={3}>
                  {control.control}
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default StuffForm;
