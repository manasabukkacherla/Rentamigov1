//plot 
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import PlotProperty from '../PlotProperty';
import Financials from '../Financials';
import Negotiable from '../Negotiable';
import ElectricityCharges from '../ElectricityCharges';
import PeriodDetails from '../PeriodDetails';
import ButtonComponent from '../ButtonComponent';

const RentPlot = () => {
  return (
    <div className="rent-plot-container">
      <h2>Rent Plot Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
      <PlotProperty />
      <Financials />
      <Negotiable />
      <ElectricityCharges />
      <PeriodDetails />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default RentPlot;
