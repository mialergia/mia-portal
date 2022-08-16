const React = require('react');
const ReactDOM = require('react-dom');

require('../pages/login/login.scss');

const { View } = require('../pages/login/view');
ReactDOM.hydrate(<View />, document.getElementById('app'));