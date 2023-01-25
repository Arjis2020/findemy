import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { LoginAction, triggerUserAuthorize } from './redux/actions/auth.action';
import { RootState } from './redux/reducers';
import { LoginStateAction } from './redux/reducers/auth.reducer';
import Router from './Router';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#a435f0',
        contrastText: '#fff'
      },
      common: {
        black: '#1c1d1f'
      }
    },
    typography: {
      fontFamily: 'UdemySansRegular'
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1300,
        mobile: 0,
        tablet: 890,
        laptop: 1024,
        desktop: 1200,
      }
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(triggerUserAuthorize())
  }, [])

  return (
    <ThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <LocalizationProvider
        dateAdapter={AdapterMoment}
      >
        <Router />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
