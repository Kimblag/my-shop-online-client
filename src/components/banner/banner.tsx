import { Typography } from '@mui/material'
import headphones from '../../assets/slider/headphones.png'
import React from 'react'
import { Bannercontainer, BannerContent, BannerDescription, BannerImage, BannerShopButton, BannerTitle } from '../../styles/banner'
import { Colors } from '../../styles/theme'
import { useNavigate } from 'react-router-dom'

const Banner: React.FC = (): JSX.Element => {
    const navigate = useNavigate()

    

    return (
        <Bannercontainer>
            <BannerImage src={headphones} />
            <BannerContent>
                <Typography variant='h6' color={Colors.secondary}>
                    Collection
                </Typography>
                <BannerTitle variant='h2'>
                Sounds like the perfect deal
                </BannerTitle>
                <BannerDescription variant='subtitle1'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ipsam reiciendis commodi pariatur ducimus impedit error fugit dolores sed quisquam, 
                    reprehenderit amet deleniti vitae quaerat animi dolorum provident eveniet qui! Itaque.
                </BannerDescription>
                <BannerShopButton onClick={() => navigate('/shop')} color='secondary'>Show Now</BannerShopButton>
            </BannerContent>
        </Bannercontainer>
    )
}

export default Banner