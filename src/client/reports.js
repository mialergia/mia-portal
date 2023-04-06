const React = require('react');
const { View } = require('../pages/reports/view');
import { createRoot } from 'react-dom/client';

require('../pages/reports/reports.scss');

const root = createRoot(document.getElementById('app')); // 
root.render(<View />);