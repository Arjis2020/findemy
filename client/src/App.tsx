import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import './index.css';
import Router from './Router';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
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
        xl: 1536,
        mobile: 0,
        tablet: 890,
        laptop: 1024,
        desktop: 1200,
      }
    }
  })
  return (
    <ThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <div className='container'>
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
