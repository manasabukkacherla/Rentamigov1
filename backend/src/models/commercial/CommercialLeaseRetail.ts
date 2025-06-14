import mongoose, { Schema, model, Document, Types } from 'mongoose';

interface IArea {
    totalArea: number;
    carpetArea: number;
    builtUpArea: number;
  }

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}
export interface ICommercialLeaseRetail extends Document {
    propertyId: string;
    basicInformation: {
      title: string;
      type: string[];
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
      };
      landmark: string;
      location: {
        latitude: string;
        longitude: string;
      };
      isCornerProperty: boolean;
    }
    propertyDetails: {
      retailStoreDetails: {
        location: string,
        anchorStores: boolean,
        footfallData: string,
    }
      area: IArea;
      floor: IFloor;
      facingDirection: string;
      furnishingStatus: string;
      propertyAmenities: string[];
      wholeSpaceAmenities: string[];
      electricitySupply: {
        powerLoad: number;
        backup: boolean;
      };
      waterAvailability: string;
      propertyAge: string;
      propertyCondition: string;
    };
    leaseTerms: {

        leaseAmount: {
              amount: number,
              type: string,
              duration: number,
              durationUnit: string,
        },
      leaseTenure: {
        minimumTenure: number;
        minimumUnit: string;
        maximumTenure: number;
        maximumUnit: string;
        lockInPeriod: number;
        lockInUnit: string;
        noticePeriod: number;
        noticePeriodUnit: string;
      },
      maintenanceAmount: {
          amount: number,
          frequency: string,
      },
      otherCharges: {
          water: {
              amount?: number,
              type: string,
          },
          electricity: {
              amount?: number,
              type: string,
          },
          gas: {
              amount?: number,
              type: string,
          },
          others: {
              amount?: number,
              type: string,
          }
      },
      brokerage: {
          required: string,
          amount?: number,
      },
    },
    availability: {
      date: Date,
      availableImmediately: Boolean,
      preferredSaleDuration: String,
      noticePeriod: String,
      isPetsAllowed: Boolean,
      operatingHours: Boolean,
    },
    contactInformation: {
      name: string,
      email: string,
      phone: string,
      alternatePhone?: string,
      bestTimeToContact?: string,
    },
    media: {
      photos: {
        exterior: string[],
        interior: string[],
        floorPlan: string[],
        washrooms: string[],
        lifts: string[],
        emergencyExits: string[],
      },
      videoTour?: string,
      documents: string[],
    },
    metadata: {
      createdBy: Schema.Types.ObjectId | null,
      createdAt: Date,
      propertyType: string,
      propertyName: string,
      intent: string,
      status: string,
    },
}


// Schema
const CommercialLeaseRetailStoreSchema = new Schema<ICommercialLeaseRetail>({
  propertyId: { type: String, required: false, unique: false },
  basicInformation: {
    title: { type: String, required: false },
    type: { type: [String], required: false },
    address: { 
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipCode: { type: String, required: false },
    },
    landmark: { type: String, required: false },
    location: {
      latitude: { type: String, required: false },
      longitude: { type: String, required: false },
    },
    isCornerProperty: { type: Boolean, default: false }
  },
  propertyDetails: {
    retailStoreDetails: {
    location: { type: String, required: false },
    anchorStores: { type: Boolean, default: false },
    footfallData: { type: String, required: false },
    signageAllowed: { type: Boolean, default: false },
    sharedWashrooms: { type: Boolean, default: false },
    fireExit: { type: Boolean, default: false }
  },
    area: {
      totalArea: { type: Number, required: false },
      builtUpArea: { type: Number, required: false },
      carpetArea: { type: Number, required: false }, 
    },
    floor: {
      floorNumber: { type: Number, required: false },
      totalFloors: { type: Number, required: false },
    },  
    facingDirection: { type: String, required: false },
    furnishingStatus: { type: String, required: false },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: {
      powerLoad: { type: Number, required: false },  
      backup: { type: Boolean, default: false },
    },
    waterAvailability: { type: String, required: false },
    propertyAge: { type: String, required: false },
    propertyCondition: { type: String, required: false },
  },
  
  leaseTerms: {

        leaseAmount:{
        amount: { type: Number, required: false },
        type: { type: String, required: false },
        duration: { type: Number, required: false },
        durationUnit: { type: String, required: false },
      },        

    leaseTenure: {
        minimumTenure: {type: String, required: false },
        minimumUnit: {type: String, required: false },
        lockInPeriod: {type: String, required: false },
        lockInUnit: {type: String, required: false },
        noticePeriod: {type: String, required: false },
        noticePeriodUnit: {type: String, required: false },
    },
    maintenanceAmount: {
        amount: { type: Number ,required: false},
        frequency: { type: String ,required: false},
    },
    otherCharges: {
        water: {
            amount: { type: Number },
            type: { type: String, required: false},
        },
        electricity: {
            amount: { type: Number },
            type: { type: String, required: false},
        },
        gas: {
            amount: { type: Number },
            type: { type: String, required: false},
        },
        others: {
            amount: { type: Number },
            type: { type: String, required: false},
        }
    },
    brokerage: {
        required: { type: String, required: false },
        amount: { type: Number }
    },
    availability: {
        date: { type: Date, required: false },
        availableImmediately: { type: Boolean, required: false },
        preferredSaleDuration: { type: String, required: false },
        noticePeriod: { type: String, required: false },
        isPetsAllowed: { type: Boolean, required: false },
        operatingHours: { type: Boolean, required: false },
    },
  contactInformation: {
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    alternatePhone: { type: String },
    bestTimeToContact: { type: String }
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Lease' },
    propertyName: { type: String,  default: 'Retail' },
    status: { type: String, default: 'Available' }
  }
}, 
});



// Export model and interfaces

export default mongoose.model<ICommercialLeaseRetail>('CommercialLeaseRetail', CommercialLeaseRetailStoreSchema);