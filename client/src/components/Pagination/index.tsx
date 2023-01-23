import { ArrowBackIosSharp, ArrowForwardIosSharp } from '@mui/icons-material'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import usePagination from '@mui/material/usePagination/usePagination'

type PaginationProps = {
    count: number,
    onChange: (e: React.ChangeEvent<unknown>, page: number) => void,
    page: number
}

export default function Pagination({ count, onChange, page }: PaginationProps) {
    const { items } = usePagination({
        count,
        siblingCount: 0,
        onChange,
        hideNextButton: count <= 1,
        hidePrevButton: count <= 1,
        page
    })

    return (
        count > 1 ? <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            mt={5}
        >
            {items.map(({ page, type, selected, disabled, onClick }, index) => {
                let children = null;
                if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                    children = (
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            …
                        </Typography>
                    );
                }
                else if (type === 'page') {
                    children = (
                        <Button
                            variant='text'
                            sx={{
                                color: page === count ? '#000' : '#5624d0',
                                minWidth: 0,
                                borderBottom: selected ? '2px solid #000' : 'none',
                                borderRadius: 0,
                                fontFamily: 'UdemySansBold',
                                transition: '0.1s all ease',
                                "&:hover": {
                                    background: 'none',
                                }
                            }}
                            disableElevation
                            disableRipple
                            onClick={onClick}
                        >
                            {page}
                        </Button>
                    );
                } else {
                    children = (
                        <IconButton
                            sx={{
                                height: '2.5rem',
                                width: '2.5rem',
                                border: `1px solid ${disabled ? '#BEC7CF' : '#6a6f73'}`,
                                background: "none",
                                "&:hover": {
                                    background: "#00000010"
                                },
                            }}
                            onClick={onClick}
                            disabled={disabled}
                        >
                            {type === 'next' ?
                                <ArrowForwardIosSharp
                                    sx={{
                                        color: !disabled ? '#000' : 'inherit',
                                        fontSize: 14
                                    }}
                                    fontSize='small'
                                />
                                :
                                type === 'previous' && <ArrowBackIosSharp
                                    sx={{
                                        color: !disabled ? '#000' : 'inherit',
                                        fontSize: 14
                                    }}
                                />
                            }
                        </IconButton>
                    );
                }

                return (
                    <Typography
                        key={index}
                    >
                        {children}
                    </Typography>
                );
            })}
        </Stack>
        :
        null
    )
}
