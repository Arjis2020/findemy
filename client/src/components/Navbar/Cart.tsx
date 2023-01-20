import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <Link
      to='/cart'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ShoppingCartOutlinedIcon
        sx={{
          color: '#000'
        }}
      />
    </Link>
  )
}
