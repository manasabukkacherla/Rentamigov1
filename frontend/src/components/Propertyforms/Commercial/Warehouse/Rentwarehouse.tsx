//warehouse
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import WarehouseProperty from '../WarehouseProperty';
import Financials from '../Financials';
import Negotiable from '../Negotiable';
import ElectricityCharges from '../ElectricityCharges';
import PeriodDetails from '../PeriodDetails';
import Floors from '../Floors';
import Facilities from '../Facilities';
import ButtonComponent from '../ButtonComponent';

const RentWarehouse = () => {
  return (
    <div className="rent-warehouse-container">
      <h2>Rent Warehouse Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
      <WarehouseProperty />
      <Financials />
      <Negotiable />
      <ElectricityCharges />
      <PeriodDetails />
      <Floors />
      <Facilities />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default RentWarehouse;
