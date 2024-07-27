import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AppRouter from './AppRouter2';
// import store from './redux/store';
import appStore from './redux/appStore';
import {Provider} from "react-redux"
// console.log("index-->",AppRouter2)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={appStore}>
        <AppRouter />
    </Provider>
);

