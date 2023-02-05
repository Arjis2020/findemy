import { Accordion, AccordionDetails, AccordionSummary, Box, Radio, RadioGroup, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PaymentMethodProps } from '..'
import { generateUpiQR, getMobileWallets, getNetbankingBanks } from '../../../API/handlers/payment.handler'
import ICartOrderMetaModel from '../../../models/cart.meta.model'
import { SupportedPaymentMethods } from '../../../models/order.model'
// import { setPaymentMethod } from '../../../redux/actions/payment.action'
import { setPaymentMethod } from '../../../redux/reducers/payment.reducer'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import CreditDebitCard from './PaymentMethods/CreditDebitCard'
import MobileWallets from './PaymentMethods/MobileWallets'
import NetBanking from './PaymentMethods/NetBanking'
import UPI from './PaymentMethods/UPI'

type IconGeneratorProps = {
    icon: string,
    height?: number
}

export const IconGenerator = ({ icon, height }: IconGeneratorProps) => (
    <img
        src={icon}
        style={{
            height: height || 25,
            objectFit: 'cover',
        }}
    />
)

export default function Methods({ formValues, banks, wallets }: PaymentMethodProps) {
    const payment = useAppSelector((state) => state.paymentReducer)
    const activePaymentMethod = payment.method

    type AccordionGeneratorProps = PaymentMethodArgs

    type PaymentMethods = Array<PaymentMethodArgs>

    type PaymentMethodArgs = {
        method: SupportedPaymentMethods,
        title: string,
        icons?: Array<React.ReactElement>,
        children?: React.ReactElement,
        defIcon: React.ReactElement,
        component?: React.ReactElement
    }

    const [netbankingBanks, setBanks] = useState<typeof banks>()
    const [mobileWallets, setWallets] = useState<typeof wallets>()
    const [qrCode, setQrCode] = useState<string>()

    const location = useLocation()

    const cart = location.state
    const orderMeta: ICartOrderMetaModel = cart.data

    useEffect(() => {
        getNetbankingBanks()
            .then(banks => setBanks(banks))
            .catch(err => console.log(err.toString()))

        getMobileWallets()
            .then(wallets => setWallets(wallets))
            .catch(err => console.log(err.toString()))

        generateUpiQR({
            amount: orderMeta.totalPrice * 100
        })
            .then(data => setQrCode(data.image_url))
            .catch(err => {
                console.log(err.toString())
            })
    }, [])

    const paymentMethods: PaymentMethods = [
        {
            method: 'card',
            title: 'Credit/Debit Card',
            icons: [
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg'
                />,
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg'
                />,
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg'
                />,
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/card-dinersclub.svg'
                />,
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/card-discover.svg'
                />,
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/card-rupay.svg'
                />,
            ],
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-default.svg'
            />,
            component: <CreditDebitCard
                formValues={formValues}
            />
        },
        {
            method: 'upi',
            title: 'UPI',
            defIcon:
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/common-upi.svg'
                />,
            component: <UPI 
                qrCode={qrCode}
            />
        },
        // {
        //     method: 'paytm',
        //     title: 'PayTM',
        //     defIcon: <IconGenerator
        //         icon='https://www.udemy.com/staticx/udemy/images/v9/hpp-paytm.svg'
        //     />,
        //     component: <Paytm />
        // },
        {
            method: 'netbanking',
            title: 'Net Banking',
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/common-onlinebanking-in.svg'
            />,
            component: <NetBanking
                formValues={formValues}
                banks={netbankingBanks}
            />
        },
        {
            method: 'wallet',
            title: 'Mobile Wallets',
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/common-wallet-in.svg'
            />,
            component: <MobileWallets
                formValues={formValues}
                wallets={mobileWallets}
            />
        }
    ]

    const dispatch = useAppDispatch()
    const handleAccordionStateChange = (method: SupportedPaymentMethods) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        if (isExpanded)
            // setActiveAccordion(id)
            dispatch(setPaymentMethod(method))
    }

    const AccordionGenerator = ({ method, title, icons, defIcon, children }: AccordionGeneratorProps) => {
        return (
            <Accordion
                elevation={0}
                disableGutters
                sx={{
                    px: 0,
                }}
                expanded={activePaymentMethod === method}
                onChange={handleAccordionStateChange(method)}
            >
                <AccordionSummary
                    expandIcon={null}
                    sx={{
                        fontSize: 16,
                        px: 1,
                        fontFamily: 'UdemySansBold',
                        background: '#F7F9FA',
                        "& .MuiAccordionSummary-content": {
                            m: 0
                        },
                        borderBottom: method === activePaymentMethod ? '1px solid #D3D7DB' : 'none'
                    }}
                    disableRipple
                >
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignContent='center'
                        width='100%'
                        spacing={1}
                    >
                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing={0.8}
                        >
                            <Radio
                                color='default'
                                sx={{
                                    color: '#000',
                                    p: 0
                                }}
                                checked={activePaymentMethod === method}
                                size='small'
                                disableRipple
                            />
                            <Box
                                sx={{
                                    border: '1px solid #d1d7dc',
                                    background: '#fff',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {defIcon}
                            </Box>
                            <div>
                                {title}
                            </div>
                        </Stack>
                        <Stack
                            direction='row'
                            spacing={0.2}
                            alignItems='center'
                            flexWrap='wrap'
                        >
                            {method !== activePaymentMethod && icons?.map((icon, i) => (
                                <Stack
                                    key={i}
                                    sx={{
                                        border: '1px solid #d1d7dc',
                                        background: '#fff',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    {icon}
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </AccordionSummary>
                {method === activePaymentMethod &&
                    <AccordionDetails>
                        {children}
                    </AccordionDetails>
                }
            </Accordion>
        )
    }

    return (
        <Stack
            sx={{
                border: '1px solid #D3D7DB'
            }}
        >
            {paymentMethods.map((method, i) => (
                <Box
                    sx={{
                        "&:not(:last-child)": {
                            borderBottom: '1px solid #D3D7DB',
                        }
                    }}
                    key={i}
                >
                    <RadioGroup>
                        <AccordionGenerator
                            method={method.method}
                            title={method.title}
                            icons={method.icons}
                            defIcon={method.defIcon}
                        >
                            {method.component}
                        </AccordionGenerator>
                    </RadioGroup>
                </Box>
            ))}
        </Stack>
    )
}
