import { IconButton } from '@mui/material'
import React from 'react'
import { NavbarContainer, NavbarHeader } from '../../styles/navbar'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Actions from './actions'
import { useUIContext } from '../context/ui'
import { IUserType } from '../../redux/features/auth/auth.slice'
import { useNavigate } from 'react-router-dom'

type NavbarProps = {
  matches?: boolean
  open?: () => void | undefined
  close?: () => void | undefined
  user: IUserType | null
}

const NavbarMobile: React.FC<NavbarProps> = ({ user, matches, open, close }): JSX.Element => {
  const { setDrawerOpen, setShowSearchBox } = useUIContext()
  const navigate = useNavigate()
  return (
    <NavbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)} >
        <MenuIcon />
      </IconButton>
      <NavbarHeader onClick={() => navigate('/')} sx={{cursor: 'pointer'}} textAlign={'center'} variant='h4'>
        My Shop
      </NavbarHeader>
      <IconButton onClick={() => setShowSearchBox(true)}>
        <SearchIcon />
      </IconButton>
      <Actions user={user} matches={matches} open={open} close={close} />
    </NavbarContainer>
  )
}

export default NavbarMobile