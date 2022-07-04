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
      userStore: new UserStore(),
      deviceStore: new DeviceStore(),
      typeStore: new TypeStore(),
      brandStore: new BrandStore(),
  }}>
    <App />
  </Context.Provider>
);



