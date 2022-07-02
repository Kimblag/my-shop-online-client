import { styled } from "@mui/material/styles"
import { Box } from "@mui/system"
import { Theme } from "@mui/material";


export const Container = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    padding: '20px',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column',
        alignItems: 'center',
    }
}))
