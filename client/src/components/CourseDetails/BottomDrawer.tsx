import { Drawer } from '@mui/material'
import React from 'react'

type BottomDrawerProps = {
    open: boolean,
    onClose: () => void,
    children?: string | React.ReactNode | React.ReactNode[]
}

export default function BottomDrawer({ open, onClose: toggleDrawer, children }: BottomDrawerProps) {
    return (
        <Drawer
            anchor='bottom'
            open={open}
            onClose={toggleDrawer}
            PaperProps={{
                sx: {
                    maxWidth: {
                        xs: '100%',
                        md: 600,
                    },
                    p: 3,
                    position: 'relative',
                    background: theme => theme.palette.common.black,
                    color: '#fff',
                    maxHeight: '95%'
                }
            }}
            ModalProps={{
                sx: {
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                    background: '#00000080'
                }
            }}
        >
            {children}
        </Drawer>
    )
}
