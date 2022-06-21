import { styled, TextField, Typography } from "@mui/material"
import { Colors } from "../theme"

export const FooterTitle = styled(Typography)(() => ({
    textTransform: 'uppercase',
    marginBottom: '1em',
}))

export const SubscribeTextField = styled(TextField)(() => ({
    '.MuiInputLabel-root': {
        color: Colors.tertiary,
    },
    '.MuiInput-root': {
        color: Colors.secondary,
    },
    '.MuiInput-root::before': {
        borderBottom: `1px solid ${Colors.secondary}`,
    },
}))