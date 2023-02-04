import { Container, Stack, Typography } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'
import { triggerLogin } from '../../redux/reducers/auth.reducer'
// import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
// import { triggerLogin, TriggerLoginAction } from '../../redux/actions/auth.action'
import EmailPassword, { ILoginForm } from './EmailPassword'
import Methods from './Methods'

export default function Login() {
  const dispatch = useAppDispatch()

  const onLogin: SubmitHandler<ILoginForm> = (values) => {
    dispatch(triggerLogin(values))
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
          Log in to your Udemy account
        </Typography>
        <Stack
          spacing={1}
        >
          <Methods />
          <EmailPassword
            onLogin={onLogin}
          />
        </Stack>
      </Stack>
    </Container>
  )
}
