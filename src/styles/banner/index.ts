import { Button, Theme, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Colors } from "../theme";

export const Bannercontainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0px 0px',
    background: Colors.primary,
    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column',
        alignItems: 'center',
    }
}))

export const BannerImage = styled('img')(({ src, theme }: { src: string, theme?: Theme }) => ({
    src: `url(${src})`,
    width: '500px',
    [theme!.breakpoints.down("md")]: {
        width: '350px',
        height: 'auto'
    },
    [theme!.breakpoints.down("sm")]: {
        width: '320px',
        height: 'auto',
    }
}))

export const BannerContent = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 420,
    padding: '30px',
}))

export const BannerTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
    lineHeight: '1.5',
    fontSize: '60px',
    marginBottom: '20px',
    color: Colors.secondary,
    [theme.breakpoints.down("sm")]: {
        fontSize: '42px',
    }
}))

export const BannerDescription = styled(Typography)(({ theme }: { theme: Theme }) => ({
    lineHeight: '1.25',
    letterSpacing: '1.25',
    marginBottom: '3em',
    color: Colors.secondary,
    [theme.breakpoints.down("sm")]: {
        lineHeight: '1.15',
        letterSpacing: '1.15',
        marginBottom: '1.5em',
    }
}))

export const BannerShopButton = styled(Button, {
    // Configure which props should be forwarded on DOM
    shouldForwardProp: (prop) => prop !== "color",
    name: "MyShopButton",
    slot: "Root",
    // We are specifying here how the styleOverrides are being applied based on props
    overridesResolver: (props, styles) => [
        styles.root,
        props.color === "primary" && styles.primary,
        props.color === "secondary" && styles.secondary,
    ],
})(({ theme }: { theme: Theme }) => ({
    padding: "20px",
    color: Colors.white,
    fontWeight: "bold",
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
        padding: "10px",
        fontSize: "14px",
    },
}));