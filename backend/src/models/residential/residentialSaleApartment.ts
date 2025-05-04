import mongoose, { Document, Schema } from "mongoose";
import NumberListInstance from "twilio/lib/rest/pricing/v2/number";

interface IBasicInformation {
  propertyId?: string;
  title: string;

  showflat: boolean;
  apartmentType: string;
  flatno: number;
  floor: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
   location?:{
     latitude: string;
     longitude: string;
     locationLabel?: string;
   }
  };
}


interface propertyDetails {
  propertysize: number;
  bedrooms: number;
  washrooms: number
  bathrooms: number;
  balconies: number;
  parkingdetails: 'yes' | 'No';
  ExtraRooms: string[];
  utility: 'Yes' | 'No';
  Furnishingstatus: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';
  totalfloors: number;
  propertyonfloor: number;
  propertyfacing: string;
  propertyage: string;
  superareasqft: number;
  superareasqmt: number;
  builtupareasqft: number;
  builtupareasqmt: number;
  carpetareasqft: number;
  carpetareasqmt: number;
  electricityavailability: string;
  wateravailability: string[];
};

interface flatamenities {
  lights: number;
  geysers: number;
  lofts: number;
  clothHanger: number;
  cotWithMattress: number;
  airConditioner: number;
  exhaustFan: number;
  ceilingFan: number;
  wardrobes: number;
  kitchenCabinets: number;
  diningTableWithChairs: number;
  sideTable: number;
  desertCooler: number;
}

interface availableitems {
  availableitems: string[];
  securityandsafety: string[];
  powerutility: string[];
  parkingtranspotation: string[];
  recreationalsportsfacilities: string[];
  childrenfamilyamenities: string[];
  healthwellnessfacilities: string[];
  shoppingconviencestores: string[];
  ecofriendlysustainable: string[];
  communityculturalspaces: string[]
  smarthometechnology: string[]
 
}

interface pricedetails {
  propertyprice: number;
  pricetype: 'negotiable' | 'fixed';
  pricepersqft: number;
  stampcharges?: {
    chargestype?: 'inclusive' | 'exclusive';
    registrationcharges?: number;
    stampdutycharges?: number;
    othercharges:
    {
      watercharges:
      {
        type: 'inclusive' | 'exclusive';
        amount?: number;
      }
      electricitycharges:
      {
        type: 'inclusive' | 'exclusive';
        amount?: number;
      }
      gascharges:
      {
        type: 'inclusive' | 'exclusive';
        amount?: number;
      }
      othercharges:
      {
        type: 'inclusive' | 'exclusive';
        amount?: number;
      }


    }
    brokerage:
    {
      type: 'yes' | 'no';
      amount?: number;
    }
  }

}


interface IMetadata {
  createdBy: Schema.Types.ObjectId | string;
  createdAt: Date;
}

interface availability {
  availablefrom: string;
  date?: string;


}

interface IMedia {
  photos: {
    exterior: string[];
    interior: string[];
    floorPlan: string[];
    washrooms: string[];
    lifts: string[];
    emergencyExits: string[];
  };
  videoTour?: string;
  documents: string[];
}


interface IResidentialSaleApartment extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  propertyDetails: propertyDetails;
  availableitems: availableitems;
  flatamenities: flatamenities;
  priceDetails: pricedetails;
  media: IMedia;
  metadata: IMetadata;
}
const ResidentailRentApartmentSchema = new Schema<IResidentialSaleApartment>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String },

    showflat: { type: Boolean },
    apartmentType: { type: String },
    flatno: { type: Number },
    floor: { type: Number },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      location:{
        longitude: { type: String},
        latitude: { type: String },
        locationLabel: { type: String },
      }
    },
  },
  propertyDetails: {
    propertysize: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    washrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    balconies: { type: Number, required: true },
    parkingdetails: { type: String, required: true },
    ExtraRooms: [{ type: String, required: true }],
    utility: { type: String, required: true },
    Furnishingstatus: { type: String, required: true },
    totalfloors: { type: Number, required: true },
    propertyonfloor: { type: Number, required: true },
    propertyfacing: { type: String, required: true },
    propertyage: { type: String, required: true },
    superareasqft: { type: Number, required: true },
    superareasqmt: { type: Number, required: true },
    builtupareasqft: { type: Number, required: true },
    builtupareasqmt: { type: Number, required: true },
    carpetareasqft: { type: Number, required: true },
    carpetareasqmt: { type: Number, required: true },
    electricityavailability: { type: String, required: true },
    wateravailability: [{ type: String, required: true }],
  },

  availableitems: {
    availableitems: [{ type: String, required: true }], 
    securityandsafety: [{ type: String, required: true }],
    powerutility: [{ type: String, required: true }],
    parkingtranspotation: [{ type: String, required: true }],
    recreationalsportsfacilities: [{ type: String, required: true }],
    childrenfamilyamenities: [{ type: String, required: true }],
    healthwellnessfacilities:  [{ type: String, required: true }],
    shoppingconviencestores: [{ type: String, required: true }],
    ecofriendlysustainable: [{ type: String, required: true }],
    communityculturalspaces: [{ type: String, required: true }],
    smarthometechnology: [{ type: String, required: true }],
  },


  priceDetails: {
    propertyprice: { type: Number, required: true },
    pricetype: { type: String, required: true },
    stampcharges:
    {
      chargestype: { type: String },
      registrationcharges: { type: Number},
      stampdutycharges: { type: Number },

      othercharges: {
        water: {
          amount: { type: Number },
          type: { type: String, required: true },
        },
        electricity: {
          amount: { type: Number },
          type: { type: String, required: true },
        },
        gas: {
          amount: { type: Number },
          type: { type: String, required: true },
        },
        others: {
          amount: { type: Number },
          type: { type: String, required: true },
        }
      },

      brokerage: {
        required: { type: String, required: true },
        amount: { type: Number }
      },
    
    },
  },

  media: {
    photos: {
      exterior: [{ type: String }],
      interior: [{ type: String }],
      floorPlan: [{ type: String }],
      washrooms: [{ type: String }],
      lifts: [{ type: String }],
      emergencyExits: [{ type: String }]
    },
    videoTour: { type: String },
    documents: [{ type: String }]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },

  }
}, {
  timestamps: true
}
);
export default mongoose.model<IResidentialSaleApartment>('ResidentialSaleApartment', ResidentailRentApartmentSchema);