//sellwarehouse
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import WarehouseProperty from '../WarehouseProperty';
import FinancialPrice from '../FinancialPrice';
import Negotiable from '../Negotiable';
import TaxGovtCharges from '../TaxGovtCharges';
import Floors from '../Floors';
import Facilities from '../Facilities';
import OtherDetails from '../OtherDetails';
import ButtonComponent from '../ButtonComponent';

const SellWarehouse = () => {
  return (
    <div className="sell-warehouse-container">
      <h2>Sell Warehouse Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
      <WarehouseProperty />
      <FinancialPrice />
      <Negotiable />
      <TaxGovtCharges />
      <Floors />
      <Facilities />
      <OtherDetails />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default SellWarehouse;
