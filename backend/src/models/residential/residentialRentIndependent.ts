import mongoose, { Schema } from 'mongoose';

interface IResidentialRentIndependentHouse extends Document {
  propertyId: string;
  basicInformation: {
    propertyName: string;
    propertyAddress: {
        houseName: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        pinCode: string;
        location: {
          latitude: string;
          longitude: string;
        };
      };
  };
  propertySize: number;
  propertyDetails: {
    bedrooms: number;
    washrooms: number;
    balconies: number;
    hasParking: boolean;
    parkingDetails: {
      twoWheeler: number;
      fourWheeler: number;
    },
    extraRooms: {
      servant: boolean;
      puja: boolean;
      store: boolean;
      others: boolean;
    },
    utilityArea: string;
    furnishingStatus: string;
    flooring: string;
    facing: string;
    propertyAge: string;
    superBuiltUpAreaSqft: number;
    superBuiltUpAreaSqmt: number;
    builtUpAreaSqft: number;
    builtUpAreaSqmt: number;
    carpetAreaSqft: number;
    carpetAreaSqmt: number;
    electricityAvailability: string;
    waterAvailability: {
      borewell: boolean;
      governmentSupply: boolean;
      tankerSupply: boolean;
    }
  };
  restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  }
  flatAmenities: {
    lights: number;
    ceilingFan: number;
    geysers: number;
    chimney: boolean;
    callingBell: boolean;
    wardrobes: number;
    lofts: number;
    kitchenCabinets: number;
    clothHanger: number;
    pipedGasConnection: boolean;
    gasStoveWithCylinder: boolean;
    ironingStand: boolean;
    bathtub: boolean;
    shower: boolean;
    sofa: boolean;
    coffeeTable: boolean;
    tvUnit: boolean;
    diningTableWithChairs: number;
    cotWithMattress: number;
    sideTable: number;
    studyTableWithChair: number;
    television: boolean;
    refrigerator: boolean;
    washingMachine: boolean;
    dishwasher: boolean;
    waterPurifier: boolean;
    microwaveOven: boolean;
    inductionCooktop: boolean;
    gasStove: boolean;
    airConditioner: number;
    desertCooler: number;
    ironBox: boolean;
    exhaustFan: number;
  };
  societyAmenities: {
    powerutility: string[];
    parkingtranspotation: string[];
    recreationalsportsfacilities: string[];
    childrenfamilyamenities: string[];
    healthwellnessfacilities: string[];
    shoppingconviencestores: string[];
    ecofriendlysustainable: string[];
    communityculturalspaces: string[]
    smarthometechnology: string[]
    otheritems: string[];
  };
  rentalTerms: {
    rentDetails: {
      expectedRent: number;
      isNegotiable: boolean;
      rentType: string;
    }
    securityDeposit: {
      amount: number;
    }
    maintenanceAmount?: {
      amount?: number;
      frequency?: string;
    }
    otherCharges: {
        water: {
          amount?: number;
          type: string;
        }
        electricity: {
          amount?: number;
          type: string;
        }
        gas: {
          amount?: number;
          type: string;
        }
        others: {
          amount?: number;
          type: string;
        }
    }
    brokerage: {
      required: string;
      amount?: number;
    }
  }
  availability: {
    type: string;
    date?: string;
  };
  media: {
    photos: {
      exterior: string[];
      interior: string[];
      floorPlan: string[];
      washrooms: string[];
      lifts: string[];
      emergencyExits: string[];
      bedrooms: string[];
      halls: string[];
      storerooms: string[];
      kitchen: string[];
    };
    videoTour?: string;
    documents: string[];
  };
  metadata: {
    createdBy: Schema.Types.ObjectId | string;
    createdAt: Date;
  };
}

