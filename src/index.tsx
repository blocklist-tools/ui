import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
