import { Container, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { triggerLogin, TriggerLoginAction } from '../../redux/actions/auth.action'
// import { triggerLogin, TriggerLoginAction } from '../../redux/actions/auth.action'
import EmailPassword from './EmailPassword'
import Methods from './Methods'

export default function Login() {
  const dispatch = useDispatch()
  // const { login } = useAuth()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (data?.data?._id) navigate(-1)
  // }, [data])

  const onLogin = (values: FieldValues) => {
    dispatch(triggerLogin(values as TriggerLoginAction))
    // login(values as { email: string, password: string })
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
