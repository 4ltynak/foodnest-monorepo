import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SwapIcon from '../img/SwapIcon';
import { useItemsProvider } from '../store/ItemsProvider';
import { useTheme } from '@emotion/react';

function Footer() {
    const {togglePage} = useItemsProvider();
    const theme = useTheme();

    return(
        <Grid container direction="column" size={12} gap={5}
            justifyContent="center" alignContent="center" justifyItems="center"
            sx={{height: "30vh", backgroundColor: theme.palette.primary.main, mt: "auto", alignItems: "center"}}>
            <Grid>
                <SwapIcon color={"white"} size={"150px"}/>
            </Grid>
            <Grid>
                <Button variant="contained" sx={{alignItems: "center"}} color="white" onClick={togglePage}>Switch Page</Button>
            </Grid>
        </Grid>

    );
}

export default Footer;