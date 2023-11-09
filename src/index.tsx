import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import App from './App';
import { RootStore, rootStoreContext } from './store/RootStore';

import './index.scss';
import './variables.scss';

const rootDiv = document.createElement('div');
rootDiv.setAttribute("id", "root");
document.body.appendChild(rootDiv);

document.createElement('root');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <rootStoreContext.Provider value={new RootStore()}>
        <App />
      </rootStoreContext.Provider>
    </Router>
  </React.StrictMode>
);