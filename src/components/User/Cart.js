import React from "react";
import { createPortal } from 'react-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IndividualListCard from '../../custom-components/IndividualListCard';
import { useCartProvider } from '../../store/CartProvider';
import { NumericFormat } from 'react-number-format';
import serverAPI from '../../api/serverAPI';

function Cart({closeModalHandler}) {
    const {cartItems, totalAmount, clearCart, setIsSuccess} = useCartProvider();


    async function addOrder(orderItems){
        const newOrder = {id: crypto.randomUUID(), orderItems}; 
        
        try {
            const response = await serverAPI.post("/orders", newOrder);

            if (response.status === 201) {
                setIsSuccess(true);
                clearCart();
            }

            

        } catch (err) {
            console.log("Error adding new order: ", err);
        }
    }

    const portalContent = (
        <Box 
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                zIndex: 1000
            }}
            >
            <Card sx={{width: 500, borderRadius: "20px",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "50px",
                zIndex: 1000

            }}>
                <CardContent>
                    <List>
                        
                            {
                                cartItems.map((item) => {
                                    return (
                                        <IndividualListCard item={item} key={item.id}/>
                                    )
                                })
                            }             
                    
                    </List>
                    <Divider sx={{borderBottomWidth: 3, borderBottomColor: "#060606"}}></Divider>
                    <Grid container justifyContent={"space-between"} mt={2}>
                        <Grid>
                            <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Total Amount:</Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="subtitle1"
                            sx={{
                                "&:before" : {content: '"$"'}
                            }}>
                                <NumericFormat displayType="text" value={totalAmount} decimalScale={2} fixedDecimalScale></NumericFormat>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{display:"flex", justifyContent:"center"}}>
                    <Button variant="outlined" onClick={closeModalHandler} sx={{borderRadius: "20px"}}>Close</Button>
                    <Button variant="contained" sx={{borderRadius: "20px"}} onClick={() => addOrder(cartItems)}>Order</Button>
                </CardActions>
            </Card>
            </Box>
    );
    
        return (
            createPortal(portalContent, document.body)
            
        )
}

export default Cart;