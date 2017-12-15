import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


//referenced for importing fontawesome https://stackoverflow.com/questions/23116591/how-to-include-a-font-awesome-icon-in-reacts-render

