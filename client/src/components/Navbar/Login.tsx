import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <Link
            to='/login'
            style={{
                textDecoration: 'none'
            }}
        >
            <Button
                sx={{
                    textTransform: 'none',
                    border: '1px solid #000',
                    borderRadius: 0,
                    fontFamily: 'UdemySansBold',
                    color: '#000'
                }}
            >
                Log in
            </Button>
        </Link>
    )
}
