import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Shop from './pages/Shop'
import { ThemeProvider } from '@mui/material'
import theme from './styles/theme'
import { UIContext } from './components/context/ui'

const App: React.FC = (): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <UIContext.Provider value={{ drawerOpen, setDrawerOpen, showSearchBox, setShowSearchBox }} >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </UIContext.Provider>
    </ThemeProvider>
  );
}

export default App;
