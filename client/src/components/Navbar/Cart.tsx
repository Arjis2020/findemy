import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <Link
      to='/cart'
    >
      <ShoppingCartOutlinedIcon
        sx={{
          mr: 1,
          color: '#000'
        }}
      />
    </Link>
  )
}
