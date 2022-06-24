import React from 'react'
import { Divider, ListItemButton, ListItemIcon } from '@mui/material'
import { MyList, ActionIconsContainerDesktop, ActionIconsContainerMobile } from '../../styles/navbar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Colors } from '../../styles/theme'
import { useUIContext } from '../context/ui'

type ActionsProps = {
  matches?: boolean
}

const Actions: React.FC<ActionsProps> = ({ matches }): JSX.Element => {
  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop
  const { setShowCart } = useUIContext()

  return (
    <Component>
      <MyList type='row'>
        <ListItemButton sx={{ justifyContent: 'center' }} onClick={() => setShowCart(true)}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : '' }}>
            <ShoppingCartIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem />
        <ListItemButton sx={{ justifyContent: 'center' }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : ''  }}>
            <FavoriteIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem />
        <ListItemButton sx={{ justifyContent: 'center' }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : ''  }}>
            <PersonIcon />
          </ListItemIcon>
        </ListItemButton>
      </MyList>
    </Component>
  )
}

export default Actions