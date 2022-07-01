import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { MyList, NavbarContainer, NavbarHeader } from '../../styles/navbar'
import SearchIcon from '@mui/icons-material/Search'
import Actions from './actions'
import { useUIContext } from '../context/ui'
import { Link, useNavigate } from 'react-router-dom'
import { IUserType } from '../../redux/features/auth/auth.slice'

type NavbarProps = {
    matches?: boolean
    open?: () => void | undefined
    close?: () => void | undefined
    user: IUserType | null
}

const NavbarDesktop: React.FC<NavbarProps> = ({ user, matches, open, close }): JSX.Element => {
    const { setShowSearchBox } = useUIContext()
    const navigate = useNavigate()
    return (
        <NavbarContainer>
            <NavbarHeader onClick={() => navigate('/')} sx={{cursor: 'pointer'}}>My Shop</NavbarHeader>
            <MyList type='row'>
                <ListItem>
                    <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItemText primary="Home" />
                    </Link>
                </ListItem>
    
                <ListItem>
                    <Link to='/shop' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItemText primary="Products" />
                    </Link>
                </ListItem>

                <ListItem>
                    <Link to='/contact' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItemText primary="Contact" />
                    </Link>
                </ListItem>
                <ListItemButton>
                    <ListItemIcon onClick={() => setShowSearchBox(true)}>
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>
            <Actions user={user} matches={matches} open={open} close={close} />
        </NavbarContainer>
    )
}

export default NavbarDesktop