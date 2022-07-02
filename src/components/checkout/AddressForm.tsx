import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserInfo, reset } from '../../redux/features/auth/auth.slice';
import axios from 'axios';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { Colors } from '../../styles/theme';

export default function AddressForm() {

    const { user, responseEncode } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const [input, setInput] = useState({
        name: user?.data?.name || '',
        lastname: user?.data?.lastname || '',
        address: user?.data?.address.street || '',
        address2: user?.data?.address.street || '',
        state: user?.data?.address.province || '',
        zipcode: user?.data?.address.zip || '',
        city: user?.data?.address.city || '',
        country: user?.data?.address.country || '',
    })

    type userDecodeType = {
        exp: number
        iat: number
        id: string
        isAdmin: boolean
    }
    const userDecode: userDecodeType = JSON.parse(window.localStorage.getItem('user') || '{}')
    const userId: string = userDecode?.id

    useEffect(() => {
        dispatch(getUserInfo(userId))
        dispatch(reset())
    }, [dispatch, userId])

    const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }


    const handleOnSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            let newData = {
                name: input.name || user?.data.name,
                lastname: input.lastname || user?.data.lastname,
                address: {
                    country: input.country || '',
                    city: input.city || '',
                    street: input.address || '',
                    province: input.state || '',
                    zip: input.zipcode || ''
                },
                shippingAddress: {
                    country: input.country || '',
                    city: input.city || '',
                    street: input.address2 || '',
                    province: input.state || '',
                    zip: input.zipcode || ''
                }
            }
            const API_URL = '/api/'

            const config = {
                headers: { Authorization: `Bearer ${responseEncode}` }
            }
            const response = await axios.put(`${API_URL}user/update`, newData, config)
            dispatch(getUserInfo(userId))
            dispatch(reset())
            setInput({
                name: '',
                lastname: '',
                address: '',
                address2: '',
                state: '',
                zipcode: '',
                city: '',
                country: '',
            })

            response.data.status === 'success'
                ? toast.success('Information updated correctly')
                : toast.error('Something goes wrong')
        } catch (error: any) {
            console.error(error || error.message)
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        label="First name"
                        name='name'
                        value={input.name}
                        placeholder={user?.data.name}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastname"
                        label="Last name"
                        value={input.lastname}
                        placeholder={user?.data.lastname}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address"
                        label="Address line 1"
                        value={input.address}
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        value={input.address2}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        value={input.city}
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        defaultValue={user?.data?.address.province}
                        value={input.state}
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zipcode"
                        name="zipcode"
                        label="Zip / Postal code"
                        fullWidth
                        value={input.zipcode}
                        autoComplete="shipping postal-code"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        value={input.country}
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant='contained' sx={{ backgroundColor: Colors.secondary }} onClick={(e) => handleOnSubmit(e)}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}