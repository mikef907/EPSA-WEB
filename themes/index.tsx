import { createMuiTheme } from '@material-ui/core/styles';

// const getTheme = () => {
//   let overwrites = {
//     "palette": {
//         "accent1Color": Colors.orange300
//     }
// };
//   return getMuiTheme(baseTheme, overwrites);
// }
// import red from '@material-ui/core/colors/red';

// Create a theme instance.
//const theme = createMuiTheme({});

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#26c6da',
      light: '#6ff9ff',
      dark: '#0095a8',
    },
    secondary: {
      main: '#e65100',
      light: '#ff833a',
      dark: '#ac1900',
    },
    success: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23',
    },
    warning: {
      main: '#ffeb3b',
      light: '#ffff72',
      dark: '#c8b900',
    },
    error: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
