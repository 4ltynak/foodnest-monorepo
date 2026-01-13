import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useCartProvider } from '../store/CartProvider';
import { useItemsProvider } from '../store/ItemsProvider';
import AdminForm from './Admin/AdminForm';

import { useTheme } from "@emotion/react";

function MealsItem({food}){
    const {addToCart} = useCartProvider();
    const {removeItem, isAdmin} = useItemsProvider();
    
    const [showForm, setShowForm] = useState(false);

    const theme = useTheme();

    return (
        <Card sx={{width: "100%", height:"100%", borderRadius: "15px", backgroundColor: theme.palette.white.main}}>
            <Grid container direction="column" justifyContent="space-between">
                <Grid>
                <CardMedia
                image={food.imgURL}
                sx={{height: 225}}
                />
                </Grid>
                <Grid>
            <CardContent>
                <Grid container justifyContent="space-between">
                    <Grid className="food-labels">
                        <Typography variant="h5">{food.itemName}</Typography>
                        <Typography variant="body2">{food.itemDescription}</Typography>
                    </Grid>
                    <Grid className="price">
                        <Typography variant="h6" sx={{
                            '&:before': {
                                content: '"$"'
                            }
                        }}>{food.pricePerUnit.toFixed(2)}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
                </Grid>
            <Grid>
                <CardActions>
                {isAdmin ? 
                (<Grid container justifyContent={"space-between"} sx={{width:"100%"}}>
                    <Grid>
                        <Button size="small" color="error" sx={{margin: {xs: "0 auto", md: "0"}}} onClick={() => {removeItem(food.id)}}>REMOVE ITEM</Button>
                    </Grid>
                    <Grid>
                        <Button size="small" sx={{margin: {xs: "0 auto", md: "0"}}} onClick={() => setShowForm(true)}>EDIT ITEM</Button>
                    </Grid>
                        {showForm && <AdminForm foodItem={food} setShowForm={setShowForm}/>}
                </Grid>)
                : 
                (
                    <>
                        <Button size="small" variant="contained" sx={{margin: {xs: "0 auto", md: "0"}}} onClick={() => addToCart(food)}>ADD TO CART</Button>
                    </>
                
                )
                }
            </CardActions>
            </Grid>
            </Grid>
        
    </Card>
    )
    

}

export default MealsItem;