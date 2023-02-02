import { Box, Button } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';

export default function Languages() {
  return (
    <Button
        sx={{
            border: theme => `2px solid ${theme.palette.common.black}`,
            display: 'flex',
            alignItems: 'center',
            minWidth: 0,
            borderRadius: 0,
            color: 'inherit'
        }}
    >
        <LanguageIcon />
    </Button>
  )
}
