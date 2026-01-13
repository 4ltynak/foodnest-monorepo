import Typography from '@mui/material/Typography';
import React from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';

function Sidebar({currentTab, updateTab}) {
    const theme = useTheme();

    return(
        <Grid sx={{ backgroundColor:theme.palette.white.main, height: "100%", flexGrow: 1}} >
            <Typography variant="h5" textAlign="center" p={2}>Dashboard</Typography>
            <Stack>
                <List>
                    <ListItem disablePadding sx={{backgroundColor: currentTab === "menu" && theme.palette.background.main}}>
                        <ListItemButton onClick={() => updateTab("menu")}>
                            <ListItemIcon>
                                <RestaurantMenuIcon />
                            </ListItemIcon>
                            <ListItemText primary="Food Menu"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{backgroundColor: currentTab === "orders" && theme.palette.background.main}}>
                        <ListItemButton onClick={() => updateTab("orders")}>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Orders"/>
                        </ListItemButton>
                    </ListItem>
                    
                </List>
            </Stack>
        </Grid>
    );
}

export default Sidebar;