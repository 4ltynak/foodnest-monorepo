import { useContext, useEffect, useState } from 'react';
import itemsContext from './items-context';
import { useNavigate } from 'react-router';
import serverAPI from '../api/serverAPI';

export function ItemsProvider({children}){
    const [itemsData, setItemsData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    const apiKey = process.env.REACT_APP_API_KEY;
    const navigate = useNavigate();

    const togglePage = () => {
        setIsAdmin(state => !state);
    }


    const addNewItem = async (itemObj) => {

        if (itemsData.some((item) => item.itemName === itemObj.itemName)){
            setIsAlert(true);
            setAlertMessage("Menu item with this name already exists.");
            return({success: false});
        }

        const newItem = {id: crypto.randomUUID(), ...itemObj};

        try{
            const response = await serverAPI.post("/items", newItem);

            if (response.status === 201) {
                setItemsData(i => [...i, response.data]);
            }

            return {success: true}

        } catch (err) {
            return({success: false});
        }
    }

    
    const updateItem = async (itemObj) => {

        if (itemsData.some(item => item.itemName === itemObj.itemName)){
            setIsAlert(true);
            setAlertMessage("Menu item with this name already exists.");
            return({success: false});
        }

        try {
            await serverAPI.put(`/items/${itemObj.id}`, itemObj);
            
            const updatedItemList = itemsData.map((item) => {
                if (item.id === itemObj.id){
                    return itemObj;
                } else{
                    return item;
                }
            });

            setItemsData(updatedItemList);
            return({success: true});

        } catch (err) {
            setIsAlert(true);
            setAlertMessage("Error editing item. Please try again later.");
            return({success: false});
        }
        
        
    }

    const removeItem = async (itemId) => {
        try{
            await serverAPI.delete(`items/${itemId}`);
            const updatedItemList = itemsData.filter((item) => item.id !== itemId);
            setItemsData(updatedItemList);
        } catch (err){
            setIsAlert(true);
            setAlertMessage("Delete failed. Please try again later.")
        }
        
    }
    

    async function handlePhotoSubmission(file){        
        if (!file) {
            return;
        }

        try {
            const postData = new FormData();
            postData.append("key", apiKey);
            postData.append("image", file);
            
            const response = await fetch(`https://api.imgbb.com/1/upload`, {
                method: "POST",
                body: postData,
            })

            const data = await response.json();
            return data;

        } catch (err) {
            setIsAlert(true);
            setAlertMessage("Upload failed. Please try again later.");
        }
    }   

    const value = {
        isAdmin,
        togglePage,
        addNewItem,
        itemsData,
        removeItem,
        updateItem,
        showForm, setShowForm,
        handlePhotoSubmission,
        isAlert, setIsAlert,
        alertMessage, setAlertMessage

    }

    useEffect(() => {
        async function retrieveItems (){
            const response = await serverAPI.get("/items");
            const items = response.data;
            setItemsData(items);
        }
        retrieveItems();
    }, [])

    useEffect(() => {
        if(isAdmin) {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    }, [isAdmin, navigate]);

    return(
        <itemsContext.Provider value={value}>
            {children}
        </itemsContext.Provider>
    );
}

export function useItemsProvider() {
    return useContext(itemsContext);
}