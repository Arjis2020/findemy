import { Stack, Typography } from '@mui/material'
import React from 'react'
import { Orders } from '../Cart'

type OrdersProps = {
    orders: Array<Orders>
}

export default function OrderDetails({ orders }: OrdersProps) {
    const OrderSummary = ({ thumbnail, title, price, realPrice }: Partial<Orders>) => {
        return (
            <Stack
                direction='row'
                spacing={1}
                justifyContent='space-between'
            >
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='start'
                >
                    <img
                        src={thumbnail}
                        style={{
                            width: 45,
                            height: 45,
                            objectFit: 'cover'
                        }}
                    />
                    <Typography
                        fontFamily='UdemySansBold'
                        fontSize={14}
                        maxWidth='90%'
                    >
                        {title}
                    </Typography>
                </Stack>
                <Stack
                    alignItems='end'
                >
                    <Typography>
                        ₹{price}
                    </Typography>
                    <Typography
                        color='#3e4143'
                        fontSize={14}
                        sx={{
                            textDecoration: 'line-through'
                        }}
                    >
                        ₹{realPrice}
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    return (
        <Stack
            spacing={2}
            pt={2}
        >
            <Typography
                fontSize={26}
                fontFamily='UdemySansBold'
            >
                Order details
            </Typography>
            <Stack
                spacing={3}
            >
                {orders.map(order => {
                    return (
                        <OrderSummary
                            title={order.title}
                            thumbnail={order.thumbnail}
                            price={order.price}
                            realPrice={order.realPrice}
                        />
                    )
                })}
            </Stack>
        </Stack>
    )
}
