import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { MyList, NavbarContainer, NavbarHeader } from '../../styles/navbar'
import SearchIcon from '@mui/icons-material/Search'
import Actions from './actions'

type NavbarProps = {
    matches?: boolean
}

const NavbarDesktop: React.FC<NavbarProps> = ({ matches }): JSX.Element => {

    return (
        <NavbarContainer>
            <NavbarHeader>My Shop</NavbarHeader>
            <MyList type='row'>
                <ListItemText primary="Home" />
                <ListItemText primary="Categories" />
                <ListItemText primary="Products" />
                <ListItemText primary="Contact Us" />
                <ListItemButton>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>
            <Actions matches={matches} />
        </NavbarContainer>
    )
}

export default NavbarDesktop