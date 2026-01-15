import React, {useEffect, useState} from 'react';
import serverAPI from '../../api/serverAPI';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AdminOrderItem from './AdminOrderItem';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@emotion/react';

function AdminOrdersView(){
    const theme = useTheme();

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    async function retrieveOrders() {
        const response = await serverAPI.get("/orders");
        return response.data;
    }

    async function deleteOrder(orderID){
        try {
            await serverAPI.delete(`/orders/${orderID}`);
            const updatedOrders = orders.filter((order) => order._id !== orderID);
            setOrders(updatedOrders);
        } catch (error) {
            console.log("Delete failed: ", error);
        }

    }

    useEffect(() => {
        const fetchOrders = async () => {
                    setIsLoading(true);

            try {
                const orderList = await retrieveOrders();
                setOrders(orderList);
            } catch (err) {
                console.log("Error retrieving orders: ", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchOrders();


    }, []);

    return (
        <>
            <Grid container direction="column" size={9} p={2} sx={{minHeight: "70vh", margin: "auto"}}>
                
                <Grid size={12}>
                    <Typography variant="h3" textAlign="center">Orders</Typography>
                </Grid>
                <Grid container size={12} gap={2} p={2}>
                    {isLoading && 
                    <Grid size={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <CircularProgress color={theme.palette.primary.main} />
                    </Grid>
                    }
                    {
                        orders?.map((order) => {
                            return (
                            <Grid size={12} key={order.id}>
                            <Paper>
                                <Typography variant="caption" sx={{paddingLeft: "10px", color: theme.palette.gray.main}}>Order ID: {order.id}</Typography>
                                <List dense>
                                        <AdminOrderItem key={order.id} order={order} deleteOrder={deleteOrder}/>
                                </List>
                            </Paper>
                            </Grid>
                        )})
                    }
                </Grid>     

            </Grid>
        </>
    );
}

export default AdminOrdersView;