import React from 'react';
import Main from './pages/Main';
import Header from './pages/Header';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MonsterManagerProvider } from './context/MonsterManagerContext';

function App(): JSX.Element {
  return (
    <React.StrictMode>
      <MonsterManagerProvider>
        <div className="App">
          <Header />
          <Main />
        </div>
      </MonsterManagerProvider>
    </React.StrictMode>
  );
}

export default App;
