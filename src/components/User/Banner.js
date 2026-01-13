import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Banner(){

    return(
        <Grid container direction="column" p={2}  alignContent={"center"} justifyContent="center" textAlign={"center"} className="banner-section" 
        sx={{width: "100%", backgroundImage: "url(/img/banner-img.jpg)", backgroundSize: "cover", alignItems: "center"}}>
            <Grid size={12}>
                <Typography variant="h1" color="white" alignSelf={"center"}>FOODNEST</Typography>
            </Grid>
            <Grid size={12}>
                <Typography variant="h2" color="white">Where great food meets great places.</Typography>
            <Grid size={12}>
                <Button variant="contained" color="white" href="#meals">DISCOVER</Button>
            </Grid>            
            </Grid>
        </Grid>
    )
}

export default Banner;