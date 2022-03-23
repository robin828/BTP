import { createTheme } from '@mui/material/styles'
import red from '@mui/material/colors/red';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      commmon: '#ffffff'
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: red.A400,
    },
    background: {
        
      main: '#ffffff',
    },
  },
});

export default theme;