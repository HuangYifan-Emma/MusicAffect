import React from 'react';
import {deepPurple, indigo} from '@mui/material/colors';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Group2FormPage from './Group2FormPage';

let globalTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[100],
    },
    secondary: {
      main: indigo[100],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <div className="App">
        <Group2FormPage/>
      </div>
    </ThemeProvider>
  );
}

export default App;
