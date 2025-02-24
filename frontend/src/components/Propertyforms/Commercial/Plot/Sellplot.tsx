//plotsell
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PlotProperty from '../PlotProperty';
import FinancialPrice from '../FinancialPrice';
import Negotiable from '../Negotiable';
import TaxGovtCharges from '../TaxGovtCharges';
import OtherDetails from '../OtherDetails';
import ButtonComponent from '../ButtonComponent';

const SellPlot = () => {
  return (
    <div className="sell-plot-container">
      <h2>Sell Plot Details</h2>
      <PropertyDetailsForm />
      <PlotProperty />
      <FinancialPrice />
      <Negotiable />
      <TaxGovtCharges />
      <OtherDetails />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default SellPlot;
