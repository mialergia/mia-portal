const React = require('react');
const { View } = require('../pages/registerUser/view');
import { createRoot } from 'react-dom/client';

require('../pages/registerUser/register_user.scss');

const root = createRoot(document.getElementById('app')); // 
root.render(<View />);