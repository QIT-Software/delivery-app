import React from 'react';
import {useStyles} from './ActivityIndicator.styles';
import Box from '@material-ui/core/Box';

const ActivityIndicatorFill: React.FC = () => {
  const classes = useStyles();
  return <Box className={classes.root}>Loading...</Box>;
};

export default ActivityIndicatorFill;
