import React, { useState } from 'react';
import { FormData } from '../../../types/property';
import { Price, PriceData } from '../../../components/Price';
import { PricePerSqft } from '../../../components/PricePerSqft';
import { RegistrationCharges } from '../../../components/RegistrationCharges';
import { Brokerage } from '../../../components/Brokerage';

interface ExtendedFormData extends FormData {
  priceDetails: {
    propertyPrice: number;
    priceType: "fixed" | "negotiable";
    totalPrice: number;
    registrationCharges: number;
    brokerage: number;
  };
}

const [formData, setFormData] = useState<ExtendedFormData>({
  ...initialFormData,
  priceDetails: {
    propertyPrice: 0,
    priceType: "fixed",
    totalPrice: 0,
    registrationCharges: 0,
    brokerage: 0
  }
});

const handlePriceChange = (priceData: PriceData) => {
  setFormData((prev) => ({
    ...prev,
    priceDetails: {
      ...prev.priceDetails,
      propertyPrice: priceData.propertyPrice,
      priceType: priceData.priceType,
      totalPrice: priceData.totalPrice || 0
    }
  }));
};

<div className="space-y-8">
  <h3 className="text-xl font-semibold text-black">Pricing Details</h3>
  <Price 
    onPriceChange={handlePriceChange}
    initialPrice={{
      propertyPrice: formData.priceDetails.propertyPrice,
      priceType: formData.priceDetails.priceType,
      totalPrice: formData.priceDetails.totalPrice
    }}
  />
  <PricePerSqft 
    price={formData.priceDetails.propertyPrice} 
    area={formData.sizeDetails.carpetArea || 0}
  />
  <RegistrationCharges 
    value={formData.priceDetails.registrationCharges}
    onChange={(value) => handlePriceDetailChange('registrationCharges', value)}
  />
  <Brokerage 
    value={formData.priceDetails.brokerage}
    onChange={(value) => handlePriceDetailChange('brokerage', value)}
  />
</div> 