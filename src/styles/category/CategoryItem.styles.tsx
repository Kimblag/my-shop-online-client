// import styled from 'styled-components'
import { styled } from "@mui/material/styles"
import { Box } from "@mui/system"
import { Theme } from "@mui/material";

export const Container = styled(Box)(({ theme }: { theme: Theme }) => ({
    flex: 1,
    margin: '3px',
    height: '50vh',
    position: 'relative',
    [theme.breakpoints.down("md")]: {
        height: '10vh',
    }
}))

