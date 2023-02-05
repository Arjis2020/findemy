import { Container, Stack, Typography } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'
import { triggerSignup } from '../../redux/reducers/auth.reducer'
import { useAppDispatch } from '../../redux/store'
// import { triggerSignup, TriggerSignupAction } from '../../redux/actions/auth.action'
import Details, { ISignupForm } from './Details'

export default function Signup() {
    const dispatch = useAppDispatch()
    // const { signup } = useAuth()

    const onSignup : SubmitHandler<ISignupForm> = (values: ISignupForm) => {
        // signup(values as { name: string, email: string, password: string })
        dispatch(triggerSignup(values))
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
