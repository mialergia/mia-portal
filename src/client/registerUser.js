const React = require('react');
const ReactDOM = require('react-dom');

require('../pages/registerUser/register_user.scss');

const { View } = require('../pages/registerUser/view');
ReactDOM.hydrate(<View />, document.getElementById('app'));