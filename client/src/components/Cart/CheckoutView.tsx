import { Check } from '@mui/icons-material'
import { Button, Divider, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartOrderMetaModel from '../../models/cart.meta.model'
import { RootState } from '../../redux/reducers'
import { CartAction } from '../../redux/reducers/cart.reducer'

export default function CheckoutView() {

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet'))

    const cart = useSelector<RootState>((state) => state.cartReducer) as CartAction

    const { totalPrice, totalDiscountedPrice, discountPercentage }: CartOrderMetaModel = cart

    return (
        <Stack
            width={!matches ? '23rem' : '100%'}
        >
            <Typography
                color='#6a6f73'
                fontFamily='UdemySansBold'
            >
                Total:
            </Typography>
            <Typography
                fontFamily='UdemySansBold'
                variant='h4'
                mt={1}
            >
                ₹{totalDiscountedPrice?.toLocaleString()}
            </Typography>
            {totalDiscountedPrice !== totalPrice && <Typography
                color="#6a6f73"
                fontSize={18}
                sx={{
                    textDecoration: 'line-through'
                }}
            >
                ₹{totalPrice?.toLocaleString()}
            </Typography>}
            <Typography>
                {discountPercentage}% off
            </Typography>
            <Link
                to='/checkout'
                style={{
                    textDecoration: 'none'
                }}
            >
                <Button
                    variant='contained'
                    sx={{
                        borderRadius: 0,
                        py: 1.5,
                        textTransform: 'none',
                        fontFamily: 'UdemySansBold',
                        fontSize: 16,
                        mt: 1,
                    }}
                    fullWidth
                    disableElevation
                    disableRipple
                >
                    Checkout
                </Button>
            </Link>
            <Stack
                spacing={2}
                mt={2}
            >
                <Divider flexItem />
                <Typography
                    fontFamily='UdemySansBold'
                >
                    Promotions
                </Typography>
                <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                >
                    <Check />
                    <Stack
                        direction='row'
                        spacing={0.5}
                        alignItems='center'
                    >
                        <Typography
                            color='#6a6f73'
                            fontFamily='UdemySansBold'
                            fontSize={14}
                        >
                            NEWLAUNCH
                        </Typography>
                        <Typography
                            color='#6a6f73'
                            fontSize={14}
                        >
                            is applied
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
