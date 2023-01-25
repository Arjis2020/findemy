import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PaymentMethodProps } from '..'
import { SupportedPaymentMethods } from '../../../models/order.model'
import { setPaymentMethod } from '../../../redux/actions/payment.action'
import { RootState } from '../../../redux/reducers'
import { PaymentState } from '../../../redux/reducers/payment.reducer'
import CreditDebitCard from './PaymentMethods/CreditDebitCard'
import MobileBanking from './PaymentMethods/MobileBanking'
import NetBanking from './PaymentMethods/NetBanking'
import Paytm from './PaymentMethods/Paytm'
import UPI from './PaymentMethods/UPI'

export default function Methods({ register, errors }: PaymentMethodProps) {
    // const [activePaymentMethod, setActiveAccordion] = useState<number | undefined>()
    const payment = useSelector<RootState>((state) => state.paymentReducer) as PaymentState
    const activePaymentMethod = payment.method

    type AccordionGeneratorProps = PaymentMethodArgs

    type IconGeneratorProps = {
        icon: string,
    }

    type PaymentMethods = Array<PaymentMethodArgs>

    type PaymentMethodArgs = {
        method: SupportedPaymentMethods,
        title: string,
        icons?: Array<React.ReactElement>,
        children?: React.ReactElement,
        defIcon: React.ReactElement,
        component?: React.ReactElement
    }

    const IconGenerator = ({ icon }: IconGeneratorProps) => (
        <img
            src={icon}
            style={{
                height: 25,
                objectFit: 'cover',
            }}
        />
    )

    const paymentMethods: PaymentMethods = [
        {
            // id: 1,
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
                errors={errors}
                register={register}
            />
        },
        {
            method: 'upi',
            title: 'UPI',
            defIcon:
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/common-upi.svg'
                />,
            component: <UPI />
        },
        {
            method: 'paytm',
            title: 'PayTM',
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/hpp-paytm.svg'
            />,
            component: <Paytm

            />
        },
        {
            method: 'netbanking',
            title: 'Net Banking',
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/common-onlinebanking-in.svg'
            />,
            component: <NetBanking
                errors={errors}
                register={register}
            />
        },
        {
            method: 'mobile-wallet',
            title: 'Mobile Wallets',
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/common-wallet-in.svg'
            />,
            component: <MobileBanking
                errors={errors}
                register={register}
            />
        }
    ]

    const dispatch = useDispatch()
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
                            {icons?.map(icon => (
                                <Stack
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
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        )
    }

    return (
        <Stack
            sx={{
                border: '1px solid #D3D7DB'
            }}
        >
            {paymentMethods.map(method => (
                <Box
                    sx={{
                        "&:not(:last-child)": {
                            borderBottom: '1px solid #D3D7DB',
                        }
                    }}
                    key={method.method}
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
