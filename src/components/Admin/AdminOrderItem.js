import React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

function AdminOrderItem({order, deleteOrder}){
    const items = order.orderItems;

    const handleDelete = (orderID) => {
        deleteOrder(orderID);
    }

    if (!order) {
        return;
    }

    let totalAmount = 0; 

    items.map((item) => totalAmount += item.pricePerUnit * item.quantity);

    return (
        <>
            {   
                items.map((item) => {
                    return (
                        <>
                        <ListItem sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                                        <ListItemText primary={item.itemName} secondary={`x ${item.quantity}`}
                                        slotProps={{primary : {fontWeight: "bold", fontSize:"16px"}}}/>
                                        <ListItemText primary={`$${(item.pricePerUnit * item.quantity).toFixed(2)}`} sx={{alignSelf: "flex-end", textAlign: "right"}}/>         
                        </ListItem>
                        <Divider component="li" variant="middle"></Divider>
                        </>
                    )
                })
            }
            <Grid container justifyContent="space-between" mt={2}>
                <Grid>
                    <ListItemButton alignSelf='flex-end'>
                        <Button variant="outlined" size="small" color="error" 
                        onClick={() => handleDelete(order.id)}>Delete</Button>
                    </ListItemButton>
                </Grid>
                <Grid alignSelf={"flex-end"}>
                    <ListItemText primary={`Total: $${totalAmount.toFixed(2)}`} sx={{textAlign: "right", paddingRight: "16px"}}
                    slotProps={{primary : {fontWeight: "bold", fontSize: "18px"}}}></ListItemText>
                </Grid>
            </Grid>
        </>
    );
}

export default AdminOrderItem;