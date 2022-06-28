import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

type Props = {
  open: () => void
  close: () => void
}
const Navbar: React.FC<Props> = ({ open, close }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {matches ? <NavbarMobile matches={matches} open={open} close={close} /> : <NavbarDesktop matches={matches} open={open} close={close} />}
    </>
  )
}

export default Navbar