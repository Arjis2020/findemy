import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { CartAction } from '../../redux/reducers/cart.reducer';

export default function Cart() {
  const cart = useSelector<RootState>((state) => state.cartReducer) as CartAction
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false)

  useEffect(() => {
    setShouldAnimate(true)
  }, [cart.itemsConsolidated])

  // const [items, setItems] = useState(0)

  // useEffect(() => {
  //   setShouldAnimate(true)
  // }, [items])

  return (
    <Link
      to='/cart'
    >
    {/* <Button
      onClick={() => setItems(items + 1)}
    > */}
      <Box
        sx={{
          position: 'relative',
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
        <div
          // key={cart.items.length}
          onAnimationEnd={() => setShouldAnimate(false)}
          className={`cart-badge ${shouldAnimate ? 'cart-badge-animate' : ''}`}
        >
          <Typography
            fontSize={14}
            fontFamily='UdemySansBold'
          >
            {cart.itemsConsolidated.length}
            {/* {items} */}
          </Typography>
        </div>
      </Box>
    </Link>
    // </Button>
  )
}
