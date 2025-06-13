import { Schema, model, Document } from 'mongoose';

interface IBasicInformation {
    title: string;
    Type: string[];
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

interface ICoveredSpaceDetails {
    totalArea: number;
    sqaurefeet: string;
    coveredarea: number;
    roadwidth: number;
    roadfeet: string;
    ceilingheight: number;
    ceilingfeet: string;
    noofopenslides: number;
}

interface IPropertyDetails {
    area: {
        totalArea: number;
        builtUpArea: number;
        carpetArea: number;
    };
    floor: {
        floorNumber: number;
        totalFloors: number;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
        powerLoad: number;
        backup: boolean;
    };
    propertyAge: string;
    propertyCondition: string;
}

interface ILeaseTerms {
    leaseDetails: {
        leaseAmount: {
            amount: number;
            type?: 'Fixed' | 'Negotiable';
            duration: number;
            durationUnit: string;
        };
    };
    tenureDetails: {
        minimumTenure: number;
        minimumUnit: string;
        maximumTenure: number;
        maximumUnit: string;
        lockInPeriod: number;
        lockInUnit: string;
        noticePeriod: number;
        noticePeriodUnit: string;
    };
    maintenanceAmount: {
        amount: number;
        frequency: 'Monthly' | 'Quarterly' | 'Yearly' | 'Half-Yearly';
    };
    otherCharges: {
        electricityCharges: {
            type: 'inclusive' | 'exclusive';
            amount?: number;
        };
        waterCharges: {
            type: 'inclusive' | 'exclusive';
            amount?: number;
        };
        gasCharges: {
            type: 'inclusive' | 'exclusive';
            amount?: number;
        };
        otherCharges: {
            type: 'inclusive' | 'exclusive';
            amount?: number;
        };
    };
    brokerage: {
        required: 'yes' | 'no';
        amount?: number;
    };
    availability: {
        availableFrom: Date;
        availableImmediately: boolean;
        leaseDuration: string;
        noticePeriod: string;
        petsAllowed: boolean;
        operatingHours: boolean;
    };
}

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

export interface ICommercialLeaseCoveredSpace extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    coveredSpaceDetails: ICoveredSpaceDetails;
    propertyDetails: IPropertyDetails;
    leaseTerms: ILeaseTerms;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

const commercialLeaseCoveredSpaceSchema = new Schema<ICommercialLeaseCoveredSpace>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        shedType: { type: [String], required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true }
        },
        landmark: { type: String },
        location: {
            latitude: { type: String,required:true },
            longitude: { type: String,required:true }
        },
        isCornerProperty: { type: Boolean, default: false }
    },
    coveredSpaceDetails: {
        totalArea: { type: Number, required: true },
        sqaurefeet: { type: String, required: true },
        coveredarea: { type: Number, required: true },
        roadwidth: { type: Number },
        roadfeet: { type: String },
        ceilingheight: { type: Number },
        ceilingfeet: { type: String },
        noofopenslides: { type: Number }
    },
    propertyDetails: {
        area: {
            totalArea: { type: Number, required: true },
            builtUpArea: { type: Number },
            carpetArea: { type: Number }
        },
        floor: {
            floorNumber: { type: Number },
            totalFloors: { type: Number }
        },
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAmenities: { type: [String] },
        wholeSpaceAmenities: { type: [String] },
        electricitySupply: {
            powerLoad: { type: Number },
            backup: { type: Boolean, default: false }
        },
        propertyAge: { type: String },
        propertyCondition: { type: String }
    },
    leaseTerms: {
        leaseDetails: {
            leaseAmount: {
                amount: { type: Number, required: true },
                type: { type: String, enum: ['Fixed', 'Negotiable'] },
                duration: { type: Number, required: true },
                durationUnit: { type: String, required: true }
            }
        },
        tenureDetails: {
            minimumTenure: { type: Number },
            minimumUnit: { type: String },
            maximumTenure: { type: Number },
            maximumUnit: { type: String },
            lockInPeriod: { type: Number },
            lockInUnit: { type: String },
            noticePeriod: { type: Number },
            noticePeriodUnit: { type: String }
        },
        maintenanceAmount: {
            amount: { type: Number },
            frequency: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly', 'Half-Yearly'] }
        },
        otherCharges: {
            electricityCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            },
            waterCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            },
            gasCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            },
            otherCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            }
        },
        brokerage: {
            required: { type: String, enum: ['yes', 'no'] },
            amount: { type: Number }
        },
        availability: {
            availableFrom: { type: Date },
            availableImmediately: { type: Boolean, default: false },
            leaseDuration: { type: String },
            noticePeriod: { type: String },
            petsAllowed: { type: Boolean, default: false },
            operatingHours: { type: Boolean, default: false }
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
            exterior: { type: [String] },
            interior: { type: [String] },
            floorPlan: { type: [String] },
            washrooms: { type: [String] },
            lifts: { type: [String] },
            emergencyExits: { type: [String] }
        },
        videoTour: { type: String },
        documents: { type: [String] }
    },
    metadata: {
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String,default: 'Lease' },
        propertyName: { type: String,  default: 'Covered Space' },
        status: { type: String, default: 'Available' }
    }
}, { timestamps: true });

export default model<ICommercialLeaseCoveredSpace>('CommercialLeaseCoveredSpace', commercialLeaseCoveredSpaceSchema);
