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
import { IUserType } from '../../redux/features/auth/auth.slice'

type ActionsProps = {
  matches?: boolean
  open?: () => void | undefined
  close?: () => void | undefined
  user: IUserType | null
}

const Actions: React.FC<ActionsProps> = ({ matches, open, close, user }): JSX.Element => {
  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop
  const { setShowCart, setShowFavorites } = useUIContext()
  const { cartItems } = useAppSelector(state => state.cart)
  const { favoriteItems } = useAppSelector(state => state.wishlist)
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
        <ListItemButton sx={{ justifyContent: 'center' }} onClick={() => setShowFavorites(true)}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : '' }}>
            <Badge badgeContent={favoriteItems?.data?.length} color="secondary" >
              <FavoriteIcon />
            </Badge>
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem />

        {!user ? (<ListItemButton onClick={open} sx={{ justifyContent: 'center' }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : '' }}>
            <PersonIcon />
          </ListItemIcon>
        </ListItemButton>)
          : (
            <ListItemButton sx={{ display: 'flex', justifyContent: "center", color: matches ? Colors.secondary : '' }} >
              <AccountMenu user={user} />
            </ListItemButton>
          )}
      </MyList>
    </Component>
  )
}

export default Actions