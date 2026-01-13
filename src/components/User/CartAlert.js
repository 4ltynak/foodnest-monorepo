import React, {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCartProvider } from '../../store/CartProvider';

function CartAlert() {
    const {isCartError, setIsCartError, cartErrorMsg, setCartErrorMsg, isSuccess ,setIsSuccess} = useCartProvider();
    
    const [notification, setNotification] = useState({
        msg: "", 
        severity: "info"
    });

    useEffect(() => {
        if (isSuccess) {
            setNotification({msg: "Order placed!", severity: "success"});
        } else if (isCartError){
            setNotification({msg: cartErrorMsg, severity: "info"})
        }
    }, [isSuccess, isCartError, cartErrorMsg]);

    const handleClose = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setIsCartError(false);
        setIsSuccess(false);
    }

    return (
        <Snackbar 
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        open={isSuccess || isCartError}
        autoHideDuration={2000}
        slotProps={{onExited: () => {setCartErrorMsg("")}}}
        onClose={handleClose}>
            <Alert severity={notification.severity}>{notification.msg}</Alert>
        </Snackbar>
    );
}

export default CartAlert;
