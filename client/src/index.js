import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';
import appStore from './redux/appStore';
import {Provider} from "react-redux"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={appStore}>
        <AppRouter />
    </Provider>
);

