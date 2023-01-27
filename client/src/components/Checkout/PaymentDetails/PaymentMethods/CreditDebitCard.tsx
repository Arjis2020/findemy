import { Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { PaymentMethodProps } from '../..'
import { IconGenerator } from '../Methods';

export default function CreditDebitCard({ formValues: { register, formState: { errors }, setValue }, }: PaymentMethodProps) {
    const [cardIcon, setCardIcon] = useState<JSX.Element>(
        <IconGenerator
            height={18}
            icon="https://checkoutshopper-live-in.adyen.com/checkoutshopper/images/logos/nocard.svg"
        />
    )

    type CCards = 'visa' | 'mastercard' | 'diners' | 'discover' | 'rupay' | 'amex'

    const [cardType, setCardType] = useState<CCards | undefined>()

    function getCardIcon(number: string): JSX.Element {
        number = number.replace(/ /g, "")
        // visa
        var re = new RegExp("^4");
        if (number.match(re)) {
            setCardType('visa')
            return <IconGenerator
                height={18}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg'
            />
        }

        // Mastercard 
        // Updated for Mastercard 2017 BINs expansion
        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
            setCardType('mastercard')
            return <IconGenerator
                height={18}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg'
            />
        }

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null) {
            setCardType('amex')
            return <IconGenerator
                height={18}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg'
            />
        };

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null) {
            setCardType('discover')
            return <IconGenerator
                height={18}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-discover.svg'
            />
        };

        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null) {
            setCardType('diners')
            return <IconGenerator
                height={18}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-dinersclub.svg'
            />
        };

        // Rupay
        re = new RegExp("^6(?:0[0-9]{14}|52[12][0-9]{12})$")
        if (number.match(re) != null) {
            setCardType('rupay')
            return <IconGenerator
                height={18}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-rupay.svg'
            />
        }

        setCardType(undefined)
        return <IconGenerator
            height={18}
            icon="https://checkoutshopper-live-in.adyen.com/checkoutshopper/images/logos/nocard.svg"
        />;
    }

    function formatCard(value: string): string {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }

    function formatExpiry(value: string): string {
        return value.replace(
            /[^0-9]/g, '' // To allow only numbers
        ).replace(
            /^([2-9])$/g, '0$1' // To handle 3 > 03
        ).replace(
            /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^0{1,}/g, '0' // To handle 00 > 0
        ).replace(
            /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
        );
    }

    type CardIcons = {
        value: CCards,
        icon: JSX.Element
    }

    const cardIcons: CardIcons[] = [
        {
            value: 'visa',
            icon: <IconGenerator
                height={15}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg'
            />
        },
        {
            value: 'mastercard',
            icon: <IconGenerator
                height={15}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg'
            />
        },
        {
            value: 'amex',
            icon: <IconGenerator
                height={15}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg'
            />
        },
        {
            value: 'diners',
            icon: <IconGenerator
                height={15}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-dinersclub.svg'
            />
        },
        {
            value: 'discover',
            icon: <IconGenerator
                height={15}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-discover.svg'
            />
        },
        {
            value: 'rupay',
            icon: <IconGenerator
                height={15}
                icon='https://www.udemy.com/staticx/udemy/images/v9/card-rupay.svg'
            />
        },
    ]

    return (
        <Stack
            spacing={2}
            p={2}
        >
            <Stack
                spacing={1}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize={14}
                >
                    Name on card
                </Typography>
                <TextField
                    placeholder='Name on card'
                    error={!!errors.name}
                    helperText={errors.name?.message?.toString()}
                    InputProps={{
                        sx: {
                            borderRadius: 0
                        },
                    }}
                    inputProps={{
                        sx: {
                            py: 1.5
                        }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#000',
                            },
                            '&:hover fieldset': {
                                borderColor: '#000',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#000',
                            },
                        },
                    }}
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Name cannot be blank'
                        }
                    })}
                />
            </Stack>
            <Stack
                spacing={1}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize={14}
                >
                    Card number
                </Typography>
                <TextField
                    placeholder='0000 0000 0000 0000'
                    type='tel'
                    inputMode='numeric'
                    error={!!errors.number}
                    helperText={errors.number?.message?.toString()}
                    InputProps={{
                        sx: {
                            borderRadius: 0
                        },
                        endAdornment: <>{cardIcon}</>
                    }}
                    inputProps={{
                        sx: {
                            py: 1.5,
                            '&[type=number]': {
                                '-moz-appearance': 'textfield',
                            },
                            '&::-webkit-outer-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                            },
                            '&::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                            },
                        }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#000',
                            },
                            '&:hover fieldset': {
                                borderColor: '#000',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#000',
                            },
                        },
                    }}
                    {...register('number', {
                        required: {
                            value: true,
                            message: 'Card number cannot be blank'
                        },
                        validate: (value: string) => {
                            return value.length === 19 || "Please enter a valid card number"
                        },
                        onChange(event) {
                            setCardIcon(getCardIcon(event.target.value))
                            setValue('number', formatCard(event.target.value))
                        },
                    })}
                />
                <Stack
                    direction='row'
                    spacing={0.5}
                >
                    {cardIcons.map(icon => (
                        <Stack
                            sx={{
                                border: '1px solid #d1d7dc',
                                background: '#fff',
                                borderRadius: '4px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: '0.2s all ease',
                                opacity: cardType ? icon.value === cardType ? 1 : 0.2 : 1
                            }}
                        >
                            {icon.icon}
                        </Stack>
                    ))}
                </Stack>
            </Stack>
            <Stack
                direction='row'
                spacing={2}
            >
                <Stack
                    spacing={1}
                    flex={1}
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        fontSize={14}
                    >
                        Expiry date
                    </Typography>
                    <TextField
                        placeholder='MM/YY'
                        type='tel'
                        inputMode='numeric'
                        error={!!errors.expiry}
                        helperText={errors.expiry?.message?.toString()}
                        InputProps={{
                            sx: {
                                borderRadius: 0
                            },
                        }}
                        inputProps={{
                            sx: {
                                py: 1.5
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#000',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000',
                                },
                            },
                        }}
                        {...register('expiry', {
                            required: {
                                value: true,
                                message: 'Expiry date cannot be blank'
                            },
                            pattern: {
                                value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                message: 'Expiry date should be in MM/YY format',
                            },
                            onChange(event) {
                                setValue('expiry', formatExpiry(event.target.value))
                            }
                        })}
                    />
                </Stack>
                <Stack
                    spacing={1}
                    flex={1}
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        fontSize={14}
                    >
                        CVC/CVV
                    </Typography>
                    <TextField
                        placeholder='CVC'
                        type='password'
                        inputMode='numeric'
                        error={!!errors.cvv}
                        helperText={errors.cvv?.message?.toString()}
                        InputProps={{
                            sx: {
                                borderRadius: 0
                            },
                            endAdornment: <img
                                src='cvv.svg'
                            />
                        }}
                        inputProps={{
                            sx: {
                                py: 1.5,
                                '&[type=number]': {
                                    '-moz-appearance': 'textfield',
                                },
                                '&::-webkit-outer-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0,
                                },
                                '&::-webkit-inner-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0,
                                },
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#000',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000',
                                },
                            },
                        }}
                        {...register('cvv', {
                            required: {
                                value: true,
                                message: 'CVV / CVC cannot be blank'
                            },
                            pattern: {
                                value: /^\d{3}$/,
                                message: 'Enter a valid CVV / CVC'
                            },
                            maxLength: 3
                        })}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}
