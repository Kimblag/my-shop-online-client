import { createTheme } from "@mui/material/styles"
import { lighten } from "polished"
declare module '@mui/material/styles' {
    interface Components {
        [key: string]: any
    }
}

export const Colors = {
    primary: "#1C1C1C",
    secondary: '#9a8c98',
    tertiary: '#EEF0F2',
    success: "#a4c3b2",
    info: "#00a2ff",
    danger: "#a4161a",
    warning: "#f5cb5c",
    dark: '#0e1b20',
    light: "#FAFAFF",
    muted: '#abafb3',
    border: '#DDDFE1',
    inverse: '#2F3D4A',
    shaft: '#333',
    //grays
    dim_grey: '#696969',
    dove_gray: '#d5d5d5',
    body_bg: "#f3f6f9",
    light_gray: "rgb(230,230,230)",
    //solid
    white: '#fff',
    black: '#000',
}

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            }
        },
        MyShopButton: {
            styleOverrides: {
                root: {
                    color: Colors.white
                },
                primary: {
                    background: Colors.primary,
                    "&:hover": {
                        background: lighten(0.05, Colors.primary),
                    }
                },
                secondary: {
                    background: `${Colors.secondary}`,
                    "&:hover": {
                        background: lighten(0.05, Colors.primary),
                    }
                }
            }
        }
    },
})

export default theme