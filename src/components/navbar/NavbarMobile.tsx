import { IconButton } from '@mui/material'
import React from 'react'
import { NavbarContainer, NavbarHeader } from '../../styles/navbar'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Actions from './actions'
import { useUIContext } from '../context/ui'

type NavbarProps = {
  matches?: boolean
  open: () => void
  close: () => void
}

const NavbarMobile: React.FC<NavbarProps> = ({ matches, open, close }): JSX.Element => {
  const { setDrawerOpen, setShowSearchBox } = useUIContext()
  return (
    <NavbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)} >
        <MenuIcon />
      </IconButton>
      <NavbarHeader textAlign={'center'} variant='h4'>
        My Shop
      </NavbarHeader>
      <IconButton onClick={() => setShowSearchBox(true)}>
        <SearchIcon />
      </IconButton>
      <Actions matches={matches} open={open} close={close} />
    </NavbarContainer>
  )
}

export default NavbarMobile