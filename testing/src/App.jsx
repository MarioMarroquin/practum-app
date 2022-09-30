import React, { useState } from "react";
import Login from "./views/auth/login";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  if (!isLogged) {
    return <Login />;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
