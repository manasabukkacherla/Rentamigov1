import { Schema, model, Document } from 'mongoose';

interface IBasicInformation {
    title: string;
    shedType: string[];
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

interface IShedDetails {
    totalArea: number;
    carpetArea: number;
    height: number;
    entranceWidth: number;
    additionaldetails: string;
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
    propertyAge: number;
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
            type: "inclusive" | "exclusive";
            amount?: number;
        };
        waterCharges: {
            type: "inclusive" | "exclusive";
            amount?: number;
        };
        gasCharges: {
            type: "inclusive" | "exclusive";
            amount?: number;
        };
        otherCharges: {
            type: "inclusive" | "exclusive";
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
        operatingHours: {
            restricted: boolean;
            restrictions: string;
        };
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
    // updatedAt?: Date;
    // status: 'active' | 'inactive' | 'sold' | 'rented';
    // views: number;
    // favorites: number;
    // isVerified: boolean;
}

interface ICommercialLeaseShed extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    shedDetails: IShedDetails;
    propertyDetails: IPropertyDetails;
    leaseTerms: ILeaseTerms;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

const CommercialLeaseShedSchema = new Schema<ICommercialLeaseShed>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        shedType: [{ type: String, required: true }],
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true }
        },
        landmark: { type: String, required: true },
        location: {
            latitude: { type: String, required: true },
            longitude: { type: String, required: true }
        },
        isCornerProperty: { type: Boolean, default: false }
    },
    shedDetails: {
        totalArea: { type: Number, required: true },
        carpetArea: { type: Number, required: true },
        height: { type: Number, required: true },
        entranceWidth: { type: Number, required: true },
        additionaldetails: { type: String }
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
        facingDirection: { type: String, required: true },
        furnishingStatus: { type: String, required: true },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number, required: true },
            backup: { type: Boolean, default: false }
        },
        propertyAge: { type: Number, required: true },
        propertyCondition: { type: String, required: true }
    },
    leaseTerms: {
        leaseDetails: {
            leaseAmount: {
                amount: { type: Number, required: true },
                type: { type: String, enum: ['Fixed', 'Negotiable'], default: 'Fixed' },
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
            availableFrom: { type: Date, required: true },
            availableImmediately: { type: Boolean, default: false },
            leaseDuration: { type: String, required: true },
            noticePeriod: { type: String, required: true },
            petsAllowed: { type: Boolean, default: false },
            operatingHours: {
                restricted: { type: Boolean, default: false },
                restrictions: { type: String }
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
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
        createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date },
        // status: { type: String, enum: ['active', 'inactive', 'sold', 'rented'], default: 'active' },
        // views: { type: Number, default: 0 },
        // favorites: { type: Number, default: 0 },
        // isVerified: { type: Boolean, default: false }
    }
}, { timestamps: true });

// Add indexes for better query performance
// CommercialLeaseShedSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialLeaseShedSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseShedSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseShedSchema.index({ 'metadata.createdAt': -1 });

export const CommercialLeaseShed = model<ICommercialLeaseShed>('CommercialLeaseShed', CommercialLeaseShedSchema);
export type { ICommercialLeaseShed, IBasicInformation, IShedDetails, IPropertyDetails, ILeaseTerms, IContactInformation, IMedia, IMetadata };

