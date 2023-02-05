import { ExpandMore } from '@mui/icons-material'
import { NativeSelect, Stack, Typography } from '@mui/material'
import { PaymentMethodProps } from '../..'

export default function MobileWallets({ formValues: { register, formState: { errors } }, wallets }: PaymentMethodProps) {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.substring(1)

    return (
        <Stack
            sx={{
                py: 4,
                px: 2
            }}
            spacing={2}
        >
            <Typography>
                In order to complete your transaction, we will transfer you over to Razorpay's secure servers.
            </Typography>
            <Stack
                spacing={0.5}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    sx={{
                        border: theme => `1px solid ${errors.wallet ? theme.palette.error.main : theme.palette.common.black}`,
                        py: 1,
                        px: 1.5,
                        width: '100%',
                        transition: '0.3s all ease',
                        "&:hover": {
                            background: 'rgba(0,0,0,0.04)'
                        }
                    }}
                    spacing={2}
                >
                    <NativeSelect
                        fullWidth
                        IconComponent={() => null}
                        id='sort-by'
                        error={!!errors.wallet}
                        disableUnderline
                        inputProps={{
                            sx: {
                                "&:focus": {
                                    background: 'none'
                                }
                            },
                        }}
                        defaultValue='disabled'
                        {...register('wallet', {
                            validate: (value) => value !== 'disabled' || 'Please select a wallet'
                        })}
                    >
                        <option
                            disabled
                            value='disabled'
                        >
                            Please select...
                        </option>
                        {wallets && Object.keys(wallets).map((wallet, i) => {
                            return (
                                wallets[wallet] && <option
                                    value={wallet}
                                    key={i}
                                >
                                    {capitalize(wallet)}
                                </option>
                            )
                        })}
                    </NativeSelect>
                    <ExpandMore />
                </Stack>
                <Typography
                    variant='caption'
                    sx={{
                        color: theme => theme.palette.error.main
                    }}
                >
                    {errors.wallet?.message?.toString()}
                </Typography>
            </Stack>
        </Stack>
    )
}
