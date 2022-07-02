import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Colors } from '../styles/theme';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <a color="inherit" target="_blank" rel="noreferrer" href="https://portfolio-kimberly-blandon.vercel.app/">
                Kimberly Blandon
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>('')
    const navigate = useNavigate()
    const handleOnChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // eslint-disable-next-line no-useless-escape
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (!email || !regex.test(email)) return toast.info('Please provide a valid email')
        const API_URL = (process.env.REACT_APP_API_URL)
        try {
            const response = await axios.post(`${API_URL}/api/user/forgotpassword`, { email: email })
            setEmail('')
            if (response.data.status === 'success') {
                toast.success('Please verify your email to reset password')
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            } else {
                toast.error('Something went wrong')
            }
        } catch (error: any) {
            console.error(error || error.message)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleOnChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: Colors.secondary }}
                        >
                            Forgot Password
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => navigate('/')}
                            sx={{ mt: 3, mb: 2, backgroundColor: Colors.secondary }}
                        >
                            Go back to Home
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}