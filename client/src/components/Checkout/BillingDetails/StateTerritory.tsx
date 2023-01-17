import { ExpandMore } from '@mui/icons-material'
import { FormControl, NativeSelect, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

export default function StateTerritory() {
    const stateTerritories = [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Goa',
        'Gujurat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu and Kashmir',
        'Jharkhand',
        'Karnataka',
        'Kerela',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'NCT of Delhi',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttarakhand',
        'Uttar Pradesh',
        'West Bengal'
    ]

    return (
        <Stack
            spacing={1}
            flex={1}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography
                    sx={{
                        fontFamily: 'UdemySansBold',
                        color: theme => theme.palette.common.black,
                        fontSize: 14
                    }}
                >
                    State / Union Territory
                </Typography>
                <Typography
                    variant='caption'
                >
                    Required
                </Typography>
            </Stack>
            <FormControl
                fullWidth
                variant='standard'
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    sx={{
                        // minWidth: '11rem',
                        // width: matches ? '100%' : 'unset',
                        border: theme => `1px solid ${theme.palette.common.black}`,
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
                        disableUnderline
                        inputProps={{
                            sx: {
                                "&:focus": {
                                    background: 'none'
                                }
                            },
                            required: true
                        }}
                        value='disabled'
                    // value={age}
                    // label="Age"
                    // onChange={handleChange}
                    >
                        <option
                            disabled
                            value='disabled'
                        >
                            Please select...
                        </option>
                        {stateTerritories.map(item => {
                            return (
                                <option
                                    value={item}
                                >
                                    {item}
                                </option>
                            )
                        })}
                    </NativeSelect>
                    <ExpandMore />
                </Stack>
            </FormControl>
        </Stack>
    )
}
