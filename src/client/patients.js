const React = require('react');
const ReactDOM = require('react-dom');

require('../pages/patients/patients.scss');

const { View } = require('../pages/patients/view');
ReactDOM.hydrate(<View />, document.getElementById('app'));