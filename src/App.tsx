import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Shop from './pages/Shop'
import { ThemeProvider } from '@mui/material'
import theme from './styles/theme'
import { UIContext } from './components/context/ui'
import { Cart } from './redux/interfaces/cart/cart.interface'
import { ToastContainer } from 'react-toastify';
import CheckoutScreen from './pages/CheckoutScreen';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

const App: React.FC = (): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [cart, setCart] = useState([] as Cart)
  const [showCart, setShowCart] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <UIContext.Provider value={{ showFavorites, setShowFavorites, drawerOpen, setDrawerOpen, showSearchBox, setShowSearchBox, cart, setCart, showCart, setShowCart, }} >
        <ToastContainer toastStyle={{ zIndex: '9999' }} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/checkout' element={<CheckoutScreen />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </UIContext.Provider>
    </ThemeProvider>
  );
}

export default App;
