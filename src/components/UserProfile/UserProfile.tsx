import { Person, Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, Button, Divider, Grid, IconButton, InputAdornment, OutlinedInput, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../redux/hooks'
import { Item } from '../../styles/profile'
import { Colors } from '../../styles/theme'

const UserProfile = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const { user, responseEncode } = useAppSelector(state => state.auth)
  const [input, setInput] = useState({
    name: user?.data.name || "",
    lastname: user?.data.lastname || "",
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,

  })
  const handleClickShowPassword = () => {
    setInput({
      ...input,
      showPassword: !input.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setInput({
      ...input,
      showConfirmPassword: !input.showConfirmPassword,
    });
  };

  const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const API_URL = '/api/'
  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!input.name && !input.lastname && !input.password && !input.confirmPassword) {
      toast.warn('There is nothing to update!')
    }
    try {
      if ((input.name || input.lastname) && (!input.confirmPassword && !input.password)) {
        let newData = {
          name: input.name || user?.data.name,
          lastname: input.lastname || user?.data.lastname,
        }
        const config = {
          headers: { Authorization: `Bearer ${responseEncode}` }
        }
        const response = await axios.put(`${API_URL}user/update`, newData, config)
        setInput({
          name: '',
          lastname: '',
          password: '',
          confirmPassword: '',
          showPassword: false,
          showConfirmPassword: false,
        })
        console.log(response.data)
        response.data.status === 'success'
          ? toast.success('Information updated correctly')
          : toast.error('Something goes wrong')
      }
      else if (input.name && input.lastname && input.password && input.confirmPassword) {
        let newPassword = {
          password: input.confirmPassword,
        }
        let newData = {
          name: input.name || user?.data.name,
          lastname: input.lastname || user?.data.lastname,
        }
        const config = {
          headers: { Authorization: `Bearer ${responseEncode}` }
        }
        const responsePassword = await axios.post(`${API_URL}user/password`, newPassword, config)
        const responseInfoUser = await axios.put(`${API_URL}user/update`, newData, config)
        setInput({
          name: '',
          lastname: '',
          password: '',
          confirmPassword: '',
          showPassword: false,
          showConfirmPassword: false,
        })
        console.log(responsePassword.data)
        console.log(responseInfoUser.data)
        responsePassword.data.status === 'success'
          ? toast.success('Information updated correctly')
          : toast.error('Something goes wrong')
      }
      else if (input.password && input.confirmPassword) {
        let newData = {
          password: input.confirmPassword,
        }
        const config = {
          headers: { Authorization: `Bearer ${responseEncode}` }
        }
        const response = await axios.post(`${API_URL}user/password`, newData, config)
        setInput({
          name: '',
          lastname: '',
          password: '',
          confirmPassword: '',
          showPassword: false,
          showConfirmPassword: false,
        })
        console.log(response.data)
        response.data.status === 'success'
          ? toast.success('Password updated correctly')
          : toast.error('Something goes wrong')
      }
    } catch (error) {
      console.error(error || error.message)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: matches ? 'column' : 'row', justifyContent: 'space-around', margin: '5%' }}>
      <Box sx={{ m: 4 }}>
        <Paper variant='outlined'>
          <Stack alignItems='center' direction={'column'} divider={<Divider orientation="horizontal" flexItem />}>
            <Avatar sx={{ width: 90, height: 90, m: 4 }}>
              <Person sx={{ width: 70, height: 70, }} />
            </Avatar>
            <Item sx={{ width: '80%' }}>
              {user?.data ? `${user?.data?.name} ${user?.data?.lastname}` : 'User Name'}
            </Item>
            <Item>
              {user?.data ? `${user?.data?.email}` : 'User Email'}
            </Item>
          </Stack>
        </Paper>
      </Box>
      <Box sx={{ m: 4 }} >
        <Box sx={{ backgroundColor: Colors.secondary, color: Colors.tertiary, p: 2 }}>
          <Typography variant='h5'>
            Edit your profile information
          </Typography>
        </Box>
        <Box component='form'>
          <Paper variant='outlined' sx={{ p: 4 }} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  value={input.name}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  placeholder={user?.data.name}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={input.lastname}
                  placeholder={user?.data.lastname}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <OutlinedInput
                  required
                  fullWidth
                  value={input.password}
                  name="password"
                  placeholder="Change Password"
                  type={input.showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  onChange={handleOnChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {input.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <OutlinedInput
                  required
                  fullWidth
                  value={input.confirmPassword}
                  name="confirmPassword"
                  placeholder="Change Password"
                  type={input.showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="confirm-new-password"
                  onChange={handleOnChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {input.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => handleOnSubmit(e)}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>

    </div>

  )
}

export default UserProfile