import React from 'react';
import PropertyDetailsForm from '../PropertyDetailsForm';
import PossessionInfo from '../PossessionInfo';
import AboutProperty from '../AboutProperty';
import Financials from '../Financials';
import Negotiable from '../Negotiable';
import DgUpsCharges from '../DgUpsCharges';
import ElectricityCharges from '../ElectricityCharges';
import WaterCharges from '../WaterCharges';
import PeriodDetails from '../PeriodDetails';
import Floors from '../Floors';
import LiftsStaircases from '../LiftsStaircases';
import Parking from '../Parking';

const RentOffice = () => {
  return (
    <div className="rent-office-container">
      <h2>Rent Office Details</h2>
      <PropertyDetailsForm />
      <PossessionInfo />
      <AboutProperty />
      <Financials />
      <Negotiable />
      <DgUpsCharges />
      <ElectricityCharges />
      <WaterCharges />
      <PeriodDetails />
      <Floors />
      <LiftsStaircases />
      <Parking />
    </div>
  );
};

export default RentOffice;
