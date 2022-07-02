import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import Review from './Review';
import { Colors } from '../../styles/theme';
import { getUserInfo } from '../../redux/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import { clearCart, getTotal, getUserCart } from '../../redux/features/cart/cart.slice';
import { toast } from 'react-toastify';
import { getUserCartProps } from '../../redux/services/cart/cart.services';
import { useNavigate } from 'react-router-dom';


const steps = ['Shipping address', 'Review your order'];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();




const Checkout: React.FC = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const { responseEncode, user } = useAppSelector(state => state.auth)
    const { cartItems, cartTotalAmount, userCart } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(getTotal())
    }, [dispatch])

    const calculatePercentageDiscount = () => {
        let sum = cartItems.reduce((prev, current) => prev + current.discountPercentage, 0)
        return sum || 0
    }
    const calculateTotalwithDiscount = () => {
        let percentage = calculatePercentageDiscount()
        let total = cartTotalAmount - ((cartTotalAmount * percentage) / 100)
        return total || cartTotalAmount
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        dispatch(getUserInfo(user?.data.id as string))
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const getCartItems = () => {
        return cartItems.map((product) => {
            return {
                productId: product._id,
                quantity: product.quantity
            }
        })
    }
    const API_URL = (process.env.REACT_APP_API_URL)
    const handlePlaceOrder = async () => {
        let config = {
            headers: { Authorization: `Bearer ${responseEncode}` }
        }
        let infoUserCart = {
            userId: user?.data.id,
            products: getCartItems(),
            amount: calculateTotalwithDiscount().toFixed(2),
            address: user?.data.address || user?.data.shippingAddress
        }

        try {
            const response = await axios.post(`${API_URL}/api/order`, infoUserCart, config)
            let userInfo: getUserCartProps = { userId: user?.data.id, token: responseEncode }
            dispatch(getUserCart(userInfo))
            dispatch(clearCart())
            toast.success('Order created successfully!', { toastId: 'order' })
        } catch (error: any) {
            console.error(error || error.message)
        }
    }
    let getLastOrder: any = userCart.data.at(-1)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar sx={{ backgroundColor: Colors.secondary }}>
                    <Typography onClick={() => navigate('/')} sx={{ fontFamily: 'Montez', cursor: 'pointer' }} variant="h3" color="inherit" noWrap>
                        My Shop
                    </Typography>
                </Toolbar>
                <Toolbar>
                    <Button onClick={() => navigate('/orders')} variant='contained' sx={{backgroundColor: Colors.secondary}}> Go Back</Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel >{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                   {` Your order number is # ${getLastOrder?._id}.`}
                                </Typography>

                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={activeStep === steps.length - 1 ? () => {
                                            handleNext()
                                            handlePlaceOrder()
                                        } : handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default Checkout