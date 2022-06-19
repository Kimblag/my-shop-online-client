import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Shop from './pages/Shop'

const App: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={<Shop />} />

    </Routes>
  );
}

export default App;
