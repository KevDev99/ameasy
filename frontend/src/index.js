import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './app/store';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#1565c0",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#4caf50',
      contrastText: '#000'
    },
    white: {
      main: '#fff'
    }
  },
  typography: {
    fontFamily: 'Lato'
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
