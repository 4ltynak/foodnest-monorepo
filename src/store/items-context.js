import { createContext } from "react";

const itemsContext = createContext({
    // State
    isAdmin: false,
    showForm: false,
    isAlert: false,
    alertMessage: "",

    //Navigation
    togglePage: () => {},
    setShowForm: (bool) => {},
    setIsAlert: (bool) => {},

    // Data / Actions
    itemsData: [],
    addNewItem: (item) => {},
    removeItem: (id) => {},
    updateItem: (item) => {},
    handlePhotoSubmission: (file) => {}
    
});

export default itemsContext;