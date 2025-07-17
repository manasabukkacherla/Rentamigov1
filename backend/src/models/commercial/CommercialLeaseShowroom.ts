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
    title?: string;
    Type?: string[];
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
    landmark: string;
    location: {
        latitude: string;
        longitude: string;
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
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
}
interface ILeaseTerms {
    leaseTerms: {
        leaseDetails: {
            leaseAmount:{
                amount: number,
                type: string,
                duration: number,
                durationUnit: string,
              },
        },
        tenureDetails: {
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
        availability: {
            date: Date,
            availableImmediately: Boolean,
            preferredSaleDuration: String,
            noticePeriod: String,
            isPetsAllowed: Boolean,
            operatingHours:  Boolean,
               
        },
      },
    
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

interface IMetadata {
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
}

interface ICommercialLeaseShowroom extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    showroomDetails: showRoomDetails;
    propertyDetails: propertyDetails;
    leaseTerms: ILeaseTerms;
    availability: IAvailability;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialLeaseShowroomSchema = new Schema<ICommercialLeaseShowroom>({
    propertyId: { type: String, unique: false },
    basicInformation: {
        title: { type: String },
        Type: [{ type: String }],
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipCode: { type: String },
        },
        landmark: { type: String },
        location: {
            latitude: { type: String },
            longitude: { type: String },
        },
        isCornerProperty: { type: Boolean, default: false }
    },
    showroomDetails: {
        totalSpace: { type: Number  },
        frontageWidth: { type: Number },
        ceilingHeight: { type: Number },
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
            totalArea: { type: Number },
            carpetArea: { type: Number },
            builtUpArea: { type: Number }
        },
        floor: {
            floorNumber: { type: Number },
            totalFloors: { type: Number }
        },
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number, default: null },
            backup: { type: Boolean, default: false }
        },
        waterAvailability: { type: String, default: '' },
        propertyAge: { type: String, default: '' },
        propertyCondition: { type: String, default: 'new' }
    },
    
    // leaseTerms: {
        leaseTerms: {
            leaseDetails: {
                leaseAmount: { 
                    amount: { type: Number },
                    type: { type: String },
                    duration: { type: Number },
                    durationUnit: { type: String },
                },
            },
            tenureDetails: {
                minimumTenure: {type: Number },
                minimumUnit: {type: String },
                maximumTenure: {type: Number },
                maximumUnit: {type: String },
                lockInPeriod: {type: Number },
                lockInUnit: {type: String },
                noticePeriod: {type: Number },
                noticePeriodUnit: {type: String },
            },
            maintenanceAmount: {
                amount: { type: Number },
                frequency: { type: String },
            },
            otherCharges: {
                water: {
                    amount: { type: Number },
                    type: { type: String },
                },
                electricity: {
                    amount: { type: Number },
                    type: { type: String },
                },
                gas: {
                    amount: { type: Number },
                    type: { type: String },
                },
                others: {
                    amount: { type: Number },
                    type: { type: String },
                }
            },
            brokerage: {
                required: { type: String, default:'no'},
                amount: { type: Number }
            },
            availability: {
                date: { type: Date },
                availableImmediately: { type: Boolean },
                preferredSaleDuration: { type: String },
                noticePeriod: { type: String },
                isPetsAllowed: { type: Boolean },
                operatingHours: { type: Boolean },
               
            }
          },
          contactInformation: {
            name: { type: String },
            email: { type: String },
            phone: { type: String },
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
            createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
            createdAt: { type: Date, default: Date.now },
            propertyType: { type: String, default: 'Commercial' },
            intent: { type: String,default: 'Lease' },
            propertyName: { type: String,  default: 'Showroom' },
            status: { type: String, default: 'Available' }
          }
        }, {
          timestamps: false
        });

// Indexes
// CommercialLeaseShowroomSchema.index({ propertyId: 1 }, { unique: false }); // Removed duplicate index
CommercialLeaseShowroomSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseShowroomSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseShowroomSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialLeaseShowroomSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialLeaseShowroom, IBasicInformation, IArea, ILeaseTerms, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialLeaseShowroom>('CommercialLeaseShowroom', CommercialLeaseShowroomSchema); 