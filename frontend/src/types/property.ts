export interface Property {
  propertyId: string;
  basicInformation: {
    title: string;
    Type: string[];
    address: {
      city: string;
      state: string;
      country: string;
      pincode: string;
    };
    location: {
      latitude: string;
      longitude: string;
    };
    landmark: string;
    isCornerProperty: boolean;
  };
  contactInformation: {
    name: string;
    email: string;
    phone: string;
  };
  media: {
    photos: {
      exterior: string[];
      interior: string[];
      floorPlan: string[];
    };
    documents: string[];
  };
  metadata: {
    createdBy: string | null;
    status: string;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
  };
  pricingDetails?: {
    propertyPrice: number;
    pricetype: 'fixed' | 'negotiable';
    area: number;
    totalprice: number;
    pricePerSqft?: number;
  };
  rentalTerms?: {
    rentDetails: {
      expectedRent: number;
      rentType: string;
      isNegotiable: boolean;
    };
    securityDeposit: {
      amount: number;
    };
  };
  leaseTerms?: {
    leaseDetails: {
      leaseAmount: {
        amount: number;
        type: string;
        duration: number;
        durationUnit: string;
      };
    };
  };
}
