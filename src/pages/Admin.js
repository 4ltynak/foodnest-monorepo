import React, {useState} from "react";
import Sidebar from "../components/Admin/Sidebar";
import Main from "../components/Admin/Main";
import Grid from "@mui/material/Grid";
import AdminAlert from "../components/Admin/AdminAlert";
import Box from "@mui/material/Box";
import Footer from "../components/Footer";

function Admin() {
    const [activeTab, setActiveTab] = useState("menu");

    function updateTab(view){
        setActiveTab(view);
    }

    return (
            <Grid container sx={{minHeight: "100vh"}}>
                <Grid size={3}>
                    <Sidebar currentTab={activeTab} updateTab={updateTab}/>
                </Grid>
                <Grid size={9}>
                    <Box sx={{flexGrow: 1}}>
                        <Main currentTab={activeTab}/>
                    </Box>
                </Grid>
                <Grid size={12}>
                    <Footer/>
                </Grid>
                <AdminAlert />
            </Grid>
    )

}

export default Admin;