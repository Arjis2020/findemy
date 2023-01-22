import { Box, Container, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { CartAction } from '../../redux/reducers/cart.reducer'
// import { OrderMeta, Orders } from '../Cart'
import BillingDetails from './BillingDetails'
import OrderDetails from './OrderDetails'
import PaymentDetails from './PaymentDetails'
import Summary from './Summary'

// type CheckoutProps = {
//     orders: Array<Orders>,
//     orderMeta: Partial<OrderMeta>
// }

export default function Checkout() {
    const cart = useSelector<RootState>((state) => state.cartReducer) as CartAction

    const orderMeta : CartOrderMeta = cart

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const DesktopView = () => (
        <Stack
            direction='row'
            spacing={8}
        >
            <Stack
                spacing={3}
                pl='10rem'
                width='55%'
                py={4}
            >
                <Typography
                    variant='h4'
                    fontFamily='SuisseBold'
                >
                    Checkout
                </Typography>
                <BillingDetails />
                <PaymentDetails />
                <OrderDetails
                    orders={cart.orders}
                />
            </Stack>
            <Box
                sx={{
                    background: '#f7f9fa',
                    py: 4
                }}
                pl={8}
                pr='10rem'
                flex={1}
            >
                <Summary
                    orderMeta={orderMeta}
                />
            </Box>
        </Stack>
    )

    const MobileView = () => (
        <Stack
            direction='row'
            pb={20}
        >
            <Stack
                spacing={3}
                px={4}
                py={4}
                width='100%'
            >
                <Typography
                    variant='h4'
                    fontFamily='SuisseBold'
                >
                    Checkout
                </Typography>
                <BillingDetails />
                <PaymentDetails />
                <OrderDetails
                    orders={cart.orders}
                />
                <Summary
                    orderMeta={orderMeta}
                />
            </Stack>
        </Stack>
    )

    return (
        matches ?
            <MobileView />
            :
            <DesktopView />
    )
}
