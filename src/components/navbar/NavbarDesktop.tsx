import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { MyList, NavbarContainer, NavbarHeader } from '../../styles/navbar'
import SearchIcon from '@mui/icons-material/Search'
import Actions from './actions'
import { useUIContext } from '../context/ui'
import { Link } from 'react-router-dom'

type NavbarProps = {
    matches?: boolean
    open: () => void
    close: () => void
}

const NavbarDesktop: React.FC<NavbarProps> = ({ matches, open, close }): JSX.Element => {
    const { setShowSearchBox } = useUIContext()
    return (
        <NavbarContainer>
            <NavbarHeader>My Shop</NavbarHeader>
            <MyList type='row'>
                <ListItem>
                    <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItemText primary="Home" />
                    </Link>
                </ListItem>
                <ListItem>

                    <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItemText primary="Categories" />
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
            <Actions matches={matches} open={open} close={close} />
        </NavbarContainer>
    )
}

export default NavbarDesktop