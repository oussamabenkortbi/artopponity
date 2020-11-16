import React from 'react';
import Prestation from './prestation';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        marginBottom: theme.spacing(5),
        padding: theme.spacing(2),
        backgroundColor: '#fbcf36',
        color: '#191919'
    },
}));

export default function Results({prestations, editable, paper}) {
    
    const classes = useStyles();

    if (paper === false) return (
        <div className={classes.paper} elevation={5}>
            <h5><b>formules:</b></h5>
            {   
                prestations.map(
                    prestation => <Prestation prestation={prestation} editable={editable} key={prestation._id}/>
                )
            }
        </div>
    )

    return (
        <Paper className={classes.paper} elevation={5}>
            <h5><b>formules:</b></h5>
            {   
                prestations.map(
                    prestation => <Prestation prestation={prestation} editable={editable} key={prestation._id}/>
                )
            }
        </Paper>
    )
}