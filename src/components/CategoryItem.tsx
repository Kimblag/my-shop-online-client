import React from 'react'
import { Container, Image, Info, Title, Button } from '../styles/CategoryItem.styles'

type Props = {
    item: {
        id: number,
        img: string,
        title: string
    }
}

const CategoryItem: React.FC<Props> = ({ item }): JSX.Element => {
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button>Shop Now</Button>
            </Info>
        </Container>
    )
}

export default CategoryItem