import { Box, Container, Stack, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { createOrder, verifyOrder } from '../../API/handlers/payment.handler'
import { checkout } from '../../API/handlers/purchase.handler'
import CartOrderMetaModel from '../../models/cart.meta.model'
import { CreateOrderModel, VerifyOrderModel } from '../../models/order.model'
import { CardDetails, MobileWalletDetails, NetbankingDetails, resetPayment, setPaymentDetails, UPIDetails } from '../../redux/actions/payment.action'
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
    // register: UseFormRegister<FieldValues>,
    // errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>,
    formValues: UseFormReturn<FieldValues, any>
    // paytmPaymentHandler?: () => void
    banks?: {
        [bank: string]: string
    },
    wallets?: {
        [wallet: string]: boolean
    }
}

export default function Checkout() {
    const formValues = useForm({
        shouldFocusError: false
    })

    const { handleSubmit, reset } = formValues

    const location = useLocation()

    const payment = useSelector<RootState>((state) => state.paymentReducer) as PaymentState
    const user = useSelector<RootState>((state) => state.authReducer) as LoginStateAction
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const paymentMethod = payment.method

    const dispatch = useDispatch()

    useEffect(() => {
        reset()
    }, [paymentMethod])

    useEffect(() => {
        if (payment.details) {
            if (paymentMethod === 'card') {
                displayRazorpay(buildCardPrefillOptions(payment.details as CardDetails), payment.details as CardDetails)
            }
            else if (paymentMethod === 'upi') {
                displayRazorpay(buildUPIPrefillOptions(payment.details as UPIDetails), payment.details as UPIDetails)
            }
            // else if (paymentMethod === 'paytm') {
            //     displayRazorpay(null)
            // }
            else if (paymentMethod === 'netbanking') {
                displayRazorpay(buildNetbankingPrefillOptions(payment.details as NetbankingDetails), payment.details as NetbankingDetails)
            }
            else if (paymentMethod === 'wallet') {
                displayRazorpay(buildWalletPrefillOptions(payment.details as MobileWalletDetails), payment.details as MobileWalletDetails)
            }
        }
    }, [payment.details])

    const theme = useTheme()
    const [razorpayOptions, setRazorpayOptions] = useState<any>()

    useEffect(() => {
        if (razorpayOptions) {
            const paymentObject = new window.Razorpay(razorpayOptions)
            paymentObject.open()
        }
    }, [razorpayOptions])

    const navigate = useNavigate()

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
        receipt: generateReceipt(),
        method: paymentMethod!,
        notes: { ...payment.details ? { ...payment.details.notes } : null }
    }

    const onSubmit = (values: FieldValues) => {
        if (paymentMethod === 'card') {
            values.number = values.number.split(' ').join('')
            const details: CardDetails = {
                ...values as CardDetails
            }
            dispatch(setPaymentDetails(details))
        }
        else if (paymentMethod === 'netbanking') {
            dispatch(setPaymentDetails(values as NetbankingDetails))
        }
        else if (paymentMethod === 'wallet') {
            dispatch(setPaymentDetails(values as MobileWalletDetails))
        }
    }

    // const paytmPaymentHandler = () => {
    //     displayRazorpay(null)
    // }

    const buildNetbankingPrefillOptions = (details: NetbankingDetails) => {
        return {
            config: {
                display: {
                    blocks: {
                        banks: {
                            name: 'All payment methods',
                            instruments: [
                                {
                                    method: 'netbanking',
                                    banks: [details.bank]
                                }
                            ],
                        },
                    },
                    sequence: ['block.banks'],
                    preferences: {
                        show_default_blocks: false,
                    },
                },
            }
        }
    }

    const buildWalletPrefillOptions = (details: MobileWalletDetails) => {
        return {
            config: {
                display: {
                    blocks: {
                        wallets: {
                            name: 'All payment methods',
                            instruments: [
                                {
                                    method: 'wallet',
                                    wallets: [details.wallet]
                                }
                            ],
                        },
                    },
                    sequence: ['block.wallets'],
                    preferences: {
                        show_default_blocks: false,
                    },
                },
            }
        }
    }

    const buildCardPrefillOptions = (details: CardDetails) => {
        return {
            prefill: {
                "card[number]": +details.number,
                "card[expiry]": details.expiry,
                "card[cvv]": +details.cvv
            }
        }
    }

    const buildUPIPrefillOptions = (upi: UPIDetails) => {
        return {
            prefill: {
                vpa: upi.vpa
            }
        }
    }

    const displayRazorpay = async (prefillOptions: any, details?: typeof payment.details) => {
        if (!window.Razorpay) throw new Error("Razorpay couldn't connect")
        // console.log(details.method)
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
                    await checkout(cart.orders.map(order => order._id))
                    dispatch(resetPayment())
                    navigate('/my-learnings')
                }
                catch (err) {
                    console.log(err)
                }
            },
            modal: {
                onDismiss() {
                    dispatch(resetPayment())
                },
                confirmClose: true
            },
            prefill: {
                name: paymentMethod !== 'card' ? user.data?.name : (details as CardDetails).name,
                email: user.data?.email,
                contact: "6290997993",
                method: paymentMethod,
                ...prefillOptions.prefill
            },
            config: { ...prefillOptions.config },
            theme: {
                color: theme.palette.primary.main,
            },
        };

        setRazorpayOptions(options)
    }

    const DesktopView = () => (
        <Container
            maxWidth='laptop'
        >
            <Stack
                direction='row'
                spacing={8}
            >
                <Stack
                    spacing={3}
                    width='55%'
                    py={4}
                >
                    <Typography
                        variant='h4'
                        fontFamily='SuisseBold'
                    >
                        Checkout
                    </Typography>
                    <BillingDetails
                        formValues={formValues}
                    />
                    <PaymentDetails
                        // paytmPaymentHandler={paytmPaymentHandler}
                        formValues={formValues}
                    />
                    <OrderDetails
                        orders={cart.orders}
                    />
                </Stack>
                <Box
                    sx={{
                        background: '#f7f9fa',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        transform: 'translateX(100%)',
                        position: 'fixed',
                        // zIndex: -2,
                        width: '53%'
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: '55%',
                            py: 10
                        }}
                        pl={8}
                    >
                        <Summary
                            // onCheckout={displayRazorpay}
                            // paytmPaymentHandler={paytmPaymentHandler}
                            orderMeta={orderMeta}
                        />
                    </Box>
                </Box>
            </Stack>
        </Container>
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
                <BillingDetails
                    formValues={formValues}
                />
                <PaymentDetails
                    // paytmPaymentHandler={paytmPaymentHandler}
                    formValues={formValues}
                />
                <OrderDetails
                    orders={cart.orders}
                />
                <Summary
                    // onCheckout={displayRazorpay}
                    // paytmPaymentHandler={paytmPaymentHandler}
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
