import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <Link
            to='/signup'
            style={{
                textDecoration: 'none'
            }}
        >
            <Button
                sx={{
                    textTransform: 'none',
                    border: theme => `1px solid ${theme.palette.common.black}`,
                    borderRadius: 0,
                    background: theme => theme.palette.common.black,
                    color: '#fff',
                    fontFamily: 'UdemySansBold',
                    transition: 'none',
                    whiteSpace: 'nowrap',
                    "&:hover": {
                        background: '#000'
                    }
                }}
            >
                Sign up
            </Button>
        </Link>
    )
}
