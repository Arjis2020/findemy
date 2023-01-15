import { Container, Stack, Typography } from '@mui/material'
import EmailPassword from './EmailPassword'
import Methods from './Methods'

export default function Login() {
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
          <EmailPassword />
        </Stack>
      </Stack>
    </Container>
  )
}
