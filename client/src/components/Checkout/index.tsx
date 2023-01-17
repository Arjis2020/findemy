import { Box, Container, Stack, Typography } from '@mui/material'
import { OrderMeta, Orders } from '../Cart'
import BillingDetails from './BillingDetails'
import OrderDetails from './OrderDetails'
import PaymentDetails from './PaymentDetails'
import Summary from './Summary'

type CheckoutProps = {
    orders: Array<Orders>,
    orderMeta: Partial<OrderMeta>
}

export default function Checkout({ orders, orderMeta }: CheckoutProps) {
    return (
        <Box>
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
                        orders={orders}
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
        </Box>
    )
}
