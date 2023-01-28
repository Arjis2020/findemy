import { Stack } from '@mui/material'
import Banner from './Banner'
import Content from './Content'

export default function MyLearnings() {
  return (
    <Stack
      sx={{
        mb: 10
      }}
    >
        <Banner />
        <Content />
    </Stack>
  )
}
