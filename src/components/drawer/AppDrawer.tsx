import { Divider, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { DrawerCloseButton } from '../../styles/navbar'
import { useUIContext } from '../context/ui'
import CloseIcon from '@mui/icons-material/Close'
import { lighten } from 'polished'
import { Colors } from '../../styles/theme'
import { Link } from 'react-router-dom'


const AppDrawer: React.FC = (): JSX.Element => {
  const { drawerOpen, setDrawerOpen } = useUIContext()

  return (
    <>
      {drawerOpen && <DrawerCloseButton onClick={() => setDrawerOpen(false)}><CloseIcon sx={{ fontSize: '2.5rem', color: lighten(0.09, Colors.secondary), }} /></DrawerCloseButton>}

      <Drawer open={drawerOpen}>
        <List sx={{mt: 5}}>
          <Link onClick={() => setDrawerOpen(false)} to='/' style={{ textDecoration: 'none', color: "inherit" }}>
            <ListItemButton>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </Link>
          <Divider variant="middle" />
          <Link onClick={() => setDrawerOpen(false)} to='/shop' style={{ textDecoration: 'none', color: "inherit" }}>
            <ListItemButton>
              <ListItemText>Products</ListItemText>
            </ListItemButton>
          </Link>
          <Divider variant="middle" />
          <Link onClick={() => setDrawerOpen(false)} to='/about' style={{ textDecoration: 'none', color: "inherit" }}>
            <ListItemButton>
              <ListItemText>About Us</ListItemText>
            </ListItemButton>
          </Link>
          <Divider variant="middle" />
          <Link onClick={() => setDrawerOpen(false)} to='/contact' style={{ textDecoration: 'none', color: "inherit" }}>
            <ListItemButton>
              <ListItemText>Contact Us</ListItemText>
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
    </>
  )
}

export default AppDrawer