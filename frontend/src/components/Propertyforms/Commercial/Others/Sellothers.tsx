//sellothers
import React from 'react';
import OtherAddProperty from '../OtherAddProperty';
import PossessionInfo from '../PossessionInfo';
import WarehouseProperty from '../WarehouseProperty';
import FinancialPrice from '../FinancialPrice';
import Negotiable from '../Negotiable';
import TaxGovtCharges from '../TaxGovtCharges';
import DgUpsCharges from '../DgUpsCharges';
import Floors from '../Floors';
import Parking from '../Parking';
import Facilities from '../Facilities';
import OtherDetails from '../OtherDetails';
import ButtonComponent from '../ButtonComponent';

const SellOthers = () => {
  return (
    <div className="sell-others-container">
      <h2>Sell Other Property Details</h2>
      <OtherAddProperty />
      <PossessionInfo />
      <WarehouseProperty />
      <FinancialPrice />
      <Negotiable />
      <TaxGovtCharges />
      <DgUpsCharges />
      <Floors />
      <Parking />
      <Facilities />
      <OtherDetails />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default SellOthers;
