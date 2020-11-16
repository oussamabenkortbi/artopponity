import React from 'react';
import Video from './video';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: '#fbcf36',
    },
}));

export default function Results({videos, editable, paper}) {
    
    const classes = useStyles();

    if (paper === false) return (
        <div className={classes.root}>
            <div className={classes.paper} elevation={5}>
                <h5><b>Vidéos:</b></h5>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md">
                            <br/>
                            { (videos[0]) && (
                                <Video video={videos[0]} editable={editable} key={videos[0]._id}/>
                            )}
                            <br/>
                            { (videos[2]) && (
                                <Video video={videos[2]} editable={editable} key={videos[2]._id}/>
                            )}
                            <br/>
                        </div>
                        <div className="col-md">
                            <br/>
                            { (videos[1]) && (
                                <Video video={videos[1]} editable={editable} key={videos[1]._id}/>
                            )}
                            <br/>
                            { (videos[3]) && (
                                <Video video={videos[3]} editable={editable} key={videos[3]._id}/>
                            )}
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    else return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={5}>
                <h5><b>Vidéos:</b></h5>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md">
                            <br/>
                            { (videos[0]) && (
                                <Video video={videos[0]} editable={editable} key={videos[0]._id}/>
                            )}
                            <br/>
                            { (videos[2]) && (
                                <Video video={videos[2]} editable={editable} key={videos[2]._id}/>
                            )}
                            <br/>
                        </div>
                        <div className="col-md">
                            <br/>
                            { (videos[1]) && (
                                <Video video={videos[1]} editable={editable} key={videos[1]._id}/>
                            )}
                            <br/>
                            { (videos[3]) && (
                                <Video video={videos[3]} editable={editable} key={videos[3]._id}/>
                            )}
                            <br/>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
}