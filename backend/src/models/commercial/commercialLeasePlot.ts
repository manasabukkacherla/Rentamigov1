import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
    totalArea: number;
    carpetArea: number;
    builtUpArea: number;
}



interface IBasicInformation {
    title: string;
    plotType: string[];
    address:{
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    landmark: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    isCornerProperty: boolean;
}

interface IFloor {
    floorNumber: number;
    totalFloors: number;
}

interface IPropertyDetails {
    area: IArea;
    floor: IFloor;
    facingDirection?: string;
    furnishingStatus?: string;
    propertyAmenities?: string[];
    wholeSpaceAmenities?: string[];
    electricitySupply?: {
        powerLoad: number;
        backup: boolean;
    };
    waterAvailability?: string;
}


interface ILeaseDetails {
    leaseAmount: number;
    leaseduration: {
        duration: number;
        type: string;
        amountType: "fixed" | "negotiable";  
    };
    leasetenure: {
        minimumTenure: {
            duration: number;
            type: string;
        };
        maximumTenure: {
            duration: number;
            type: string;
        };
        lockInPeriod: {
            duration: number;
            type: string;
        };
        noticePeriod: {
            duration: number;
            type: string;
        };
    };
    maintenanceCharges: {
        amount: number;
        frequency: "monthly" | "quarterly" | "half-yearly" | "yearly";
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
        otherCharges: "inclusive" | "exclusive";
        amount?: number;
    };
}

interface IBrokerage {
    required: boolean;
    amount?: number;
}

interface IAvailability {
    availableFrom?: Date;
    availableImmediately?: boolean;
    availabilityStatus: string;
    leaseDuration?: string;
    noticePeriod?: string;
    isPetsAllowed?: boolean;
    operatingHours?: {
        restricted: boolean;
        restrictions: string;
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
        washroom: string[];
        lift: string[];
        emergencyExit: string[];
    };
    videoTour?: string;
    documents: string[];
}

interface IMetadata {
    createdBy: Types.ObjectId;
    createdAt: Date;
}
interface IPlotDetails {
    totalPlotArea: number;
    zoningType: string;
    infrastructure: string[];
    roadAccess: string;
    securityRoom: boolean;
    previousConstruction: string;  
}

interface ICommercialLeasePlot extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
        propertyDetails: IPropertyDetails;
        plotDetails: IPlotDetails;
    leaseDetails: ILeaseDetails;
    brokerage?: IBrokerage;
    availability: IAvailability;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialLeasePlotSchema = new Schema<ICommercialLeasePlot>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        plotType: { type: [String], required: true },
        address: { type: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        required: true },
        landmark: { type: String, required: true },
        coordinates: { type: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        required: true },
        isCornerProperty: { type: Boolean, default: false }
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
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAmenities: { type: [String] },
        wholeSpaceAmenities: { type: [String] }
    },
    plotDetails: {
        totalPlotArea: { type: Number, required: true },
        zoningType: { type: String, required: true },
        infrastructure: { type: [String] },
        roadAccess: { type: String, required: true },
        securityRoom: { type: Boolean, default: false },
        previousConstruction: { type: String, required: true }
    },
    leaseDetails: {
        leaseAmount: { type: Number, required: true },
        leaseduration: {
            duration: { type: Number, required: true },
            type: { type: String, enum: ['month', 'year'], required: true },
            amountType: { type: String, enum: ['fixed', 'negotiable'], required: true }
        },
        leasetenure: {
            minimumTenure: {
                duration: { type: Number, required: true },
                type: { type: String, enum: ['month', 'year'], required: true }
            },
            maximumTenure: {
                duration: { type: Number, required: true },
                type: { type: String, enum: ['month', 'year'], required: true }
            },
            lockInPeriod: {
                duration: { type: Number, required: true },
                type: { type: String, enum: ['month', 'year'], required: true }
            },
            noticePeriod: {
                duration: { type: Number, required: true },
                type: { type: String, enum: ['month', 'year'], required: true }
            }
        },
        maintenanceCharges: {
            amount: { type: Number, required: true },
            frequency: { type: String, enum: ['monthly', 'quarterly', 'half-yearly', 'yearly'], required: true }
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
            otherCharges: { type: String, enum: ['inclusive', 'exclusive'] },
            amount: { type: Number }
        }
    },
    brokerage: {
        required: { type: Boolean },
        amount: { type: Number }
    },
    availability: {
        availableFrom: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String, required: true },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: {
            restricted: { type: Boolean, default: false },
            restrictions: { type: String }
        }
    },
    contactInformation: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        alternatePhone: { type: String },
        preferredContactTime: { type: String },
        bestTimeToContact: { type: String }
    },
    media: {
        photos: {
            exterior: [{ type: String }],
            interior: [{ type: String }],
            floorPlan: [{ type: String }],
            washroom: [{ type: String }],
            lift: [{ type: String }],
            emergencyExit: [{ type: String }]
        },
        videoTour: { type: String },
        documents: [{ type: String }]
    },
    metadata: {
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

// Indexes
CommercialLeasePlotSchema.index({ propertyId: 1 }, { unique: true });
CommercialLeasePlotSchema.index({ 'basicInformation.city': 1 });
CommercialLeasePlotSchema.index({ 'leaseDetails.leaseAmount': 1 });
CommercialLeasePlotSchema.index({ 'plotDetails.totalArea': 1 });

// Create and export model
const LeasePlot = model<ICommercialLeasePlot>('CommercialLeasePlot', CommercialLeasePlotSchema);
export default LeasePlot;

// Export interfaces
export {
    ICommercialLeasePlot,
    IBasicInformation,
    IPropertyDetails,
    IArea,
    IFloor,
    IPlotDetails,
    ILeaseDetails,
    IBrokerage,
    IAvailability,
    IContactInformation,
    IMedia,
    IMetadata
}; 