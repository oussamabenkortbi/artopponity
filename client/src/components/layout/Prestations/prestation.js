import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import EditPrestation from '../Editor/EditPrestation';
import { CgTimelapse } from "react-icons/cg";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaVectorSquare } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
    },
    paper: {
        margin: '0px 15px',
        padding: theme.spacing(2),
        backgroundColor: '#fbcf36',
        color: '#191919', 
        borderBottom: '0.5px solid #666666',
    }
}));

export default function Result({prestation, editable}) {
    
    const [btn, setBtn] = useState("Réserver");
    const classes = useStyles();

    function soon() {
        setBtn("Soon");
    }

    const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const [openDelete, setOpenDelete] = React.useState(false);
  
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleDelete = () => {
        const id = {
            _id: prestation._id
        }
        axios.post("/api/prestations/deletePresation", id)
            .then(() => {
                window.location.reload();
            }).catch(error => console.log(error))
    };

    const EditChecker = () => { 
        // 0: no button, 1: commande, 2: modifier
        if (editable === 1) return (
            <Button disabled onClick={soon} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                {btn}
            </Button>
        )
        else if (editable === 2) return (
            <div className="container-fluid">
                <div className="row right">
                    <Button variant="contained" onClick={handleClickOpenDelete} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                        Supprimer
                    </Button>
                    <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                    >
                        <div 
                            className="container-fluid center"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#fbcf36',
                                maxWidth: '300px',
                                height: '200px'
                            }}>
                                <div 
                                    className="row"
                                    style={{ 
                                        margin: '20px'
                                    }}>
                                        <Button variant="contained" onClick={handleCloseDelete} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                                            Annuler
                                        </Button>
                                        <div style={{ padding: '0px 10px' }}></div>
                                        <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                                            Confirmer
                                        </Button>
                                </div>
                        </div>
                    </Dialog>
                    <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#191919', color: '#fbcf36', marginLeft: '20px' }}>
                        modifier
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <EditPrestation prestation={prestation}/>
                    </Dialog>
                </div>
            </div>
        )
        else return (<></>) 
    }
    
    return (
        <div className={classes.root}>
            <div className={classes.paper} elevation={1}>
                <h4 ><b>{prestation.name}</b></h4>
                <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{ display: 'inline-flex', flexWrap: 'wrap', flex: '75%' }}>
                        <p>{prestation.description}</p>
                    </div>
                    <div style={{ flex: '20%' }}></div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '30px', flex: '70%' }}>
                        <h5 className="moneyicon"><FaMoneyBillAlt className="react-icons"/><b> {prestation.price} DA</b></h5><p className="description money">prix</p>
                        <h5 className="timeicon"><CgTimelapse className="react-icons"/><b> {prestation.time} MIN</b></h5><p className="description time">time</p>
                        <h5 className="icon"><BsFillPeopleFill className="react-icons"/><b> {prestation.artists}</b></h5>
                        <h5 className="icon"><FaVectorSquare className="react-icons"/><b> {prestation.space} M²</b></h5>
                        <h5 className="icon"><GiSandsOfTime className="react-icons"/><b> {prestation.prepareTime} MIN</b></h5>
                    </div>
                    <div style={{ flex: '30%', textAlign: 'right' }}>
                        <EditChecker/>
                    </div>
                </div>
            </div>
        </div>
    )
}