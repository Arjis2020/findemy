import { Box, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ISearchForm } from '../Navbar/Search'
import Carousel from './Carousel'
import Topics from './Topics'
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Close } from '@mui/icons-material'
import { toggleMobileSearchVisibility } from '../../redux/reducers/static.reducer'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const { handleSubmit, register } = useForm<ISearchForm>()
    const statics = useAppSelector(state => state.staticReducer)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const onSearch: SubmitHandler<ISearchForm> = (values) => {
        navigate(`/search?q=${values.search}&page=1`)
        dispatch(toggleMobileSearchVisibility())
    }

    const MobileSearch = () => (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 9999,
                background: 'white',
            }}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                p={2}
                alignItems='center'
                width='100%'
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                >
                    <SearchIcon
                        sx={{
                            color: '#000'
                        }}
                    />
                    <form
                        style={{
                            width: '100%',
                        }}
                        onSubmit={handleSubmit(onSearch)}
                    >
                        <TextField
                            variant='standard'
                            placeholder='Search for anything'
                            InputProps={{
                                disableUnderline: true
                            }}
                            fullWidth
                            {...register('search', {
                                required: true,
                                minLength: 3
                            })}
                        />
                        <input type='submit' hidden />
                    </form>
                </Stack>
                <IconButton
                    disableRipple
                    onClick={() => dispatch(toggleMobileSearchVisibility())}
                >
                    <Close
                        sx={{
                            color: '#000'
                        }}
                    />
                </IconButton>
            </Stack>
            <Divider flexItem />
        </Box>
    )

    return (
        statics.mobileSearch ?
            <MobileSearch />
            :
            <Stack
                spacing={2}
                mt={3}
                sx={{
                    position: 'relative'
                }}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize='1.5rem'
                    px={8}
                >
                    Students are viewing
                </Typography>
                <Carousel />
                <div
                    style={{
                        marginTop: 60
                    }}
                >
                    <Topics />
                </div>
            </Stack>
    )
}
