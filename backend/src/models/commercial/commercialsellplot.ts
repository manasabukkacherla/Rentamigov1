import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
    totalArea: number;
    carpetArea: number;
    builtUpArea: number;
}

interface ICoordinates {
    latitude: string;
    longitude: string;
}

interface IBasicInformation {
    title: string;
    plotType: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: string;
    longitude: string;
    isCornerProperty: boolean;
}

interface IPlotDetails {
    totalArea: number;
    zoningType: string;
    plotFacing?: string;
    roadWidth?: number;
    landmarkProximity?: string[];
    approvals?: string[];
    floorAreaRatio?: number;
    infrastructure: {
        boundaryWall: boolean;
        waterConnection: boolean;
        electricityConnection: boolean;
    };
    security: {
        securityRoom: boolean;
    };
    previousConstruction: boolean;
}

interface IPropertyDetails {
    area: IArea;
    zoning: string;
    facingDirection?: string;
    waterAvailability?: string;
    ownershipType?: string;
    propertyCondition?: string;
    permissibleFAR: number;
    permissibleHeight: number;
    groundCoverage: number;
    setback: {
        front: number;
        rear: number;
        sides: number;
    };
}

interface IPricingDetails {
    propertyPrice: number;
    priceType: "fixed" | "negotiable";
    area: number;
    totalPrice: number;
    pricePerSqFt: number;
}

interface IRegistration {
    type: "inclusive" | "exclusive";
    registrationCharges: number;
    stampDutyCharges: number;
}

interface IBrokerage {
    required: string;
    amount: number;
}

interface IAvailability {
    availableFrom?: Date;
    availableImmediately?: boolean;
    availabilityStatus: string;
    possessionDate: string;
    leaseDuration?: string;
    noticePeriod?: string;
    petsAllowed?: boolean;
    operatingHours?: {
        restricted: boolean;
        restrictions: string;
    };
    bookingAmount: number;
}

interface IContactInformation {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    preferredContactTime?: string;
    bestTimeToContact?: string;
}

interface IMedia {
    photos: {
        plot: string[];
        surroundings: string[];
        documents: string[];
    };
    videoTour?: string;
}

interface IMetadata {
    userId: Schema.Types.ObjectId | null;
    userName: string;
    createdAt: Date;
}

interface ICommercialPlot extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    plotDetails: IPlotDetails;
    propertyDetails: IPropertyDetails;
    pricingDetails: IPricingDetails;
    registration: IRegistration;
    brokerage?: IBrokerage;
    availability: IAvailability;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialPlotSchema = new Schema<ICommercialPlot>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        plotType: { type: String, required: true },
        address: { type: String, required: true },
        landmark: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
        isCornerProperty: { type: Boolean, default: false }
    },
    plotDetails: {
        totalArea: { type: Number, required: true },
        zoningType: { type: String, required: true },
        plotFacing: { type: String },
        roadWidth: { type: Number },
        landmarkProximity: [{ type: String }],
        approvals: [{ type: String }],
        floorAreaRatio: { type: Number },
        infrastructure: {
            boundaryWall: { type: Boolean, default: false },
            waterConnection: { type: Boolean, default: false },
            electricityConnection: { type: Boolean, default: false }
        },
        security: {
            securityRoom: { type: Boolean, default: false }
        },
        previousConstruction: { type: Boolean, default: false }
    },
    propertyDetails: {
        area: {
            totalArea: { type: Number, required: true },
            carpetArea: { type: Number, required: true },
            builtUpArea: { type: Number, required: true }
        },
        zoning: { type: String, required: true },
        facingDirection: { type: String },
        waterAvailability: { type: String },
        ownershipType: { type: String },
        propertyCondition: { type: String },
        permissibleFAR: { type: Number, required: true },
        permissibleHeight: { type: Number, required: true },
        groundCoverage: { type: Number, required: true },
        setback: {
            front: { type: Number, required: true },
            rear: { type: Number, required: true },
            sides: { type: Number, required: true }
        }
    },
    pricingDetails: {
        propertyPrice: { type: Number, required: true },
        priceType: { type: String, enum: ['fixed', 'negotiable'], required: true },
        area: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        pricePerSqFt: { type: Number, required: true }
    },
    registration: {
        type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
        registrationCharges: { type: Number, required: true },
        stampDutyCharges: { type: Number, required: true }
    },
    brokerage: {
        required: { type: String, enum: ['yes', 'no'] },
        amount: { type: Number }
    },
    availability: {
        availableFrom: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String, required: true },
        possessionDate: { type: String, required: true },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        petsAllowed: { type: Boolean, default: false },
        operatingHours: {
            restricted: { type: Boolean, default: false },
            restrictions: { type: String }
        },
        bookingAmount: { type: Number, required: true }
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
            plot: [{ type: String }],
            surroundings: [{ type: String }],
            documents: [{ type: String }]
        },
        videoTour: { type: String }
    },
    metadata: {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        userName:{type:String,default:"Not Specified"},
        createdAt: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

// Indexes
// CommercialPlotSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialPlotSchema.index({ 'basicInformation.city': 1 });
CommercialPlotSchema.index({ 'basicInformation.state': 1 });
CommercialPlotSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialPlotSchema.index({ 'plotDetails.totalArea': 1 });
CommercialPlotSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export {
    ICommercialPlot,
    IBasicInformation,
    IPlotDetails,
    IPropertyDetails,
    IArea,
    ICoordinates,
    IPricingDetails,
    IRegistration,
    IBrokerage,
    IAvailability,
    IContactInformation,
    IMedia,
    IMetadata
};

export default model<ICommercialPlot>('CommercialSellPlot', CommercialPlotSchema);