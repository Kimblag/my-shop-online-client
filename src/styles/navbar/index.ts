import { Box, IconButton, List, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Colors } from "../theme"
import '@fontsource/montez'
import { rgba } from "polished";

export const NavbarContainer = styled(Box)(() => ({
    display: "flex",
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: '2px 8px',
    position: 'sticky',
    top: '0px',
    zIndex: 3,
    background: rgba(238,240,242,0.8)
}));


export const NavbarHeader = styled(Typography)(() => ({
    padding: '5px',
    flexGrow: 1,
    fontSize: '3.2em',
    fontFamily: '"Montez", "cursive"',
    color: Colors.secondary,
}))


export const MyList = styled(List)(({type}: {type: string}) =>({
    display: type === 'row' ? 'flex' : 'block',
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center',
}))

export const ActionIconsContainerDesktop = styled(Box)(() => ({
    flexGrow: 0,
}))
export const ActionIconsContainerMobile = styled(Box)(() => ({
    display: 'flex',
    background: Colors.shaft,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 99,
    borderTop: `1px solid ${Colors.border}`,
}))
export const DrawerCloseButton = styled(IconButton)(() =>({
    position: 'absolute',
    top: 10,
    left: '250px',
    zIndex: 1999,
}))