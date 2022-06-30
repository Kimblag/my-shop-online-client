import { Button, ButtonProps, IconButton, Theme } from "@mui/material";
import { Box, styled } from "@mui/material";
import { slideInBottom, slideInRight } from "../../animation";
import { Colors } from "../theme";

export const Product = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        position: 'relative',
    }
}))

export const ProductImage = styled('img')(({ src, theme }: { src?: string, theme?: Theme }) => ({
    src: `url(${src})`,
    width: '100%',
    background: Colors.tertiary,
    padding: '10px',
    [theme!.breakpoints.down('md')]: {
        width: '80%',
        padding: '24px',
    }
}))

export const ProductActionButton = styled(IconButton)(() => ({
    background: Colors.white,
    margin: 4,
}))

export const ProductFavButton = styled(ProductActionButton)(({ isfav, theme }: { isfav: any, theme?: Theme }) => ({
    color: isfav ? Colors.secondary : Colors.primary,
    [theme!.breakpoints.up('md')]: {
        position: 'absolute',
        right: '0',
        top: '0',
    }
}))

interface IProductActionsButton extends ButtonProps {
    show?: true | false
    theme?: Theme
    variant?: 'contained' | 'outlined'
}

export const ProductAddToCart = styled(Button)(({ show, theme }: IProductActionsButton) => ({
    width: '120px',
    fontSize: '12px',
    [theme!.breakpoints.up('md')]: {
        position: 'absolute',
        bottom: '2%',
        width: '300px',
        padding: '10px 5px',
        animation: show ? `${slideInBottom} 0.5s cubic-beizer(0.250, 0.460, 0.450, 0.940)both` : "",
    },
    background: Colors.secondary,
    opacity: 0.9,
}))

export const ProductMetaWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}))

export const ProductActionsWrapper = styled(Box)(({ show, theme }: IProductActionsButton) => ({
    [theme!.breakpoints.up("md")]: {
        display: show ? 'visible' : 'none',
        position: "absolute",
        right: 0,
        top: '20%',
        animation: show && `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    }
}))

export const ProductDetailWrapper = styled(Box)(({theme}) => ({
    display: "flex",
    padding: theme.spacing(4)
}))

export const ProductDetailInfoWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    lineHeight: 1.5,
}))