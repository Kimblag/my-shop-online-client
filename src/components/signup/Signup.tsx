import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Avatar, Container, CssBaseline, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';
import { Colors } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { reset, register } from '../../redux/features/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Loader from '../loader/Loader';

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


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

type Props = {
    open: boolean
    close: () => void
    openLogin: () => void
}
// type useStateType = {
//     error: 
// }

const Signup: React.FC<Props> = ({ open, close, openLogin }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const initialValues = { name: '', lastname: '', email: '', password: '', confirmPassword: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState<{ name: string, lastname: string, email: string, password: string, confirmPassword: string }>({ name: '', lastname: '', email: '', password: '', confirmPassword: '' })
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [passwordHelper, setPasswordHelper] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isError, isLoading, isSuccess, response, errorMessageRegister } = useAppSelector(state => state.auth)
    const [error, setError] = useState<any>('')

    useEffect(() => {
        if (isError) {
            setError(errorMessageRegister)
            console.log(error)
        }
        if (isSuccess) {
            close()
        }
        dispatch(reset())
    }, [response, close, isError, isSuccess, navigate, dispatch, errorMessageRegister, error])


    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        const userData = {
            name: formValues.name,
            lastname: formValues.lastname,
            email: formValues.email,
            password: formValues.password
        }
        dispatch(register(userData))
        setFormValues(initialValues)
        setFormErrors({ name: '', lastname: '', email: '', password: '', confirmPassword: '' })
        setError('')
        if (!errorMessageRegister) close()
        toast.success('Succesfully registered! You can now verify your email for activate account!', { toastId: 'registered' })
        navigate('/')
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log('Correct')
        }
    }, [formErrors, isSubmit])

    type errorsType = {
        name: string,
        lastname: string,
        email: string
        password: string,
        confirmPassword: string
    }
    const validate = ((values: { name: string; lastname: string; email: string; password: string; confirmPassword: string; }) => {
        let errors: errorsType = { name: '', lastname: '', email: '', password: '', confirmPassword: '' }
        // eslint-disable-next-line no-useless-escape
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        const regexPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})')
        if (!values.name || !values.lastname) {
            errors.name = 'Name is required'
            errors.lastname = 'Lastname is required'
        }
        if (!values.email) {
            errors.email = 'Email is required'
        } else if (!regex.test(values.email)) {
            errors.email = 'Please provide a valid email'
        }
        if (!values.password) {
            errors.password = 'Password is required'
        } else if (values.password.length < 6) {
            errors.password = 'Password must have at least six character long'
        }
        else if (!regexPassword.test(values.password)) {
            errors.password = 'Password must have at least one lower and an upper case letter, one number, one special character and 6 characters long'
        }
        else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Password must match.'
        }
        return errors
    })

    const handleOpenLogin = () => {
        close()
        openLogin()
    }

    if (isLoading) {
        return <Loader />
    }


    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={close}
                TransitionComponent={Transition}
                sx={{
                    zIndex: 99999,
                    opacity: 0.98,
                }}
            >
                <AppBar sx={{ position: 'relative', background: Colors.secondary, }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={close}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Signup
                        </Typography>
                    </Toolbar>
                </AppBar>
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
                            <AccountCircleOutlinedIcon sx={{ fontSize: '4rem' }} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>



                        <Box component="form" sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                            <Box>
                                <Typography color={'red'} paragraph variant='subtitle2'>{formErrors.name}</Typography>
                            </Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastname"
                                label="Lastname"
                                name="lastname"
                                autoComplete="lastname"
                                autoFocus
                                value={formValues.lastname}
                                onChange={handleInputChange}
                            />
                            <Box>
                                <Typography color={'red'} paragraph variant='subtitle2'>{formErrors.lastname}</Typography>
                            </Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                            <Box>
                                <Typography color={'red'} paragraph variant='subtitle2'>{formErrors.email}</Typography>
                            </Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                onClick={() => {
                                    setPasswordHelper(true)
                                }}
                                onBlur={() => setPasswordHelper(false)}
                            />
                            <Box>
                                <Typography color={'red'} paragraph variant='subtitle2'>{formErrors.password}</Typography>
                            </Box>
                            {passwordHelper && (<Box>
                                <Typography color={'black'} paragraph variant='caption'>❥ One lower case letter<br /> ❥ One upper case letter<br /> ❥ One number <br /> ❥ One special character <br /> ❥ At least 6 characters long</Typography>
                            </Box>)}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                autoComplete="confirmPassword"
                                autoFocus
                                value={formValues.confirmPassword}
                                onChange={handleInputChange}
                            />
                            <Box>
                                <Typography color={'red'} paragraph variant='subtitle2'>{formErrors.confirmPassword}</Typography>
                                {error ? (<Typography color={'red'} paragraph variant='subtitle2'>{error}</Typography>) : null}
                            </Box>


                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: Colors.secondary }}
                            >
                                Sign Up
                            </Button>
                            <Grid container sx={{ display: 'flex', flexDirection: matches ? 'column' : 'row' }}>

                                <Grid item sx={{ p: 1 }}>
                                    <span onClick={handleOpenLogin} style={{ textDecoration: 'none', color: Colors.secondary, cursor: 'pointer' }} >
                                        {"Already have an account? Sign In"}
                                    </span>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>

            </Dialog>
        </div>
    )
}

export default Signup