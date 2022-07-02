import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
const ChangePassword = () => {
    const initialValues = {
        confirmPassword: '', password: '', showPassword: false,
        showConfirmPassword: false,
    }
    const [searchParams] = useSearchParams()
    const [formValues, setFormValues] = useState(initialValues)
    const navigate = useNavigate()
    var token: string | null = searchParams.get('token')

    const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setFormValues({
            ...formValues,
            showPassword: !formValues.showPassword,
        });
    };
    const handleClickShowConfirmPassword = () => {
        setFormValues({
            ...formValues,
            showConfirmPassword: !formValues.showConfirmPassword,
        });
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formValues.password !== formValues.confirmPassword) return toast.error('Passwords must be equals')
        const API_URL = (process.env.REACT_APP_API_URL)
        try {
            if (!formValues.confirmPassword && !formValues.password) {
                toast.warn('Please complete all fields')
            } else {
                const response = await axios.post(`${API_URL}/api/user/newpassword/${token}`, { password: formValues.confirmPassword })
                if (response.data.status === 'success') {
                    toast.info('Password changed successfully')
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                } else {
                    toast.error('Something went wrong, plase try again later')
                }
            }
        } catch (error: any) {
            console.error(error || error.message)
        }
        setFormValues(initialValues)
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
                        Change password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <OutlinedInput
                            required
                            fullWidth
                            id="password"
                            placeholder="New Password"
                            name="password"
                            autoComplete="password"
                            type={formValues.showPassword ? 'text' : 'password'}
                            autoFocus
                            value={formValues.password}
                            onChange={handleOnChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formValues.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <OutlinedInput
                            required
                            fullWidth
                            id="confirmPassword"
                            placeholder="Confirm New Password"
                            name="confirmPassword"
                            autoComplete="confirmPassword"
                            autoFocus
                            type={formValues.showConfirmPassword ? 'text' : 'password'}
                            value={formValues.confirmPassword}
                            onChange={handleOnChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formValues.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: Colors.secondary }}
                        >
                            Change Password
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => navigate('/')}
                            sx={{ mt: 3, mb: 2, backgroundColor: Colors.secondary }}
                        >
                            Go back to home
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

export default ChangePassword