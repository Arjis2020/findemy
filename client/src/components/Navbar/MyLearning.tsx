import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MyLearning() {
  return (
    <Link
        to='/my-learning'
        className='link-unstyled'
    >
        <Typography
            variant='body2'
        >
            My learning
        </Typography>
    </Link>
  )
}
