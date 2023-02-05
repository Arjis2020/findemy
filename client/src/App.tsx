import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import './index.css';
import Router from './Router';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useAppDispatch } from './redux/store';
import { triggerAuthorize } from './redux/reducers/auth.reducer';


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

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(triggerAuthorize())
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
