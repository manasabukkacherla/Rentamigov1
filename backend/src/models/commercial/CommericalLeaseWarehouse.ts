import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IBasicInformation {
    title: string;
    warehouseType: string[];
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
    ceilingHeight: number;
    loadingDocks: number;
    dockHeight: number;
    floorload: number;
    firesafety: boolean;
    security: boolean;
    access247: boolean;
    truckparking: boolean;
    parking: boolean;
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
    userId: Schema.Types.ObjectId | null;
    userName: string;
    createdAt: Date;
    // updatedAt?: Date;
    // status: 'active' | 'inactive' | 'sold' | 'rented';
    // views: number;
    // favorites: number;
    // isVerified: boolean;
}

interface ICommercialLeaseWarehouse extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    coveredSpaceDetails: ICoveredSpaceDetails;
    propertyDetails: IPropertyDetails;
    leaseTerms: ILeaseTerms;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialLeaseWarehouseSchema = new Schema<ICommercialLeaseWarehouse>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        warehouseType: [{ type: String, required: true }],
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        landmark: { type: String, required: true },
        location: {
            latitude: { type: String, required: true },
            longitude: { type: String, required: true },
        },
        isCornerProperty: { type: Boolean }
    },
    coveredSpaceDetails: {
        totalArea: { type: Number, required: true },
        ceilingHeight: { type: Number, required: true },
        loadingDocks: { type: Number, default: 0 },
        dockHeight: { type: Number },
        floorload: { type: Number },
        firesafety: { type: Boolean, default: false },
        security: { type: Boolean, default: false },
        access247: { type: Boolean, default: false },
        truckparking: { type: Boolean, default: false },
        parking: { type: Boolean, default: false }
    },
    propertyDetails: {
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
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
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
            minimumTenure: { type: Number, required: true },
            minimumUnit: { type: String, required: true },
            maximumTenure: { type: Number, required: true },
            maximumUnit: { type: String, required: true },
            lockInPeriod: { type: Number, required: true },
            lockInUnit: { type: String, required: true },
            noticePeriod: { type: Number, required: true },
            noticePeriodUnit: { type: String, required: true }
        },
        maintenanceAmount: {
            amount: { type: Number, required: true },
            frequency: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly', 'Half-Yearly'], required: true }
        },
        otherCharges: {
            electricityCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
                amount: { type: Number }
            },
            waterCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
                amount: { type: Number }
            },
            gasCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
                amount: { type: Number }
            },
            otherCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
                amount: { type: Number }
            }
        },
        brokerage: {
            required: { type: String, enum: ['yes', 'no'], required: true },
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
        userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
        userName: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date },
        // status: { type: String, enum: ['active', 'inactive', 'sold', 'rented'], default: 'active' },
        // views: { type: Number, default: 0 },
        // favorites: { type: Number, default: 0 },
        // isVerified: { type: Boolean, default: false }
    }
});

export default model<ICommercialLeaseWarehouse>('CommercialLeaseWarehouse', CommercialLeaseWarehouseSchema); 