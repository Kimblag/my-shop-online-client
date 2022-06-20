import { IconButton } from '@mui/material'
import React from 'react'
import { NavbarContainer, NavbarHeader } from '../../styles/navbar'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Actions from './actions'

type NavbarProps = {
  matches?: boolean
}

const NavbarMobile: React.FC<NavbarProps> = ({ matches }): JSX.Element => {
  return (
    <NavbarContainer>
      <IconButton>
        <MenuIcon />
      </IconButton>
      <NavbarHeader textAlign={'center'} variant='h4'>
        My Shop
      </NavbarHeader>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <Actions matches={matches} />
    </NavbarContainer>
  )
}

export default NavbarMobile