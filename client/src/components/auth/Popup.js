import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Register from './Register';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
        <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
            Creér un compte
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
        >
          <Register style={{ width: '700px'}}/>
        </Dialog>
    </div>
  );
}