import React from 'react'
import { Badge, Divider, ListItemButton, ListItemIcon } from '@mui/material'
import { MyList, ActionIconsContainerDesktop, ActionIconsContainerMobile } from '../../styles/navbar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Colors } from '../../styles/theme'
import { useUIContext } from '../context/ui'
import { useAppSelector } from '../../redux/hooks'
import AccountMenu from './AccountMenu'

type ActionsProps = {
  matches?: boolean
  open: () => void
  close: () => void
}

const Actions: React.FC<ActionsProps> = ({ matches, open, close }): JSX.Element => {
  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop
  const { setShowCart } = useUIContext()
  const { cartItems } = useAppSelector(state => state.cart)
  const { response } = useAppSelector(state => state.auth)


  return (
    <Component>
      <MyList type='row'>
        <ListItemButton sx={{ justifyContent: 'center' }} onClick={() => setShowCart(true)}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : '' }}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem />
        <ListItemButton sx={{ justifyContent: 'center' }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : '' }}>
            <FavoriteIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem />

        {/* // TODO: CREATE AN USERSLICE TO STORE USER DATA AND GET USER INFO FROM BACKEND */}
        { (<ListItemButton onClick={open} sx={{ justifyContent: 'center' }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : '' }}>
            <PersonIcon />
          </ListItemIcon>
        </ListItemButton>)}
      </MyList>
    </Component>
  )
}

export default Actions