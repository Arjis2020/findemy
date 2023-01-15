import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
    return (
        <TextField
            variant='outlined'
            aria-label='search-box'
            InputProps={{
                startAdornment: <SearchIcon
                    sx={{
                        color: 'grey',
                        mr: 2
                    }}
                />,
                sx: {
                    borderRadius: 9999,
                    height: '2.7rem',
                    border: theme => `1px solid ${theme.palette.common.black}`,
                    background: '#f7f9fa',
                    fontSize: 14,
                    input: {
                        "&::placeholder": {
                            opacity: 1
                        },
                    },
                }
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        border: theme => `1px solid ${theme.palette.common.black}`,
                    }
                },
                width: '60vw',
                color: '#000',
            }}
            inputProps={{
                "aria-label" : 'search'
            }}
            size='small'
            placeholder='Search for anything'
        />
    )
}
