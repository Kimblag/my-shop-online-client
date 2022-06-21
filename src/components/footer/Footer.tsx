import { Box, Button, Grid, List, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { FooterTitle, SubscribeTextField } from '../../styles/footer'
import { Colors } from '../../styles/theme'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";

const Footer: React.FC = (): JSX.Element => {
    return (
        <Box
            sx={{
                background: Colors.shaft,
                color: Colors.white,
                p: { xs: 4, md: 10 },
                pt: 12,
                pb: 12,
                fontSize: { xs: '12px', md: '14px' }
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} lg={4}>
                    <FooterTitle variant='body1'>About us</FooterTitle>
                    <Typography variant='caption'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsam reiciendis commodi pariatur ducimus impedit error fugit dolores sed quisquam,
                        reprehenderit amet deleniti vitae quaerat animi dolorum provident eveniet qui! Itaque.
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                            color: Colors.dove_gray
                        }}
                    >
                        <FacebookIcon sx={{ mr: 1 }} />
                        <TwitterIcon sx={{ mr: 1 }} />
                        <InstagramIcon sx={{ mr: 1 }} />
                    </Box>
                </Grid>
                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">Information</FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant='caption'>
                                About Us
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant='caption'>
                                Order Tracking
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant='caption'>
                                Privacy &amp; Policy
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant='caption'>
                                Terms &amp; Conditions
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">My Account</FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant='caption'>
                                Login
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant='caption'>
                                My Cart
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant='caption'>
                                My Account
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant='caption'>
                                Wishlist
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">Newsletter</FooterTitle>
                    <Stack>
                        <SubscribeTextField
                            color="primary"
                            label="Email address"
                            variant="standard"
                        />
                        <Button
                            startIcon={<SendIcon sx={{ color: Colors.white }} />}
                            sx={{ mt: 4, mb: 4 }}
                            variant="contained"
                            color="secondary"
                        >
                            Subscribe
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer