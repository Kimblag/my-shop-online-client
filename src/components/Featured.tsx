import React from 'react'
import { Container, Title, CardContainer } from '../styles/Featured.styles'
import { featured } from '../data'
import FeaturedProduct from './FeaturedProduct'

const Featured = () => {
    return (
        <Container>
            <Title>Featured Products</Title>
            <CardContainer>
                {featured.map(item => (
                    <FeaturedProduct key={item.id} item={item} />
                ))}
            </CardContainer>
        </Container>
    )
}

export default Featured