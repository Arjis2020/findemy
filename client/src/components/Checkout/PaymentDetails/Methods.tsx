import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CreditDebitCard from './PaymentMethods/CreditDebitCard'
import MobileBanking from './PaymentMethods/MobileBanking'
import NetBanking from './PaymentMethods/NetBanking'
import Paytm from './PaymentMethods/Paytm'
import UPI from './PaymentMethods/UPI'

export default function Methods() {
    const [activeAccordion, setActiveAccordion] = useState<number | undefined>()

    type AccordionGeneratorProps = PaymentMethodArgs

    type IconGeneratorProps = {
        icon: string,
    }

    type PaymentMethods = Array<PaymentMethodArgs>

    type PaymentMethodArgs = {
        id: number,
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
            id: 1,
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
            component: <CreditDebitCard />
        },
        {
            id: 2,
            title: 'UPI',
            defIcon:
                <IconGenerator
                    icon='https://www.udemy.com/staticx/udemy/images/v9/common-upi.svg'
                />,
            component: <UPI />
        },
        {
            id: 3,
            title: 'PayTM',
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/hpp-paytm.svg'
            />,
            component: <Paytm />
        },
        {
            id: 4,
            title: 'Net Banking',
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/common-onlinebanking-in.svg'
            />,
            component: <NetBanking />
        },
        {
            id: 5,
            title: 'Mobile Wallets',
            defIcon: <IconGenerator
                icon='https://www.udemy.com/staticx/udemy/images/v9/common-wallet-in.svg'
            />,
            component: <MobileBanking />
        }
    ]

    const handleAccordionStateChange = (id: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        if (isExpanded)
            setActiveAccordion(id)
        else
            setActiveAccordion(undefined)
    }

    const AccordionGenerator = ({ id, title, icons, defIcon, children }: AccordionGeneratorProps) => {
        return (
            <Accordion
                elevation={0}
                disableGutters
                sx={{
                    px: 0,
                }}
                expanded={activeAccordion === id}
                onChange={handleAccordionStateChange(id)}
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
                        }
                    }}
                    disableRipple
                >
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignContent='center'
                        width='100%'
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
                                checked={activeAccordion === id}
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
                        >
                            {icons?.map(icon => (
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
                                    {icon}
                                </Box>
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
                    key={method.id}
                >
                    <RadioGroup>
                        <AccordionGenerator
                            id={method.id}
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
