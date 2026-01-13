import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MealsItem from '../components/MealsItem';
import { useItemsProvider } from '../store/ItemsProvider';

function Meals(props){
    const {itemsData} = useItemsProvider();

    return (
        <Grid p={2} sx={{flexGrow: 1}} id={props.id}> 
            <Typography textAlign="center" variant="h3">Available Foods</Typography>
            <Grid container size={12} gap={4} p={3} sx={{flexGrow: 1}} justifyContent={"space-evenly"}>
                {
                    itemsData.map((foodItem) => {
                        return( 
                        <Grid size={{xs: 12, md: 3}} key={foodItem.itemName}>
                            <MealsItem food={foodItem}/>
                        </Grid>)
                    })
                }
            </Grid>
        </Grid>
        
    );
}

export default Meals;