import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


function AboutUs(){
    return(
        <Grid direction="column">
        <Typography variant="h3" p={2} textAlign="center" mt={3}>Food for the Soul, Taste for Life</Typography>
        <Grid container className="about-container" p={3}>
            <Grid container size={8} direction="column" justifyContent={"space-between"} p={2}>
                <Grid size={12}>
                    <Typography variant="h4">A Taste You'll Remember</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend mattis justo, 
                        ut consequat dolor vulputate quis. Aliquam quis tincidunt ligula, at mollis neque. Praesent. 
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="h4">Meals That Spark Joy</Typography>
                    <Typography cariant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend mattis justo, 
                        ut consequat dolor vulputate quis. Aliquam quis tincidunt ligula, at mollis neque. Praesent. 
                    </Typography>
                </Grid> 
            </Grid>
            <Grid size={4} sx={{height: "100%"}}>
                <ImageList sx={{width:"100%"}} variant="quilted" cols={4} rowHeight={120}>
                    <ImageListItem cols={2} rows={2}><img src="/img/barbecue.jpg" alt="barbecue"/></ImageListItem>
                    <ImageListItem cols={2}><img src="/img/tomato-soup.jpg" alt="tomato soup"/></ImageListItem>
                    <ImageListItem cols={2}><img src="/img/grilled-kebabs.jpg" alt="grilled kebabs"/></ImageListItem>
                </ImageList>
            </Grid>
            
        </Grid>
        </Grid>
    );
}

export default AboutUs;