import React from 'react';
import Main from './pages/Main';
import Header from './pages/Header';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
