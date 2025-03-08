import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PropertpageM from './Propertydetailspage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PropertpageM />
  </StrictMode>
);
