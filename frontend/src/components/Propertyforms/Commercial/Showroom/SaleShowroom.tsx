//sellshowroom
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import RetailPropertyDetail from '../RetailPropertyDetail';
import FinancialPrice from '../FinancialPrice';
import Negotiable from '../Negotiable';
import TaxGovtCharges from '../TaxGovtCharges';
import Floors from '../Floors';
import Parking from '../Parking';
import Facilities from '../Facilities';
import OtherDetails from '../OtherDetails';
import ButtonComponent from '../ButtonComponent';

const SellShowroom = () => {
  return (
    <div className="sell-showroom-container">
      <h2>Sell Showroom Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
      <RetailPropertyDetail />
      <FinancialPrice />
      <Negotiable />
      <TaxGovtCharges />
      <Floors />
      <Parking />
      <Facilities />
      <OtherDetails />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default SellShowroom;
