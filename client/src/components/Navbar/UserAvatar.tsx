import { Avatar } from '@mui/material'
import { User } from '../../API/responseTypes/auth.type'
import UserMenu from './UserMenu';

export default function UserAvatar({ name }: Partial<User>) {
    const [firstname, lastname] = name?.split(' ')!
    const initials = (firstname.charAt(0) + lastname.charAt(0)).toUpperCase()

    return (
        <UserMenu>
            <Avatar
                sx={{
                    background: '#000',
                    height: 35,
                    width: 35,
                    fontFamily: 'UdemySansBold',
                    fontSize: 14,
                    "&:hover" : {
                        cursor: 'pointer'
                    }
                }}
            >
                {initials}
            </Avatar>
        </UserMenu>
    )
}
