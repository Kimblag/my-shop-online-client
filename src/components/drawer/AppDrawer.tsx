import { Divider, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { DrawerCloseButton } from '../../styles/navbar'
import { useUIContext } from '../context/ui'
import CloseIcon from '@mui/icons-material/Close'
import { lighten } from 'polished'
import { Colors } from '../../styles/theme'


const AppDrawer: React.FC = (): JSX.Element => {
  const { drawerOpen, setDrawerOpen } = useUIContext()

  return (
    <>
          {drawerOpen && <DrawerCloseButton onClick={() => setDrawerOpen(false)}><CloseIcon sx={{ fontSize: '2.5rem', color: lighten(0.09, Colors.secondary), }} /></DrawerCloseButton>}

    <Drawer open={drawerOpen}>
      <List>
        <ListItemButton>
          <ListItemText>Home</ListItemText>
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton>
          <ListItemText>Categories</ListItemText>
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton>
          <ListItemText>Products</ListItemText>
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton>
          <ListItemText>About Us</ListItemText>
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton>
          <ListItemText>Contact Us</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
    </>
  )
}

export default AppDrawer