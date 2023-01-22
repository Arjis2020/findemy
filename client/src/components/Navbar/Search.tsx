import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { FieldValues, useForm } from 'react-hook-form';

type SearchProps = {
    onSearch: (values: FieldValues) => void
}

export default function Search({ onSearch }: SearchProps) {
    const { handleSubmit, register } = useForm()

    return (
        <form onSubmit={handleSubmit(onSearch)}>
            <TextField
                variant='outlined'
                aria-label='search-box'
                autoComplete='off'
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
                    "aria-label": 'search'
                }}
                size='small'
                placeholder='Search for anything'
                {...register('search', {
                    required: true,
                    minLength: 3
                })}
            />
        </form>
    )
}
