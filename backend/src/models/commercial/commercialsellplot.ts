import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
    totalArea: number;
    carpetArea: number;
    builtUpArea: number;
}

interface IBasicInformation {
    title: string;
    plotType: string[],
    address: string,
    landmark: string,
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    isCornerProperty: boolean;
}

interface IPricingDetails {
    propertyPrice: number;
    priceType: "fixed" | "negotiable";
    area: number;
    totalPrice: number;
    pricePerSqFt: number;
}

interface IAvailability {
    availableFrom?: Date;
    availabilityStatus: string;
    possessionDate: string;
    bookingAmount: number;
}

interface IContactInformation {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    preferredContactTime?: string;
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
    createdBy: Types.ObjectId;
    createdAt: Date;
}

interface IPlotDetails {
    totalArea: number;
    zoningType: string;
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

interface ICommercialPlot extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    plotDetails: IPlotDetails;
    propertyDetails: {
        area: IArea;
        zoning: string;
        permissibleFAR: number;
        permissibleHeight: number;
        groundCoverage: number;
        setback: {
            front: number;
            rear: number;
            sides: number;
        };
    };
    pricingDetails: IPricingDetails;
    registration: {
        type: "inclusive" | "exclusive";
        registrationCharges: number;
        stampDutyCharges: number;
    };
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
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        isCornerProperty: { type: Boolean, required: true }
    },
    plotDetails: {
        totalArea: { type: Number, required: true },
        zoningType: { type: String, required: true },
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
    availability: {
        availableFrom: { type: Date },
        availabilityStatus: { type: String, required: true },
        possessionDate: { type: String, required: true },
        bookingAmount: { type: Number, required: true }
    },
    contactInformation: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        alternatePhone: { type: String },
        preferredContactTime: { type: String }
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
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

// Indexes
CommercialPlotSchema.index({ propertyId: 1 }, { unique: true });
CommercialPlotSchema.index({ 'basicInformation.city': 1 });
CommercialPlotSchema.index({ 'basicInformation.state': 1 });
CommercialPlotSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialPlotSchema.index({ 'plotDetails.totalArea': 1 });
CommercialPlotSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialPlot, IBasicInformation, IArea, IPricingDetails, IAvailability, IContactInformation, IMedia, IMetadata, IPlotDetails };
export default model<ICommercialPlot>('CommercialPlot', CommercialPlotSchema);