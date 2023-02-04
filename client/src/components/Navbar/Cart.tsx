import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { CartState } from '../../redux/reducers/cart.reducer';
import { useAppSelector } from '../../redux/store';

export default memo(function Cart() {
  const cart = useAppSelector((state) => state.cartReducer)
  const user = useAppSelector((state) => state.authReducer)

  return (
    <Link
      to={user.data?._id ? '/cart' : '/login'}
    >
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
        {cart.data.orders.length > 0 && <div
          key={cart.data.orders.length}
          className='cart-badge cart-badge-animate'
        >
          <Typography
            fontSize={14}
            fontFamily='UdemySansBold'
          >
            {cart.data.orders.length}
          </Typography>
        </div>}
      </Box>
    </Link>
  )
})
