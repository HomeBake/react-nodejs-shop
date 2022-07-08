import React, {createContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import ContextProvider from "./components/ContextProvider";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <ContextProvider>
      <App/>
  </ContextProvider>
);



