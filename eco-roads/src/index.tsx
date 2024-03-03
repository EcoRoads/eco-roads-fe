import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/index.css';
import {EcoRoadsMap} from './views/EcoTruckMap/EcoRoadsMap';
import {Provider} from "react-redux";
import store from "./store/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <EcoRoadsMap/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

