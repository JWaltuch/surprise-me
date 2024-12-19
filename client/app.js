import React from 'react';

import {default as Navbar} from './components/navbar.js';
import Routes from './routes.js';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
