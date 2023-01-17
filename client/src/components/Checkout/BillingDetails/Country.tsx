import { ExpandMore, Language } from '@mui/icons-material'
import { FormControl, NativeSelect, Stack, Typography } from '@mui/material'

export default function Country() {
    const countries = [
        'India'
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
                    Country
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
                    <Language />
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
                        value='India'
                    // value={age}
                    // label="Age"
                    // onChange={handleChange}
                    >
                        <option
                            disabled
                        >
                            Please select...
                        </option>
                        {countries.map(item => {
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
