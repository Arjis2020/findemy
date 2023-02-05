import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

type PasswordStrengthProps = {
    password: string
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
    type StrengthProps = {
        active: boolean
    }

    type StrengthInterpreterProps = {
        strength: number
    }

    const [strength, setStrength] = useState(0)

    const computeStrength = () => {
        if (password.length >= 6) {
            let pwdStrength = 0;
            const validateRegex = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];
            validateRegex.forEach((regex, i) => {
                if (new RegExp(regex).test(password)) {
                    pwdStrength += 1;
                }
            });
            setStrength(pwdStrength)
        }
        else{
            setStrength(0)
        }
    }

    useEffect(() => {
        computeStrength()
    }, [password])

    const Strength = ({ active }: StrengthProps) => {
        return (
            <Box
                sx={{
                    height: '0.25rem',
                    width: '3.1rem',
                    background: theme => !active ? '#d1d7dc' : theme.palette.common.black,
                    borderRadius: 9999
                }}
            >

            </Box>
        )
    }

    const StrengthInterpreter = ({ strength }: StrengthInterpreterProps) => {
        let textualStrength

        switch (strength) {
            case 0:
                textualStrength = 'Invalid'
                break;
            case 1:
                textualStrength = 'Too weak'
                break;
            case 2:
                textualStrength = 'Could be stronger'
                break;
            case 3:
                textualStrength = 'Strong password'
                break;
            case 4:
                textualStrength = 'Very strong password'
                break;
            default:
                break;
        }

        return (
            <Typography
                variant='caption'
                sx={{
                    opacity: strength > 0 ? 1 : 0
                }}
            >
                {textualStrength}
            </Typography>
        )
    }

    return (
        <Stack
            direction='row'
            spacing={1}
            alignItems='center'
        >
            <Stack
                direction='row'
                spacing={0.3}
            >
                <Strength
                    active={strength >= 1}
                />
                <Strength
                    active={strength > 1}
                />
                <Strength
                    active={strength > 2}
                />
                <Strength
                    active={strength === 4}
                />
            </Stack>
            <StrengthInterpreter
                strength={strength}
            />
        </Stack>
    )
}
