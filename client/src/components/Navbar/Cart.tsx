import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { ILoginStateAction } from '../../redux/reducers/auth.reducer';
import { CartState } from '../../redux/reducers/cart.reducer';

export default memo(function Cart() {
  const cart = useSelector<RootState>((state) => state.cartReducer) as CartState
  const user = useSelector<RootState>((state) => state.authReducer) as ILoginStateAction

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
        {cart.orders.length > 0 && <div
          key={cart.orders.length}
          className='cart-badge cart-badge-animate'
        >
          <Typography
            fontSize={14}
            fontFamily='UdemySansBold'
          >
            {cart.orders.length}
          </Typography>
        </div>}
      </Box>
    </Link>
  )
})
