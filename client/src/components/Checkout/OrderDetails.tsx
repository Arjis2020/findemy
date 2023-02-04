import { Stack, Typography } from '@mui/material'
import React from 'react'
import ICourseModel from '../../models/course.model'

type OrdersProps = {
    orders: Array<ICourseModel>
}

export default function OrderDetails({ orders }: OrdersProps) {
    const OrderSummary = ({ imageUrl, title, price, discountedPrice }: Partial<ICourseModel>) => {
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
                        src={imageUrl}
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
                        ₹{discountedPrice}
                    </Typography>
                    {discountedPrice !== price && <Typography
                        color='#3e4143'
                        fontSize={14}
                        sx={{
                            textDecoration: 'line-through'
                        }}
                    >
                        ₹{price}
                    </Typography>}
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
                            key={order._id}
                            title={order.title}
                            imageUrl={order.imageUrl}
                            price={order.price}
                            discountedPrice={order.discountedPrice}
                        />
                    )
                })}
            </Stack>
        </Stack>
    )
}
