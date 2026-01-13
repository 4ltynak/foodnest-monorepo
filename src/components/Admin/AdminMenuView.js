import React from 'react';
import Button from '@mui/material/Button';
import Meals from '../Meals';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import AdminForm from './AdminForm';
import { useItemsProvider } from '../../store/ItemsProvider';

function AdminMenuView(){
    const {showForm, setShowForm} = useItemsProvider();

    const theme = useTheme();

    return(
        <>
        <Grid container direction="column" sx={{backgroundColor: theme.palette.background.main, minHeight: "70vh"}} >
            <Grid>
                <Meals />
            </Grid>
            <Grid alignSelf="center" p={2}>
                {showForm ? 
                    <AdminForm setShowForm={setShowForm}/>
                    : <Button variant="contained" onClick={() => {setShowForm(true)}}>Add Food Item</Button>
                }
            </Grid>
        </Grid>
        </>
        
    );

}


export default AdminMenuView;