//selloffice
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import AboutProperty from '../AboutProperty';
import FinancialPrice from '../FinancialPrice';
import Negotiable from '../Negotiable';
import TaxGovtCharges from '../TaxGovtCharges';
import DgUpsCharges from '../DgUpsCharges';
import Floors from '../Floors';
import LiftsStaircases from '../LiftsStaircases';
import Parking from '../Parking';
import SellFacilities from '../SellFacilities';
import OtherDetails from '../OtherDetails';
import ButtonComponent from '../ButtonComponent';

const SellOffice = () => {
  return (
    <div className="sell-office-container">
      <h2>Sell Office Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
      <AboutProperty />
      <FinancialPrice />
      <Negotiable />
      <TaxGovtCharges />
      <DgUpsCharges />
      <Floors />
      <LiftsStaircases />
      <Parking />
      <SellFacilities />
      <OtherDetails />
      <ButtonComponent label="Submit" onClick={() => alert('Form Submitted')} />
    </div>
  );
};

export default SellOffice;
