import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from './Navbar';
import axios from 'axios'

import ChangePassword from './Editor/ChangePassword';
import EditArtistInfo from './Editor/EditArtistInfo';
import EditArtistProfile from './Editor/EditArtistProfile';
import EditPrestations from './Editor/EditPrestations';
import EditGallery from './Editor/EditGallery';
import EditVideos from "./Editor/EditVideos";
import Progress from './Editor/Progress';

import { GrUserSettings } from "react-icons/gr";
import { BsInfoSquare } from "react-icons/bs";
import { GiPartyFlags } from "react-icons/gi";
import { BiPhotoAlbum } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";

const drawerWidth = 75;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#fbcf36",
        color: '#191919'
    },
    menuButton: {
        marginRight: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        backgroundColor: "#fbcf36",
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
    },
}));

function EditProfile(props) {

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    const [isConfirmed, setisConfirmed] = React.useState(false);

    const [btn0, setBtn0] = React.useState(false);
    const [btn1, setBtn1] = React.useState(false);
    const [btn2, setBtn2] = React.useState(false);
    const [btn3, setBtn3] = React.useState(true);
    const [btn4, setBtn4] = React.useState(false);
    const [btn5, setBtn5] = React.useState(false);
    
    const { user } = props.auth;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
        const artist = {
          _id: user.id
        }
        axios.post("/api/users/isConfirmed", artist)
            .then(res => {
                setisConfirmed(res.data.isConfirmed)
            })
    
    }, [user.id]);
    // React.useEffect()
    const handlebtn0 = () => {
        setBtn0(true);
        setBtn1(false);
        setBtn2(false);
        setBtn3(false);
        setBtn4(false);
        setBtn5(false);
    };
    const handlebtn1 = () => {
        setBtn0(false);
        setBtn1(true);
        setBtn2(false);
        setBtn3(false);
        setBtn4(false);
        setBtn5(false);
    };
    const handlebtn2 = () => {
        setBtn0(false);
        setBtn1(false);
        setBtn2(true);
        setBtn3(false);
        setBtn4(false);
        setBtn5(false);
    };
    const handlebtn3 = () => {
        setBtn0(false);
        setBtn1(false);
        setBtn2(false);
        setBtn3(true);
        setBtn4(false);
        setBtn5(false);
    };
    const handlebtn4 = () => {
        setBtn0(false);
        setBtn1(false);
        setBtn2(false);
        setBtn3(false);
        setBtn4(true);
        setBtn5(false);
    };
    const handlebtn5 = () => {
        setBtn0(false);
        setBtn1(false);
        setBtn2(false);
        setBtn3(false);
        setBtn4(false);
        setBtn5(true);
    };
    
    const BtnChecker = () => {

        if (btn0 === true) return (<EditArtistProfile/>)
        if (btn5 === true) return (<EditArtistInfo/>)
        if (btn1 === true) return (<EditPrestations/>)
        if (btn2 === true) return (<EditVideos _id={user.id} />)
        if (btn3 === true) return (<EditGallery id={user.id} type={3}/>)
        if (btn4 === true) return (<ChangePassword/>)
        return (<></>)
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} ></div>
            <List style={{ paddingTop: '145px' }}>
                <ListItem button onClick={handlebtn0}>
                    <ListItemText><GrUserSettings className="react-icons-bar" /></ListItemText>
                </ListItem>
                <ListItem button onClick={handlebtn5}>
                    <ListItemText><BsInfoSquare className="react-icons-bar" /></ListItemText>
                </ListItem>
                <ListItem button onClick={handlebtn1}>
                    <ListItemText><GiPartyFlags className="react-icons-bar" /></ListItemText>
                </ListItem>
                <ListItem button onClick={handlebtn2}>
                    <ListItemText><BsCollectionPlay className="react-icons-bar" /></ListItemText>
                </ListItem>
                <ListItem button onClick={handlebtn3}>
                    <ListItemText><BiPhotoAlbum className="react-icons-bar" /></ListItemText>
                </ListItem>
                <ListItem button onClick={handlebtn4}>
                    <ListItemText><RiLockPasswordLine className="react-icons-bar" /></ListItemText>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    if (isConfirmed === false) return (
        <div className="container center" style={{ height: '100vh', paddingTop: '30vh' }}>
            <h2><b>Inscription effectuée avec succes</b></h2>
            <h5><b>Confirmez Votre Email</b></h5>
        </div>
    )
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Navbar/>
                <Hidden smUp implementation="css">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <IoMdSettings className="react-icons"/>
                        </IconButton>
                        <Progress id={user.id} bar={true}/>
                    </Toolbar>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <IoMdSettings className="react-icons"/>
                        </IconButton>
                        <Progress id={user.id} bar={true}/>
                    </Toolbar>
                </Hidden>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        className={classes.drawerPaper}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper, 
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <Hidden smUp implementation="css">
                    <BtnChecker/>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <div style={{ paddingLeft: '75px' }}><BtnChecker/></div>
                </Hidden>
            </main>
        </div>
    );
}

EditProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
     auth: state.auth,
     errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(EditProfile));