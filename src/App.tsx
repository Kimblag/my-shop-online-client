import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import theme from './styles/theme'
import { Routes, Route } from "react-router-dom"
import { Alert, ThemeProvider } from '@mui/material'
import { UIContext } from './components/context/ui'
import { Cart } from './redux/interfaces/cart/cart.interface'
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from './redux/hooks';
import CheckoutScreen from './pages/CheckoutScreen';
import Home from './pages/Home'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import ProtectedRoute from './pages/ProtectedRoute'
import Shop from './pages/Shop'
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';

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
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='*' element={<Alert severity='error'>404 NOT FOUND</Alert>} />
        </Routes>
      </UIContext.Provider>
    </ThemeProvider>
  );
}

export default App;
