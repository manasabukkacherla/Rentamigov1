export interface Plan {
    tempId: string;
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
<<<<<<< HEAD
  export interface TokenPackage {
    id: string;
    _id?: string; // ✅ Make _id optional
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
  

=======
>>>>>>> 04b2b2ac730be0163015e97498b4d82fb45e09ac
  