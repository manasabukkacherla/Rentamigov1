import { Schema, model, Document, Types } from 'mongoose';

// Common interfaces
interface IArea {
    totalArea: number;
    carpetArea: number;
    builtUpArea: number;
}

interface IFloor {
    floorNumber: number;
    totalFloors: number;
}

interface IBasicInformation {
    title: string;
    showroomType: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    landmark: string;
    location: {
        latitude: number;
        longitude: number;
    };
    isCornerProperty?: boolean;
}
interface showRoomDetails {
    totalSpace: number;
    frontageWidth: number;
    ceilingHeight: number;
    glassFrontage: boolean;
    lightingType: string;
    acInstalled: boolean;
    nearbyCompetitors: {
        present: boolean;
        brandNames: string;
    };
    displayRacks: boolean;
}
interface propertyDetails {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
        powerLoad: number | null;
        backup: boolean;
    };
    waterAvailability: string[];
    propertyAge: number | null;
    propertyCondition: string;
}
interface ILeaseDetails {
    expectedRent: number;
    rentType: "inclusive" | "exclusive";
    isNegotiable: boolean;
    securityDeposit: {
        amount: number;
        depositType: string;
    };
    maintenanceCharges?: {
        amount?: number;
        frequency?: "monthly" | "quarterly" | "yearly" | "Half-yearly";
    };
    otherCharges: {
        water: {
            amount: number;
            type: string;
        };
        electricity: {
            amount: number;
            type: string;
        };
        gas: {
            amount: number;
            type: string;
        };
        others: {
            amount: number;
            type: string;
        };
        brokerage: {
            required: boolean;
            amount: number;
        };


    };

}

interface IAvailability {
    immediate: boolean;
    specificDate: Date;

};


interface IContactInformation {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
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

interface ILeaseTerms {
    leaseTerms: {
        leaseDetails: {
            leaseAmount:number,
            leaseDuration: {
                duration: number,
                years: string,
            },
            leaseType: string,
        },
        tenureDetails: {
            minimumTenure: {
                duration: number,
                years: string,
            },
            maximumTenure: {
                duration: number,
                years: string,
            },
            lockInPeriod: {
                duration: number,
                years: string,
            },
            noticePeriod: { 
                duration: number,
                years: string,
            },
        },
        maintenanceAmount: {
            amount: number,
            frequency: string,
        },
        otherCharges: {
            water: {
                amount: number,
                type: string,
            },
            electricity: {
                amount: number,
                type: string,
            },
            gas: {
                amount: number,
                type: string,
            },
            others: {
                amount: number,
                type: string,
            }
        },
        brokerage: {
            required: string,
            amount: number,
        },
        availability: {
            type: string,
            availableFrom: string,
            preferredTenure: string,
            noticePeriod: string,
            isPetsAllowed: boolean,
            operatingHours: boolean,
            //   date?: string;
        }
      },    
   
}

interface IMetadata {
    createdBy: Types.ObjectId;
    createdAt: Date;
}

interface ICommercialLeaseShowroom extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    showroomDetails: showRoomDetails;
    propertyDetails: propertyDetails;
    leaseTerms: ILeaseTerms;
    brokerage: {
        required: string;
        amount: number;
    };
    availability: IAvailability;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialLeaseShowroomSchema = new Schema<ICommercialLeaseShowroom>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        showroomType: [{ type: String, required: true }],
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        landmark: { type: String, required: true },
        location: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        isCornerProperty: { type: Boolean, default: false }
    },
    showroomDetails: {
        totalSpace: { type: Number, required: true },
        frontageWidth: { type: Number, required: true },
        ceilingHeight: { type: Number, required: true },
        glassFrontage: { type: Boolean, default: false },
        lightingType: { type: String },
        acInstalled: { type: Boolean, default: false },
        nearbyCompetitors: {
            present: { type: Boolean, default: false },
            brandNames: { type: String }
        },
        displayRacks: { type: Boolean, default: false }
    },
    propertyDetails: {
        area: {
            totalArea: { type: Number, required: true },
            carpetArea: { type: Number, required: true },
            builtUpArea: { type: Number, required: true }
        },
        floor: {
            floorNumber: { type: Number, required: true },
            totalFloors: { type: Number, required: true }
        },
        facingDirection: { type: String, required: false },
        furnishingStatus: { type: String, required: false },
        propertyAmenities: [{ type: String, required: false }],
        wholeSpaceAmenities: [{ type: String, required: false }],
        electricitySupply: {
            powerLoad: { type: Number, required: false, default: null },
            backup: { type: Boolean, default: false }
        },
        waterAvailability: { type: [String], default: [] },
        propertyAge: { type: Number, required: false, default: null },
        propertyCondition: { type: String, required: false, default: 'new' }
    },
    
    // leaseTerms: {
        leaseTerms: {
            leaseDetails: {
                leaseAmount: { type: Number, required: true },
                leaseDuration: {
                    duration: { type: Number, required: true },
                    years: { type: String, required: true },
                },
                leaseType: { type: String, required: true },
            },
            tenureDetails: {
                minimumTenure: {
                    duration: { type: Number, required: true },
                    years: { type: String, required: true },
                },
                maximumTenure: {
                    duration: { type: Number, required: true },
                    years: { type: String, required: true },
                },
                lockInPeriod: {
                    duration: { type: Number, required: true },
                    years: { type: String, required: true },
                },
                noticePeriod: { 
                    duration: { type: Number, required: true },
                    years: { type: String, required: true },
                },
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
                required: { type: String, enum: ['yes', 'no'], required: true },
                amount: { type: Number }
            },
            availability: {
                immediate: Boolean,
                specificDate: Date,
                availableImmediately: Boolean,
                leaseDuration: String,
                noticePeriod: String,
                petsAllowed: Boolean,
                operatingHours: {
                    restricted: Boolean,
                    restrictions: String
                }
            }
          },
          contactInformation: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            alternatePhone: { type: String },
            bestTimeToContact: { type: String }
          },
          media: {
            photos: {
              exterior: [{ type: File }], 
              interior: [{ type: File }], 
              floorPlan: [{ type: File }], 
              washrooms: [{ type: File }],
              lifts: [{ type: File }],
              emergencyExits: [{ type: File }] 
            },
            videoTour: { type: File }, 
            documents: [{ type: File }] 
          },
          metadata: {
            createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            createdAt: { type: Date, default: Date.now }
          }
        }, {
          timestamps: true
        });

// Indexes
CommercialLeaseShowroomSchema.index({ propertyId: 1 }, { unique: true });
CommercialLeaseShowroomSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseShowroomSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseShowroomSchema.index({ 'leaseDetails.expectedRent': 1 });
CommercialLeaseShowroomSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialLeaseShowroomSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialLeaseShowroom, IBasicInformation, IArea, ILeaseDetails, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialLeaseShowroom>('CommercialLeaseShowroom', CommercialLeaseShowroomSchema); 