import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import NumberField from './custom-components/NumberField';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useItemsProvider } from '../../store/ItemsProvider';
import Paper from '@mui/material/Paper';
import { createPortal } from 'react-dom';

function AdminForm({foodItem={}, setShowForm}) {
    
    // if no food item is passed, means its a new object
    const [formData, setFormData] = useState(Object.keys(foodItem).length === 0 ? {itemName: "", itemDescription: "", pricePerUnit: "", imgURL: ""} : foodItem);
    const {addNewItem, updateItem, setIsAlert, setAlertMessage} = useItemsProvider();

    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // set form mode
    const mode = Object.keys(foodItem).length === 0 ? "new" : "edit";

    function handleNameChange(e){
        setFormData(f => ({...f, itemName: e.target.value}));
    }

    function handleDescriptionChange(e){
        setFormData(f => ({...f, itemDescription: e.target.value}));
    }

    function handlePriceChange(e){
        setFormData(f => ({...f, pricePerUnit: parseFloat(e.target.value)}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();    

        if (mode === "edit") {
            try{
                await updateItem(formData);
                setShowForm(false);
            } catch (err) {
                setIsAlert("Error editing item. Please try again later");
            }
            
            
        } else {
            const result = await addNewItem(formData);
            
            if (result.success) {
                setShowForm(false);
            }
            
        }
        
    }   

    async function handlePhotoSubmission(file){

        if (!file) {
            return;
        }

        try {
            setIsLoading(true);
            const postData = new FormData();
            postData.append("key", process.env.REACT_APP_API_KEY);
            postData.append("image", file);
            
            const response = await fetch(`https://api.imgbb.com/1/upload`, {
                method: "POST",
                body: postData,
            })

            const data = await response.json();
            setFormData(f => ({...f, imgURL: data.data.url}));

        } catch (error) {
            setAlertMessage("Upload failed. Please try again.");
        } finally {
            setIsLoading(false);
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
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: 1000
            }}
            >
            <Paper component="form" sx={{display: "flex", flexDirection: "column", gap:"10px", padding: 3, maxWidth: "50%", margin: "0 auto",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000

            }} onSubmit={handleSubmit}>
            <TextField required id="name" label="Food Name" variant="outlined"
                value={formData.itemName}
                onChange={handleNameChange}/>
            <TextField required id="description" label="Description" variant="outlined" 
                value={formData.itemDescription}
                onChange={handleDescriptionChange}/>
            <NumberField required label="Price" variant="outlined"
                value={formData.pricePerUnit}
                onChange={handlePriceChange}
                decimalScale={2}
                helperText="Floats or numbers only."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                slotProps={{formHelperText: { sx: {visibility: isFocused ? "visible" : "hidden"}}}}
                />
            <Input type="file" accept="image/*" name="item-image"
                onChange={(e) => handlePhotoSubmission(e.target.files[0])}/>
            <Grid container justifyContent="space-between">
                <Grid size={5}>
                    <Button type="submit" variant="contained" sx={{width: "100%"}} disabled={isLoading ? true : false}>{
                        mode === "new" ? "Add" : "Update"}</Button>
                </Grid>
                <Grid size={5}>
                    <Button variant="outlined" sx={{width: "100%"}} onClick={() => setShowForm(false)}>Cancel</Button>
                </Grid>
            </Grid>
            {isLoading && <LinearProgress />}
            </Paper>
        </Box>
        
    )


    return (
        createPortal(portalContent, document.body)
    );
}

export default AdminForm;