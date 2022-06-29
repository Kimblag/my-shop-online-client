import { Button, NativeSelect, useMediaQuery, useTheme } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { filteredProducts, getProducts, orderedProducts } from '../../redux/features/products/products.slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ProductDocument } from '../../redux/interfaces/products/product.interface'

type Props = {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Filters: React.FC<Props> = ({ setCurrentPage }): JSX.Element => {
    const { brand, category, order } = useAppSelector(state => state.products.filter)
    const { products } = useAppSelector(state => state.products)
    const [showFilters, setShowFilters] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    let brands: string[] = []
    let categories: string[] = []
    const uniqueBrands = (allProducts: ProductDocument[]) => {
        allProducts?.forEach((product: ProductDocument) => {
            if (!brands.includes(product?.brand)) brands.push(product?.brand);
        })
    }
    const uniqueCategories = (allProducts: ProductDocument[]) => {
        allProducts?.forEach((product: ProductDocument) => {
            if (!categories.includes(product?.category)) categories.push(product?.category);
        })
    }
    uniqueBrands(products)
    uniqueCategories(products)

    const handleFilter = (filters: { brand: string; category: string; order: string }) => {
        dispatch(filteredProducts(filters))
        setCurrentPage(1);
    };

    function handleSelectChange(e: any) {
        e.preventDefault();
        if (e.target.name === "brand") {
            handleFilter({ brand: e.target.value, category: category, order: order });
        }
        if (e.target.name === "category") {
            handleFilter({ brand: brand, category: e.target.value, order: order });
        }
    }
    function handleOrdered(e: any) {
        e.preventDefault();
        setCurrentPage(1)
        dispatch(orderedProducts(e.target.value))
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: matches ? 'flex-end' : '', justifyContent: 'flex-end', marginTop: '5px', marginBottom: '5px' }}>
            <section style={{ display: 'flex', flexDirection: 'row' }}>
                <Button sx={{ mr: 3 }}
                    variant="contained"
                    color="secondary" onClick={() => setShowFilters(!showFilters)}>
                    Filters
                </Button>
                <Button
                    variant="contained"
                    color="secondary" onClick={() => {
                        dispatch(getProducts(null))
                        setCurrentPage(1)
                    }}>
                    Reset Filters
                </Button>
            </section>
            {showFilters ? (
                <section style={{ display: 'flex', flexDirection: 'row' }}>
                    <NativeSelect
                        style={{ margin: '5px', width: matches ? '30%' : '15%' }}
                        id="brand"
                        value={brand}
                        name='brand'
                        onChange={handleSelectChange}
                    >
                        <option value="AllBrands">Brand</option>
                        {brands?.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                        ))}
                    </NativeSelect>

                    <NativeSelect
                        style={{ margin: '5px', width: matches ? '30%' : '20%' }}
                        id="category"
                        value={category}
                        name='category'
                        onChange={handleSelectChange}
                    >
                        <option value="AllCategories">Categories</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </NativeSelect>

                    <NativeSelect
                        style={{ margin: '5px', width: matches ? '30%' : '20%' }}
                        id="order"
                        value={order}
                        name={order}
                        onChange={handleOrdered}
                    >
                        <option value="All">Sort</option>
                        <option value="High">High Price</option>
                        <option value="Lower">Lower Price</option>
                    </NativeSelect>
                </section>
            )
                : null
            }

        </Container>
    )
}

export default Filters