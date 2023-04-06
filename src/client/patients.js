const React = require('react');
const { View } = require('../pages/patients/view');
import { createRoot } from 'react-dom/client';

require('../pages/patients/patients.scss');

const root = createRoot(document.getElementById('app')); // 
root.render(<View />);