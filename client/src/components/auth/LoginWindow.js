import React from 'react'
import Login from './Login'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
    },
    paper: {
        marginBottom: theme.spacing(5),
        padding: theme.spacing(5),
        paddingTop: theme.spacing(0),
        textAlign: 'center',
        height: '100%',
        backgroundColor: '#fbcf36',
        borderRadius: '15px',
        color: '#191919',
    },
    image: {
        height: "140px",
        width: "140px",
        border: '3px solid #191919',
        objectFit: 'cover',
        position: "relative",
        borderRadius: '1%'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function Result() {
  
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={24}>
                <Login/>
            </Paper>
      </div>
    )
}