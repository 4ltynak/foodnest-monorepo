import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useCartProvider } from '../../store/CartProvider';
import { useTheme } from '@emotion/react';


function Appbar({showModalHandler}) {
    const {cartItems} = useCartProvider();
    const theme = useTheme();

    return (
        <Grid id="cart-button">
                <AppBar color="transparent" elevation={0} sx={{width: "100%"}}>
                    <Toolbar>
                            <Grid container>
                                <Grid>
                                    <Chip className="cart-chip" icon={<ShoppingCartIcon color="white"/>} sx={{backgroundColor : "#FE6601", "&:hover": {backgroundColor: theme.palette.gray.main}}}
                                    clickable={true}
                                    label={
                                    <Grid container sx={{justifyContent: "space-between", alignItems: "center"}} gap={2}>
                                        <Grid><Typography color="white">Your Cart</Typography></Grid>
                                        <Grid>
                                            <Box sx={{backgroundColor: theme.palette.white.main,
                                                    width: "20px", height: "20px", borderRadius: "50%",
                                                    display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center"}}>
                                                <Typography sx={{color: theme.palette.primary.main}}>{cartItems.length}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    } size="medium"
                                    onClick={showModalHandler}
                                />     
                                </Grid> 
                            </Grid>
                    </Toolbar>
                </AppBar>
            </Grid>
    )
}

export default Appbar;