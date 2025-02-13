//rentretail
import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import RetailPropertyDetail from '../RetailPropertyDetail';
import Financials from '../Financials';
import Negotiable from '../Negotiable';
import ElectricityCharges from '../ElectricityCharges';
import WaterCharges from '../WaterCharges';
import PeriodDetails from '../PeriodDetails';
import Floors from '../Floors';
import LiftsStaircases from '../LiftsStaircases';
import Parking from '../Parking';
import Facilities from '../Facilities';

const RentRetailShop = () => {
  return (
    <div className="rent-retail-shop-container">
      <h2>Rent Retail Shop Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
      <RetailPropertyDetail />
      <Financials />
      <Negotiable />
      <ElectricityCharges />
      <WaterCharges />
      <PeriodDetails />
      <Floors />
      <LiftsStaircases />
      <Parking />
      <Facilities />
    </div>
  );
};

export default RentRetailShop;
