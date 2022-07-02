import React from 'react'
import { useNavigate } from 'react-router-dom'
import { filteredProducts } from '../../redux/features/products/products.slice'
import { useAppDispatch } from '../../redux/hooks'
import { Container } from '../../styles/category/CategoryItem.styles'
import {Image, Info, Title, Button} from '../../styles/category/categoryItems.styled.styles'
type Props = {
    item: {
        id: number,
        img: string,
        title: string
        filter: {
            brand: string,
            category: string,
            order: string
        }
    }
    isLoading: boolean
}

const CategoryItem: React.FC<Props> = ({ item, isLoading }): JSX.Element => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button onClick={() => {
                    navigate('/shop')
                    setTimeout(() => {
                     !isLoading && dispatch(filteredProducts(item.filter))
                    }, 2200)
                }}>Shop Now</Button>
            </Info>
        </Container>
    )
}

export default CategoryItem