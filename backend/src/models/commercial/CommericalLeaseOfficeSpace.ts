import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IBasicInformation {
    title: string;
    officeType: string[];
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
    isCornerProperty: boolean;
}

interface IOfficeSpaceDetails {
    seatingcapacity: number;
    cabins: 'Available' | 'Not Available';
    meetingrooms: 'Available' | 'Not Available';
    conferenceRooms: 'Available' | 'Not Available';
    receptionarea: 'Available' | 'Not Available';
    wifi: 'Available' | 'Not Available';
    serverroom: 'Available' | 'Not Available';
    coworkingfriendly: 'Available' | 'Not Available';
    cabinsDetails?: {
        count: number;
    };
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
    createdBy: Types.ObjectId | null;
    createdAt: Date;
    updatedAt?: Date;
    status: 'active' | 'inactive' | 'sold' | 'rented';
    views: number;
    favorites: number;
    isVerified: boolean;
}

interface ICommercialLeaseOfficeSpace extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    officeSpaceDetails: IOfficeSpaceDetails;
    propertyDetails: IPropertyDetails;
    leaseTerms: ILeaseTerms;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema definitions
const BasicInformationSchema = new Schema<IBasicInformation>({
    title: { type: String, required: true },
    officeType: { type: [String], required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    landmark: { type: String },
    location: {
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 }
    },
    isCornerProperty: { type: Boolean, default: false }
});

const OfficeSpaceDetailsSchema = new Schema<IOfficeSpaceDetails>({
    seatingcapacity: { type: Number, required: true },
    cabins: {
        type: String,
        enum: ['Available', 'Not Available'],
        required: true
    },
    meetingrooms: {
        type: String,
        enum: ['Available', 'Not Available'],
        required: true
    },
    conferenceRooms: {
        type: String,
        enum: ['Available', 'Not Available'],
        required: true
    },
    receptionarea: {
        type: String,
        enum: ['Available', 'Not Available'],
        required: true
    },
    wifi: {
        type: String,
        enum: ['Available', 'Not Available'],
        required: true
    },
    serverroom: {
        type: String,
        enum: ['Available', 'Not Available'],
        required: true
    },
    coworkingfriendly: {
        type: String,
        enum: ['Available', 'Not Available'],
        required: true
    },
    cabinsDetails: {
        count: { type: Number },

    }
});

const PropertyDetailsSchema = new Schema<IPropertyDetails>({
    area: {
        totalArea: { type: Number, required: true },
        builtUpArea: { type: Number, required: true },
        carpetArea: { type: Number, required: true }
    },
    floor: {
        floorNumber: { type: Number, required: true },
        totalFloors: { type: Number, required: true }
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
});

const LeaseTermsSchema = new Schema<ILeaseTerms>({
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
        availableImmediately: { type: Boolean, default: true },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        petsAllowed: { type: Boolean, default: false },
        operatingHours: { type: Boolean, default: false }
    }
});

const ContactInformationSchema = new Schema<IContactInformation>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    bestTimeToContact: { type: String }
});

const MediaSchema = new Schema<IMedia>({
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
});

const MetadataSchema = new Schema<IMetadata>({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    status: { type: String, enum: ['active', 'inactive', 'sold', 'rented'], default: 'active' },
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false }
});

// Main schema
const CommercialLeaseOfficeSpaceSchema = new Schema<ICommercialLeaseOfficeSpace>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: { type: BasicInformationSchema, required: true },
    officeSpaceDetails: { type: OfficeSpaceDetailsSchema, required: true },
    propertyDetails: { type: PropertyDetailsSchema, required: true },
    leaseTerms: { type: LeaseTermsSchema, required: true },
    contactInformation: { type: ContactInformationSchema, required: true },
    media: { type: MediaSchema },
    metadata: { type: MetadataSchema, default: {} }
});

// Create and export the model
const CommercialLeaseOfficeSpace = model<ICommercialLeaseOfficeSpace>(
    'CommercialLeaseOfficeSpace',
    CommercialLeaseOfficeSpaceSchema
);

export default CommercialLeaseOfficeSpace;
