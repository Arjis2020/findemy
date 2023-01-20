import { Container, Stack, Typography } from '@mui/material'
import { FieldValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { triggerSignup, TriggerSignupAction } from '../../redux/actions/auth.action'
import Details from './Details'

export default function Signup() {
    const dispatch = useDispatch()

    const onSignup = (values: FieldValues) => {
        dispatch(triggerSignup(values as TriggerSignupAction))
    }

    return (
        <Container
            maxWidth='xs'
        >
            <Stack
                spacing={2}
                sx={{
                    my: 5
                }}
            >
                <Typography
                    fontFamily='UdemySansBold'
                >
                    Sign up and start learning
                </Typography>
                <Stack
                    spacing={1}
                >
                    <Details
                        onSignup={onSignup}
                    />
                </Stack>
            </Stack>
        </Container>
    )
}
