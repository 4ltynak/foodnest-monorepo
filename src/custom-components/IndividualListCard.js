import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import { useCartProvider } from '../store/CartProvider';
import ListItem from '@mui/material/ListItem';

function IndividualListCard({item}){
    const {increaseItemQuantity, decreaseItemQuantity} = useCartProvider();
    
    return(
        <ListItem disableGutters disablePadding>
        <Grid container justifyContent={"space-between"} sx={{width: "100%"}} p={1}>
                                <Grid container direction="column">
                                    <Stack sx={{justifyContent:"space-between", justifyItems: "space-between"}}>
                                        <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>{item.itemName}</Typography>
                                        <Typography variant="subtitle2" sx={{display: "flex", justifyContent:"space-between"}}>
                                            ${item.pricePerUnit.toFixed(2)}
                                            <Box component="span"
                                            sx={{border: "1px solid black", 
                                                borderRadius: "5px", 
                                                width: "30px", 
                                                textAlign: "center", 
                                                marginLeft: "30px",
                                                "&:before": {content: '"x "'}}}>
                                                {item.quantity}
                                            </Box>
                                        </Typography>
                                    </Stack>
                                </Grid>

                                <Grid container sx={{alignItems: "center"}} gap={2} p={1}>
                                    <Grid>
                                        <ListItemButton sx={{border: "1px solid black", borderRadius: "5px", height: "30px"}}
                                        onClick={() => decreaseItemQuantity(item)}>-</ListItemButton>
                                    </Grid>
                                    <Grid>
                                        <ListItemButton sx={{border: "1px solid black", borderRadius: "5px", height: "30px"}}
                                        onClick={() => increaseItemQuantity(item)}>+</ListItemButton>
                                    </Grid>
                                    
                                </Grid> 
                            </Grid>
                            </ListItem>
    )
}

export default IndividualListCard;