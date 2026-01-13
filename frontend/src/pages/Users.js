import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Cart from '../components/User/Cart';
import Meals from '../components/Meals';
import Banner from '../components/User/Banner';
import AboutUs from '../components/User/AboutUs';
import Footer from '../components/Footer';
import CartAlert from '../components/User/CartAlert';
import Appbar from '../components/User/Appbar';

function Users () {
    const [showModal, setShowModal] = useState(false);

    function showModalHandler() {
        setShowModal(true);
    }

    function closeModalHandler(){
        setShowModal(false);
    }
    
    return (
    <>
    <Grid container sx={{minHeight: "100vh", width: "100%"}}>
        {/*Cart Floating Button */}
            <Appbar showModalHandler={showModalHandler}/>
            {showModal && <Cart closeModalHandler={closeModalHandler}/>}
                <Banner/>
                <AboutUs id="about-us"/>
                <Meals id="meals"/>
                <CartAlert />
            <Footer id="footer"/>
    </Grid>
    </>
    )
}

export default Users;
