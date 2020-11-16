import React from 'react'
import Login from './Login'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
        // borderWidth: '1px',
        // borderColor: '#191919',
        // borderStyle: 'solid',
        // border: '3px solid #191919',
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
            <Grid 
            container 
            spacing={2}
            direction="column"
            justify="center"
            alignItems="center"
            >
                <Grid item xs>
                    <Paper className={classes.paper} elevation={24}>
                        <Login/>
                    </Paper>
                </Grid>
            </Grid>
      </div>
    )
}