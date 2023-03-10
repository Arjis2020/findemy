import HoverPopover from 'material-ui-popup-state/HoverPopover'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'
import React from 'react'
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
// import { LoginAction, triggerLogout } from '../../redux/actions/auth.action'
import { Link, useNavigate } from 'react-router-dom'
import { CartState } from '../../redux/reducers/cart.reducer'
import { triggerLogout } from '../../redux/reducers/auth.reducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'

const MenuContents = () => {
    const user = useAppSelector((state) => state.authReducer)
    const splittedName = user.data?.name.split(' ')
    const initials = splittedName?.at(0)?.charAt(0)?.concat(splittedName?.at(1)?.charAt(0) || "")

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(triggerLogout())
        navigate('/')
    }

    const cart = useSelector<RootState>((state) => state.cartReducer) as CartState

    return (
        <Stack
            divider={<Divider />}
        >
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
                p={2}
            >
                <Avatar
                    sx={{
                        height: 60,
                        width: 60,
                        fontFamily: 'UdemySansBold',
                        fontSize: 24,
                        background: '#000'
                    }}
                >
                    {initials}
                </Avatar>
                <Stack>
                    <Typography
                        fontFamily='UdemySansBold'
                    >
                        {user.data?.name}
                    </Typography>
                    <Typography
                        noWrap
                        maxWidth={'90%'}
                        textOverflow='ellipsis'
                        variant='caption'
                    >
                        {user.data?.email}
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                sx={{
                    p: 2
                }}
                spacing={1.5}
            >
                <Link
                    to='my-learning'
                    className='link-unstyled'
                >
                    <Typography
                        fontSize={14}
                    >
                        My learning
                    </Typography>
                </Link>
                <Link
                    to='/cart'
                    className='link-unstyled'
                >
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Typography
                            fontSize={14}
                        >
                            My cart
                        </Typography>
                        <Box
                            sx={{
                                borderRadius: '50%',
                                background: '#a435f0',
                                p: 0.2,
                                height: 23,
                                width: 23,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography
                                fontSize={14}
                                fontFamily='UdemySansBold'
                            >
                                {cart.data.orders.length}
                            </Typography>
                        </Box>
                    </Stack>
                </Link>
                <Link
                    to='/help'
                    className='link-unstyled'
                >
                    <Typography
                        fontSize={14}
                    >
                        Help
                    </Typography>
                </Link>
                <Button
                    variant='text'
                    onClick={logout}
                    disabled={user.isLoading}
                    sx={{
                        background: 'none',
                        "&:hover": {
                            background: 'none'
                        },
                        textTransform: 'none',
                        textAlign: 'left',
                        justifyContent: 'start',
                        minWidth: 0,
                        p: 0
                    }}
                    disableElevation
                    disableRipple
                >
                    <Typography
                        fontSize={14}
                        className='link-unstyled'
                        sx={{
                            "&:hover": {
                                cursor: 'pointer'
                            }
                        }}
                    >
                        Log out
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    )
}

const UserMenu = ({ children }: any) => {
    return (
        <PopupState variant="popover" popupId="demoPopover">
            {(popupState) => (
                <div>
                    {
                        React.cloneElement(children, {
                            ...children.props,
                            ...bindHover(popupState)
                        })
                    }
                    <HoverPopover
                        {...bindPopover(popupState)}
                        PaperProps={{
                            sx: {
                                minWidth: '17rem'
                            }
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuContents />
                    </HoverPopover>
                </div>
            )}
        </PopupState>
    )
}

export default UserMenu