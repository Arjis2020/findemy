import { Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { OrderMeta, Orders } from '../Cart'

type SummaryProps = {
    orderMeta: Partial<OrderMeta>
}

export default function Summary({ orderMeta }: SummaryProps) {
    const { totalRealPrice, totalPrice, discount } = orderMeta
    return (
        <Stack
            spacing={2}
            mt={10}
            maxWidth='83%'
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
                                ₹{totalRealPrice?.toLocaleString()}
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
                            ₹{totalPrice}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    spacing={1}
                    alignItems='center'
                >
                    <Typography
                        variant='caption'
                    >
                        By completing your purchase you agree to these Terms of Service.
                    </Typography>
                    <Button
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
        </Stack>
    )
}
