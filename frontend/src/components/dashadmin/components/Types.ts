export interface Plan {
    id: string;
    _id?: string;
    name: string;
    price: number;
    billingCycle: string;
    maxProperties: number;
    maxLeads: number;
    tokensPerLead: number;
    trialDays: number;
    features: string[];
    description: string;
    status: string; // ✅ Ensure this is always a string, remove `undefined`
  }
  export interface TokenPackage {
    id: string;
    name: string;
    tokens: number;
    price: number;
    bonusTokens: number;
    minPurchase: number;
    tokensPerLead: number;
    validityDays: number;
    features: string[];
    description: string;
    status: string; // ✅ Added status property
  }
  