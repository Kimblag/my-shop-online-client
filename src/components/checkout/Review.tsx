import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getTotal } from '../../redux/features/cart/cart.slice';


export default function Review() {
  const { cartItems, cartTotalAmount } = useAppSelector(state => state.cart)
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTotal())
  }, [dispatch])

  const calculatePercentageDiscount = () => {
    let sum = cartItems.reduce((prev, current) => prev + current.discountPercentage, 0)
    return sum || 0
  }
  const calculateTotalwithDiscount = () => {
    let percentage = calculatePercentageDiscount()
    let total = cartTotalAmount - ((cartTotalAmount * percentage) / 100)
    return total || 0
  }


  const getDirection = () => {
    let mainDirection = `${user?.data.address.street} ${user?.data.address.city} ${user?.data.address.province} ${user?.data.address.country} ${user?.data.address.zip} `
    let secondaryDirection = `${user?.data.shippingAddress.street} ${user?.data.shippingAddress.city} ${user?.data.shippingAddress.province} ${user?.data.shippingAddress.country} ${user?.data.shippingAddress.zip} `
    return mainDirection ? mainDirection : secondaryDirection ? secondaryDirection : ""
  }
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={`Discount: % ${product.discountPercentage}`} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="SubTotal" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${cartTotalAmount}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total Discount" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'red' }}>
            - %{calculatePercentageDiscount() ? calculatePercentageDiscount() : 0}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${calculateTotalwithDiscount() ? calculateTotalwithDiscount().toFixed(2) : cartTotalAmount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${user?.data.name} ${user?.data.lastname}`}</Typography>
          <Typography gutterBottom>{getDirection()}</Typography>
        </Grid>
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography> */}
          {/* <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid> */}
        {/* </Grid> */}
      </Grid>
    </React.Fragment>
  );
}