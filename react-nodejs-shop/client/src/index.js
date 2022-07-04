import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import TypeStore from "./store/TypeStore";
import BrandStore from "./store/BrandStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
      user: new UserStore(),
      devices: new DeviceStore(),
      types: new TypeStore(),
      brands: new BrandStore(),
  }}>
    <App />
  </Context.Provider>
);



