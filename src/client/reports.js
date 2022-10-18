const React = require('react');
const ReactDOM = require('react-dom');

require('../pages/reports/reports.scss');

const { View } = require('../pages/reports/view');
ReactDOM.hydrate(<View />, document.getElementById('app'));