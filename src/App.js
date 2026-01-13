import './App.css';
import Users from './pages/Users';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Admin from './pages/Admin';
import {CartProvider} from './store/CartProvider';
import { ItemsProvider, useItemsProvider } from './store/ItemsProvider';

function App() {
  const theme = createTheme({
        palette: {
            primary: {
                main: "#060606"
            },
            secondary: {
                main: "#4B4C51"
            },
            background: {
                main: "#E7E7E7"
            },
            white: {
                main: "#F3F3F3"
            },
            gray: {
                main: "#BCBCBE"
            }
        }
    });

  const {isAdmin} = useItemsProvider();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ItemsProvider>
            <Routes>
            <Route exact path="/" element={<Navigate replace to={isAdmin ? "/admin" : "/user"}/>}/>
            <Route path="/user" element={<Users/>} />
            <Route path="/admin" element={<Admin/>} />
            </Routes>
          </ItemsProvider>
      </CartProvider>
    </ThemeProvider>
    </BrowserRouter>
    

  );
}

export default App;