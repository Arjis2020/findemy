import { Avatar } from '@mui/material'
import UserMenu from './UserMenu';

type UserAvatarProps = {
    name: string,
}

export default function UserAvatar({ name }: UserAvatarProps) {
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
