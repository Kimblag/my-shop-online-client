import { Theme, Typography } from "@mui/material"
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Colors } from "../theme"


export const PromotionsContainer = styled(Box)(({theme}: {theme: Theme}) =>({
    [theme.breakpoints.down("md")]: {
        padding: '40px 0px 40px 0px',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
    overflow: 'hidden',
    backgroundColor: Colors.secondary,
}))

export const MessageText = styled(Typography)(({theme}: {theme: Theme}) =>({
    fontFamily: "'Montez', 'cursive'",
    [theme.breakpoints.down("md")]: {
        fontSize: '3rem',
    },
    color: Colors.white,
    fontSize: '2.5rem',
}))