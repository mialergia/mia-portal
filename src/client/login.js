const React = require('react');
const { View } = require('../pages/login/view');
import { createRoot } from 'react-dom/client';

require('../pages/login/login.scss');

const root = createRoot(document.getElementById('app')); // 
root.render(<View />);