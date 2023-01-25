import { AppBar, Button, Divider, Stack, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import CartOrderMetaModel from '../../models/cart.meta.model'
import { RootState } from '../../redux/reducers'
import { PaymentState } from '../../redux/reducers/payment.reducer'
// import { OrderMeta, Orders } from '../Cart'

type SummaryProps = {
    orderMeta: CartOrderMetaModel,
    // onCheckout: () => void
}

export default function Summary({ orderMeta }: SummaryProps) {
    const { totalDiscountedPrice, totalPrice, discount } = orderMeta

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))
    const payment = useSelector<RootState>((state) => state.paymentReducer) as PaymentState
    const paymentMethod = payment.method
    
    return (
        <Stack
            spacing={2}
            mt={10}
            maxWidth={matches ? '100%' : '83%'}
        >
            <Typography
                fontSize={26}
                fontFamily='UdemySansBold'
            >
                Summary
            </Typography>
            <Stack
                spacing={5}
            >
                <Stack
                    spacing={2}
                >
                    <Stack
                        spacing={1}
                    >
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Typography
                                fontSize={14}
                            >
                                Original Price:
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                ₹{totalPrice?.toLocaleString()}
                            </Typography>
                        </Stack>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Typography
                                fontSize={14}
                            >
                                Discounts:
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                -₹{discount?.toLocaleString()}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            Total:
                        </Typography>
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            ₹{totalDiscountedPrice.toLocaleString()}
                        </Typography>
                    </Stack>
                </Stack>
                {!matches ? <Stack
                    spacing={1}
                    alignItems='center'
                >
                    <Typography
                        variant='caption'
                    >
                        By completing your purchase you agree to these Terms of Service.
                    </Typography>
                    {paymentMethod !== 'upi' && <Button
                        variant='contained'
                        sx={{
                            borderRadius: 0,
                            fontFamily: 'UdemySansBold',
                            py: 2,
                            textTransform: 'none',
                            fontSize: 16
                        }}
                        disableElevation
                        disableRipple
                        fullWidth
                        type='submit'
                    >
                        Proceed
                    </Button>}
                    <Typography
                        variant='caption'
                    >
                        30-Day Money-Back Guarantee
                    </Typography>
                </Stack>
                    :
                    <AppBar
                        position='fixed'
                        sx={{
                            background: '#fff',
                            bottom: 0,
                            top: 'auto',
                            height: 'auto'
                        }}
                    >
                        <Toolbar
                            sx={{
                                height: 'auto'
                            }}
                        >
                            <Stack
                                sx={{
                                    color: '#000'
                                }}
                                width='100%'
                                spacing={1}
                                py={1}
                                alignItems='center'
                            >
                                <Stack
                                    spacing={0.5}
                                    width='100%'
                                >
                                    <Stack
                                        direction='row'
                                        justifyItems='space-between'
                                        alignItems='center'
                                        width='100%'
                                    >
                                        <Typography
                                            fontFamily='UdemySansBold'
                                            fontSize={16}
                                            flex={1}
                                        >
                                            Total
                                        </Typography>
                                        <Typography
                                            fontFamily='UdemySansBold'
                                            fontSize={16}
                                        >
                                            ₹{totalPrice}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant='caption'
                                        color='#6a6f73'
                                        align='left'
                                    >
                                        By completing your purchase you agree to these Terms of Service.
                                    </Typography>
                                </Stack>
                                <Stack
                                    spacing={0.5}
                                    width='100%'
                                    alignItems='center'
                                >
                                    <Button
                                        variant='contained'
                                        sx={{
                                            borderRadius: 0,
                                            fontFamily: 'UdemySansBold',
                                            py: 1.5,
                                            textTransform: 'none',
                                            fontSize: 16
                                        }}
                                        disableElevation
                                        disableRipple
                                        fullWidth
                                    >
                                        Proceed
                                    </Button>
                                    <Typography
                                        variant='caption'
                                    >
                                        30-Day Money-Back Guarantee
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                }
            </Stack>
        </Stack>
    )
}
