import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        '& > * + *': {
        marginLeft: theme.spacing(2),
        },
    },
}));

export default function LoadingScreen() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <CircularProgress color="primary" />
      </div>
    );
}