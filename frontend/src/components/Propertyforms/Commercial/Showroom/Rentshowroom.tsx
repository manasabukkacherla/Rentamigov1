//showroom
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import RetailPropertyDetail from '../RetailPropertyDetail';
import Financials from '../Financials';
import Negotiable from '../Negotiable';
import TaxGovtCharges from '../TaxGovtCharges';
import ElectricityCharges from '../ElectricityCharges';
import PeriodDetails from '../PeriodDetails';
import Floors from '../Floors';
import Parking from '../Parking';
import Facilities from '../Facilities';
import ButtonComponent from '../ButtonComponent';

const RentShowroom = () => {
  return (
    <div className="rent-showroom-container">
      <h2>Rent Showroom Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
      <RetailPropertyDetail />
      <Financials />
      <Negotiable />
      <TaxGovtCharges />
      <ElectricityCharges />
      <PeriodDetails />
      <Floors />
      <Parking />
      <Facilities />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default RentShowroom;
