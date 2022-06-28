import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Avatar, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';
import { Colors } from '../../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toast } from 'react-toastify';
import { getUserInfo, login, reset } from '../../redux/features/auth/auth.slice';
import Loader from '../loader/Loader';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="#">
        Your Website
      </Link>{' '}
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
  openRegister: () => void
}

const Signin: React.FC<Props> = ({ open, close, openRegister }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const initialValues = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState<{ email: string, password: string }>({ email: '', password: '' })
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isError, isLoading, isSuccess, response, errorMessageLogin } = useAppSelector(state => state.auth)
  const userState = useAppSelector(state => state.auth.user)
  const [error, setError] = useState<any>('')

  type userDecodeType = {
    data: {
      exp: number
      iat: number
      id: string
      isAdmin: boolean
    }
  }



  useEffect(() => {
    if (isError) {
      setError(errorMessageLogin)
      console.log(error)
    }
    if (isSuccess) {
      close()
      navigate('/')
      dispatch(reset())
    }
  }, [response, userState, close, isSuccess, isError, navigate, dispatch])

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log('Correct')
    }
  }, [formErrors, isSubmit])

  type errorsType = {
    email: string
    password: string
  }
  const validate = ((values: { email: string; password: string; }) => {
    let errors: errorsType = { email: '', password: '' }
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
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
    return errors
  })

  const handleOpenRegister = () => {
    close()
    openRegister()
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
    const userData = {
      email: formValues.email,
      password: formValues.password
    }
    await dispatch(login(userData))
    const userDecode: userDecodeType = await JSON.parse(window.localStorage.getItem('user') || '{}')
    if (userDecode) {
      const userId: string = userDecode ? userDecode?.data?.id : ''
      dispatch(getUserInfo(userId))
      setFormValues(initialValues)
      setFormErrors({ email: '', password: '' })
      setError('') 
   
    }
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
              Signin
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
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
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
              />
              <Box>
                <Typography color={'red'} paragraph variant='subtitle2'>{formErrors.password}</Typography>
                {error ? (
                <Typography variant='caption' color={'red'}>{error}</Typography>
              ) : null}
              </Box>
              
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: Colors.secondary }}
              >
                Sign In
              </Button>
              <Grid container sx={{ display: 'flex', flexDirection: matches ? 'column' : 'row' }}>
                <Grid item xs sx={{ p: 1 }}>
                  <Link to="#" style={{ textDecoration: 'none', color: Colors.secondary }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item sx={{ p: 1 }}>
                  <span onClick={handleOpenRegister} style={{ textDecoration: 'none', color: Colors.secondary, cursor: 'pointer' }} >
                    {"Don't have an account? Sign Up"}
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

export default Signin