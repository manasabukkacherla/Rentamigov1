//others
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import WarehouseProperty from '../WarehouseProperty';
import Financials from '../Financials';
import Negotiable from '../Negotiable';
import ElectricityCharges from '../ElectricityCharges';
import WaterCharges from '../WaterCharges';
import PeriodDetails from '../PeriodDetails';
import Floors from '../Floors';
import Parking from '../Parking';
import Facilities from '../Facilities';
import ButtonComponent from '../ButtonComponent';

const RentOther = () => {
  return (
    <div className="rent-other-container">
      <h2>Rent Other Property Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
       <WarehouseProperty />
      <Financials />
      <Negotiable />
      <ElectricityCharges />
      <WaterCharges />
      <PeriodDetails />
      <Floors />
      <Parking />
      <Facilities />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default RentOther;
