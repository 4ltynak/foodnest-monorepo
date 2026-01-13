import AdminMenuView from './AdminMenuView';
import AdminOrdersView from './AdminOrdersView';

function Main({currentTab}){
    const renderView = () => {
        switch (currentTab){
            case "menu":
                return <AdminMenuView />
            case "orders":
                return <AdminOrdersView />
            default:
                return <AdminMenuView />
        }
    }

    return (
        <>
        {renderView()}
        </>
    );
}

export default Main;