import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useItemsProvider } from '../../store/ItemsProvider';

function AdminAlert() {
    const {alertMessage, setAlertMessage, isAlert, setIsAlert} = useItemsProvider();

    const handleClose = () => {
        setIsAlert(false);
    }

    return (
        <Snackbar 
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        open={isAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        slotProps={{ transition: { onExited: () => setAlertMessage("") } }}>
            <Alert severity="info">{alertMessage}</Alert>
        </Snackbar>
    );
}

export default AdminAlert;