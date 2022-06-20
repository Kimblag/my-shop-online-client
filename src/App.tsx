import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Shop from './pages/Shop'
import { ThemeProvider } from '@mui/material'
import theme from './styles/theme'

const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
