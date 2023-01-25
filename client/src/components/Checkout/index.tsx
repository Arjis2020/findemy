import { Box, Stack, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { FieldErrorsImpl, FieldValues, useForm, UseFormRegister } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { createOrder, verifyOrder } from '../../API/handlers/payment.handler'
import CartOrderMetaModel from '../../models/cart.meta.model'
import { CreateOrderModel, VerifyOrderModel } from '../../models/order.model'
import { CardDetails, resetPayment, setPaymentDetails } from '../../redux/actions/payment.action'
import { RootState } from '../../redux/reducers'
import { LoginStateAction } from '../../redux/reducers/auth.reducer'
import { CartAction } from '../../redux/reducers/cart.reducer'
import { PaymentState } from '../../redux/reducers/payment.reducer'
import { APP_NAME } from '../../utils/constants'
import { generateReceipt } from '../../utils/generateReceipt'
import BillingDetails from './BillingDetails'
import OrderDetails from './OrderDetails'
import PaymentDetails from './PaymentDetails'
import Summary from './Summary'

// const RAZORPAY_CHECKOUT_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js"

export type PaymentMethodProps = {
    register: UseFormRegister<FieldValues>,
    errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
}

export default function Checkout() {
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        shouldFocusError: false
    })

    const location = useLocation()

    console.log(location.state)
    const payment = useSelector<RootState>((state) => state.paymentReducer) as PaymentState
    const user = useSelector<RootState>((state) => state.authReducer) as LoginStateAction
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const paymentMethod = payment.method

    const dispatch = useDispatch()

    useEffect(() => {
        reset()
    }, [paymentMethod])

    useEffect(() => {
        if (payment.method === 'card' && payment.details) {
            displayRazorpay(payment.details as CardDetails)
        }
    }, [payment.details])

    const theme = useTheme()

    // redirects user to home screen if location.state is null
    // this forces the user to come via a route that explicitly defines a state
    // here, the state will contain the cart data
    // will be very useful when implementing the Buy Now button logic
    if (!location.state) {
        return <Navigate
            to='/'
        />
    }

    const cart = location.state as CartAction
    const orderMeta: CartOrderMetaModel = cart

    const createOrderParams: CreateOrderModel = {
        amount: String(orderMeta.totalPrice * 100),
        currency: 'INR',
        receipt: generateReceipt()
    }

    const onSubmit = (values: FieldValues) => {
        const details: CardDetails = {
            ...values as CardDetails
        }
        dispatch(setPaymentDetails(details))
    }

    const displayRazorpay = async (details: CardDetails) => {
        if (!window.Razorpay) throw new Error("Razorpay couldn't connect")

        // creating a new order
        const result = await createOrder(createOrderParams)

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result;

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: amount.toString(),
            currency: currency,
            name: APP_NAME,
            description: `Tx for ${order_id}`,
            image: "http://localhost:3000/logo512.png",
            order_id,
            handler: async function (response: any) {
                const data = {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                try {
                    const params: VerifyOrderModel = {
                        order_id: data.razorpayOrderId,
                        payment_id: data.razorpayPaymentId,
                        razorpay_signature: data.razorpaySignature
                    }
                    await verifyOrder(params)
                    dispatch(resetPayment())
                }
                catch (err) {
                    console.log(err)
                }
            },
            modal: {
                onDismiss() {
                    dispatch(resetPayment())
                }
            },
            prefill: {
                name: details.name,
                email: user.data?.email,
                contact: "6290997993",
                method: "card",
                "card[number]": +details.number,
                "card[expiry]": details.expiry,
                "card[cvv]": +details.cvv
            },
            theme: {
                color: theme.palette.primary.main,
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

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
                <PaymentDetails
                    errors={errors}
                    register={register}
                />
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
                    // onCheckout={displayRazorpay}
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
                <PaymentDetails
                    errors={errors}
                    register={register}
                />
                <OrderDetails
                    orders={cart.orders}
                />
                <Summary
                    // onCheckout={displayRazorpay}
                    orderMeta={orderMeta}
                />
            </Stack>
        </Stack>
    )

    return (
        paymentMethod !== 'upi' ?
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                {
                    matches ?
                        <MobileView />
                        :
                        <DesktopView />
                }
            </form>
            :
            matches ?
                <MobileView />
                :
                <DesktopView />
    )
}
