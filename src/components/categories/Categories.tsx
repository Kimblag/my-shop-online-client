import React from 'react'
import { categories } from '../../data'
import { Container } from '../../styles/Categories.styles'
import CategoryItem from './CategoryItem'

type Props = {
  isLoading: boolean
}
const Categories: React.FC<Props> = ({ isLoading }): JSX.Element => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem isLoading={isLoading} key={item.id} item={item} />
      ))}
    </Container>
  )
}

export default Categories