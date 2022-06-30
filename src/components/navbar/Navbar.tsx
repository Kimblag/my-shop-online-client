import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { IUserType } from '../../redux/features/auth/auth.slice'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

type Props = {
  open?: () => void | undefined
  close?: () => void | undefined
  user: IUserType | null
}
const Navbar: React.FC<Props> = ({ open, close, user }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {matches ? <NavbarMobile user={user} matches={matches} open={open} close={close} /> : <NavbarDesktop user={user} matches={matches} open={open} close={close} />}
    </>
  )
}

export default Navbar