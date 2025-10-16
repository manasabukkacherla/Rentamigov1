import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Propertydetail from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Propertydetail />
  </StrictMode>
);
