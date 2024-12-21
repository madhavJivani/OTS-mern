import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../store/store.js';
import Modal from "react-modal";

Modal.setAppElement("#root");


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
);
