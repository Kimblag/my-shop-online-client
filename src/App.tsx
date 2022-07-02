import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Shop from './pages/Shop'
import { Alert, ThemeProvider } from '@mui/material'
import theme from './styles/theme'
import { UIContext } from './components/context/ui'
import { Cart } from './redux/interfaces/cart/cart.interface'
import { ToastContainer } from 'react-toastify';
import CheckoutScreen from './pages/CheckoutScreen';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import { useAppSelector } from './redux/hooks';
import ProtectedRoute from './pages/ProtectedRoute';

const App: React.FC = (): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [cart, setCart] = useState([] as Cart)
  const [showCart, setShowCart] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (user !== null) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [user])

  console.log(isAuth)
  return (
    <ThemeProvider theme={theme}>
      <UIContext.Provider value={{ showFavorites, setShowFavorites, drawerOpen, setDrawerOpen, showSearchBox, setShowSearchBox, cart, setCart, showCart, setShowCart, }} >
        <ToastContainer toastStyle={{ zIndex: '9999' }} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/profile' element={
            <ProtectedRoute isAuth={isAuth}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/orders' element={
            <ProtectedRoute isAuth={isAuth}>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path='/checkout' element={
            <ProtectedRoute isAuth={isAuth}>
              <CheckoutScreen />
            </ProtectedRoute>
          } />
          <Route path='*' element={<Alert severity='error'>404 NOT FOUND</Alert>} />
        </Routes>
      </UIContext.Provider>
    </ThemeProvider>
  );
}

export default App;
