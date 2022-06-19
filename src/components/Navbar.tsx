import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Wrapper, Left, Center, Right, SearchContainer, Input, Logo, MenuItem } from '../styles/Navbar.styles'
import { BsSearch } from 'react-icons/bs'
import { ShoppingCart } from '@mui/icons-material'
import { Badge } from '@mui/material'



const Navbar: React.FC = (): JSX.Element => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input />
                        <BsSearch style={{ color: 'grey', fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{textDecoration: "none", color: "black" }}>
                        <Logo>
                            My Shop Online
                        </Logo>
                    </Link>
                </Center>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Signin</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCart />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar