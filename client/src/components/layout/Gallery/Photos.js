import React from 'react';
import Photo from './Photo';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

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

export default function Results({photos, editable, paper, owner}) {
    
    const classes = useStyles();

    let check = []
    const black = (<Photo editable={editable} black={true} owner={owner}/>)

    if (photos[0]) check[0] = (<Photo photo={photos[0]} editable={editable} owner={owner} />); else check[0] = (<div>{black}</div>)
    if (photos[1]) check[1] = (<Photo photo={photos[1]} editable={editable} owner={owner} />); else check[1] = (<div>{black}</div>)
    if (photos[2]) check[2] = (<Photo photo={photos[2]} editable={editable} owner={owner} />); else check[2] = (<div>{black}</div>)
    if (photos[3]) check[3] = (<Photo photo={photos[3]} editable={editable} owner={owner} />); else check[3] = (<div>{black}</div>)
    if (photos[4]) check[4] = (<Photo photo={photos[4]} editable={editable} owner={owner} />); else check[4] = (<div>{black}</div>)
    if (photos[5]) check[5] = (<Photo photo={photos[5]} editable={editable} owner={owner} />); else check[5] = (<div>{black}</div>)

    if (paper === false) return (
        <div>
            <Hidden mdUp implementation="css">
                <div className={classes.root}>
                    <div className={classes.paper} elevation={5}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md">
                                    {check[0]}
                                    <div style={{ paddingTop: '50%'}}></div>
                                    {check[1]}
                                </div>
                                <div className="col-md">
                                    <div style={{ paddingTop: '50%'}}></div>
                                    {check[2]}
                                    <div style={{ paddingTop: '50%'}}></div>
                                    {check[3]}
                                </div>
                                <div className="col-md">
                                    <div style={{ paddingTop: '50%'}}></div>
                                    {check[4]}
                                    <div style={{ paddingTop: '50%'}}></div>
                                    {check[5]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Hidden>
            <Hidden smDown implementation="css">
                <div className={classes.root}>
                    <div className={classes.paper} elevation={5}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md">
                                    {check[0]}
                                    <div style={{ paddingTop: '50%'}}></div>
                                    {check[3]}
                                </div>
                                <div className="col-md">
                                    {check[1]}
                                    <div style={{ paddingTop: '50%'}}></div>
                                    {check[4]}
                                </div>
                                <div className="col-md">
                                    {check[2]}
                                    <div style={{ paddingTop: '50%'}}></div>
                                    {check[5]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Hidden>
        </div>
    )
    return (
        <div>
            <Hidden smUp implementation="css">
                <div className={classes.root}>
                    <Paper className={classes.paper} elevation={5}>
                        <h5><b>Gallery:</b></h5>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md">
                                    <br/>
                                    <div>
                                        { (photos[0]) && (
                                            <Photo photo={photos[0].image} editable={editable} key={photos[0]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                    <div>
                                        { (photos[1]) && (
                                            <Photo photo={photos[1].image} editable={editable} key={photos[1]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                </div>
                                <div className="col-md">
                                    <br/>
                                    <div>
                                        { (photos[2]) && (
                                            <Photo photo={photos[2].image} editable={editable} key={photos[2]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                    <div>
                                        { (photos[3]) && (
                                            <Photo photo={photos[3].image} editable={editable} key={photos[3]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                </div>
                                <div className="col-md">
                                    <br/>
                                    <div>
                                        { (photos[4]) && (
                                            <Photo photo={photos[4].image} editable={editable} key={photos[4]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                    <div>
                                        { (photos[5]) && (
                                            <Photo photo={photos[5].image} editable={editable} key={photos[5]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </Hidden>
            <Hidden xsDown implementation="css">
                <div className={classes.root}>
                    <Paper className={classes.paper} elevation={5}>
                        <h5><b>Gallery:</b></h5>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md">
                                    <br/>
                                    <div>
                                        { (photos[0]) && (
                                            <Photo photo={photos[0].image} editable={editable} key={photos[0]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                    <div>
                                        { (photos[3]) && (
                                            <Photo photo={photos[3].image} editable={editable} key={photos[3]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                </div>
                                <div className="col-md">
                                    <br/>
                                    <div>
                                        { (photos[1]) && (
                                            <Photo photo={photos[1].image} editable={editable} key={photos[1]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                    <div>
                                        { (photos[4]) && (
                                            <Photo photo={photos[4].image} editable={editable} key={photos[4]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                </div>
                                <div className="col-md">
                                    <br/>
                                    <div>
                                        { (photos[2]) && (
                                            <Photo photo={photos[2].image} editable={editable} key={photos[2]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                    <div>
                                        { (photos[5]) && (
                                            <Photo photo={photos[5].image} editable={editable} key={photos[5]._id}/>
                                        )}
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </Hidden>
        </div>
    )
}