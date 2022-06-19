import React from 'react'
import { categories } from '../data'
import { Container } from '../styles/Categories.styles'
import CategoryItem from './CategoryItem'

const Categories: React.FC = (): JSX.Element => {
  return (
    <Container>
        {categories.map((item) =>(
            <CategoryItem key={item.id} item={item} />
        ))}
    </Container>
  )
}

export default Categories