const residentialRentIndependentHouseSchema = new mongoose.Schema<IResidentialRentIndependentHouse>({
  propertyId: {
    type: String,
    required: true,
    unique: true,
  },
  basicInformation: {
    propertyName: { type: String, required: true },
    propertyAddress: {
      houseName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    },
  },
  propertySize: { type: Number, required: true },
  propertyDetails: {
    bedrooms: { type: Number, required: true },
    washrooms: { type: Number, required: true },
    balconies: { type: Number, required: true },
    hasParking: { type: Boolean, required: true },
    parkingDetails: {
      twoWheeler: { type: Number, required: true },
      fourWheeler: { type: Number, required: true },
    },
    extraRooms: {
      servant: { type: Boolean, required: true },
      puja: { type: Boolean, required: true },
      store: { type: Boolean, required: true },
      others: { type: Boolean, required: true },
    },
    utilityArea: { type: String, required: true },
    furnishingStatus: { type: String, required: true },
    flooring: { type: String, required: true },
    facing: { type: String, required: true },
    propertyAge: { type: String, required: true },
    superBuiltUpAreaSqft: { type: Number, required: true },
    superBuiltUpAreaSqmt: { type: Number, required: true },
    builtUpAreaSqft: { type: Number, required: true },
    builtUpAreaSqmt: { type: Number, required: true },
    carpetAreaSqft: { type: Number, required: true },
    carpetAreaSqmt: { type: Number, required: true },
    electricityAvailability: { type: String, required: true },
    waterAvailability: {
      borewell: { type: Boolean, required: true },
      governmentSupply: { type: Boolean, required: true },
      tankerSupply: { type: Boolean, required: true },
    },
  },
  restrictions: {
    foodPreference: { type: String, required: true },
    petsAllowed: { type: String, required: true },
    tenantType: { type: String, required: true },
  },
  flatAmenities: {
    lights: { type: Number, required: true },
    ceilingFan: { type: Number, required: true },
    geysers: { type: Number, required: true },
    chimney: { type: Boolean, required: true },
    callingBell: { type: Boolean, required: true },
    wardrobes: { type: Number, required: true },
    lofts: { type: Number, required: true },
    kitchenCabinets: { type: Number, required: true },
    clothHanger: { type: Number, required: true },
    pipedGasConnection: { type: Boolean, required: true },
    gasStoveWithCylinder: { type: Boolean, required: true },
    ironingStand: { type: Boolean, required: true },
    bathtub: { type: Boolean, required: true },
    shower: { type: Boolean, required: true },
    sofa: { type: Boolean, required: true },
    coffeeTable: { type: Boolean, required: true },
    tvUnit: { type: Boolean, required: true },
    diningTableWithChairs: { type: Number, required: true },
    cotWithMattress: { type: Number, required: true },
    sideTable: { type: Number, required: true },
    studyTableWithChair: { type: Number, required: true },
    television: { type: Boolean, required: true },
    refrigerator: { type: Boolean, required: true },
    washingMachine: { type: Boolean, required: true },
    dishwasher: { type: Boolean, required: true },
    waterPurifier: { type: Boolean, required: true },
    microwaveOven: { type: Boolean, required: true },
    inductionCooktop: { type: Boolean, required: true },
    gasStove: { type: Boolean, required: true },
    airConditioner: { type: Number, required: true },
    desertCooler: { type: Number, required: true },
    ironBox: { type: Boolean, required: true },
    exhaustFan: { type: Number, required: true },
  },
  societyAmenities: {
    powerutility: { type: [String], required: true },
    parkingtranspotation: { type: [String], required: true },
    recreationalsportsfacilities: { type: [String], required: true },
    childrenfamilyamenities: { type: [String], required: true },
    healthwellnessfacilities: { type: [String], required: true },
    shoppingconviencestores: { type: [String], required: true },
    ecofriendlysustainable: { type: [String], required: true },
    communityculturalspaces: { type: [String], required: true },
    smarthometechnology: { type: [String], required: true },
    otheritems: { type: [String], required: true },
  },
  rentalTerms: {
    rentDetails: {
        expectedRent: { type: Number, required: true },
        isNegotiable: { type: Boolean, default: false },
        rentType: { type: String, required: true },
    },
    securityDeposit: {
        amount: { type: Number, required: true },
    },
    maintenanceAmount: {
        amount: { type: Number },
        frequency: { type: String },
    },
    otherCharges: {
        water: {
            amount: { type: Number },
            type: { type: String, required: true},
        },
        electricity: {
            amount: { type: Number },
            type: { type: String, required: true},
        },
        gas: {
            amount: { type: Number },
            type: { type: String, required: true},
        },
        others: {
            amount: { type: Number },
            type: { type: String, required: true},
        }
    },
    brokerage: {
        required: { type: String, required: true },
        amount: { type: Number },
    },
  },
  availability: {
    type: { type: String, required: true },
    date: { type: String },
  },
  media: {
    photos: {
      exterior: [{ type: String, required: false }],
      interior: [{ type: String, required: false }],
      floorPlan: [{ type: String, required: false }],
      washrooms: [{ type: String, required: false }],
      lifts: [{ type: String, required: false }],
      emergencyExits: [{ type: String, required: false }],
      bedrooms: [{ type: String, required: false }],
      halls: [{ type: String, required: false }],
      storerooms: [{ type: String, required: false }],
      kitchen: [{ type: String, required: false }]
    },
    videoTour: { type: String, required: false, default: '' },
    documents: [{ type: String, required: false }]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  }
}, {
  timestamps: true
});

const ResidentialRentIndependentHouse = mongoose.model('ResidentialRentIndependentHouse', residentialRentIndependentHouseSchema);

export default ResidentialRentIndependentHouse;
