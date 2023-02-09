import React from 'react';
import ReactDOM from 'react-dom/client';

import { Calculator } from './components/calculator';
import { useCalculator } from './lib/use-calculator';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Calculator useCalculator={useCalculator} />
  </React.StrictMode>,
);
