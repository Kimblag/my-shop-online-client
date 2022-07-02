import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from '../../styles/products'
import FavoriteIcon from "@mui/icons-material/Favorite"
import FitScreenIcon from "@mui/icons-material/FitScreen"
// import ShareIcon from "@mui/icons-material/Share"
import ProductMeta from './ProductMeta'
import { useDialogModal } from '../../hooks/useDialogModal'
import ProductDetail from '../productDetail/ProductDetail'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ProductDocument } from '../../redux/interfaces/products/product.interface'
import { addToCart, getTotal, removeFromCart } from '../../redux/features/cart/cart.slice'
import { useEffect } from 'react'
import { addProductFavorites, getUserFavorites, removeProductFavorites } from '../../redux/features/favorites/favorites.slice'
import { toast } from 'react-toastify'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

type Props = {
    product: ProductDocument
    matches?: boolean
}

const SingleProductDesktop: React.FC<Props> = ({ product, matches }): JSX.Element => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const handleMouseEnter = () => setShowOptions(true)
    const handleMouseLeave = () => setShowOptions(false)
    const { open, toggle } = useDialogModal()
    const dispatch = useAppDispatch()
    const { cartItems } = useAppSelector(state => state.cart)
    const addToCartText = cartItems.findIndex(item => item._id === product._id) >= 0 ? 'Remove from cart' : 'Add to cart'
    const { user, responseEncode } = useAppSelector(state => state.auth)
    const { favoriteItems } = useAppSelector(state => state.wishlist)
    const [local, setLocal] = useState(false);


    useEffect(() => {
        dispatch(getTotal())
    }, [dispatch])

    useEffect(() => {
        if (favorites.length !== 0 && favorites.includes(product._id)) {
            setLocal(true);
        } else {
            setLocal(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product._id]);

    const handleAddProduct = (product: ProductDocument) => {
        dispatch(addToCart(product))
        dispatch(getTotal())
    }
    const handleRemoveProduct = (product: ProductDocument) => {
        dispatch(removeFromCart(product))
        dispatch(getTotal())
    }
    let favorites: Array<string> = []
    let userId = user?.data?.id

    if (user?.data) {
        if (favoriteItems?.data !== undefined && favoriteItems?.data !== null) {
            favoriteItems?.data.forEach(product => favorites.push(product.favorites._id))
        }
    }

    const handleWishList = (e: { preventDefault: () => void }) => {
        if (!user?.data?.id) {
            e.preventDefault()
            toast.warn('You need to be registered', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (user?.data?.id) {
            if (favorites.length !== 0 && favorites.includes(product._id)) {
                e.preventDefault()
                //TODO agregar delete action
                let findId = favoriteItems?.data?.find(ele => ele.favorites._id === product._id)
                dispatch(removeProductFavorites({productId: findId?._id as string, token: responseEncode as string}))
                setTimeout(() => {
                    dispatch(getUserFavorites({userId: userId as string, token: responseEncode as string}))
                }, 800)
                setLocal(false)
            } else {
                e.preventDefault()
                dispatch(addProductFavorites({ userId, product, token: responseEncode as string }))
                setTimeout(() => {
                    dispatch(getUserFavorites({userId, token: responseEncode as string}))
                }, 800)
                setLocal(true)
            }
        }
    }


    return (
        <>
            <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProductImage sx={{cursor: 'pointer'}} onClick={toggle} src={product.image} alt={product.name} />
                {local === false
                    ? (
                        <ProductFavButton onClick={(e) => handleWishList(e)} isfav={1}>
                            <FavoriteOutlinedIcon />
                        </ProductFavButton>)
                    : (
                        <ProductFavButton onClick={(e) => handleWishList(e)} isfav={0}>
                            <FavoriteIcon />
                        </ProductFavButton>
                    )
                }
                {
                    (showOptions) && <ProductAddToCart onClick={() => addToCartText === 'Add to cart' ? handleAddProduct(product) : handleRemoveProduct(product)} show={showOptions} variant="contained">
                        {addToCartText}
                    </ProductAddToCart>
                }
                <ProductActionsWrapper show={showOptions}>
                    <Stack direction='column'>
                        {/* <ProductActionButton>
                            <ShareIcon />
                        </ProductActionButton> */}
                        <ProductActionButton onClick={toggle}>
                            <FitScreenIcon />
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductMeta product={product} matches={matches} />
            <ProductDetail local={local} userId={userId} favorites={favorites} handleWishList={handleWishList} open={open} onClose={toggle} product={product} />

        </>
    )
}

export default SingleProductDesktop