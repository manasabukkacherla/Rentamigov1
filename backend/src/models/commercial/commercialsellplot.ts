import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
    totalArea: number;
    carpetArea: number;
    builtUpArea: number;
}

interface IBasicInformation {
    title: string;
    Type: string[];
    address: string;
    landmark: string;
    city: string;
    state: string;
    zipCode: string;
    location: { latitude: string; longitude: string };
    isCornerProperty: boolean;
}

interface IPlotDetails {
    totalArea: number;
    zoningType: string;
    boundaryWall: boolean;
    waterSewer: boolean;
    electricity: boolean;
    roadAccess: string;
    securityRoom: boolean;
    previousConstruction: string;
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
    availableImmediately?: boolean;
    availabilityStatus: string;
    possessionDate: string;
    leaseDuration?: string;
    noticePeriod?: string;
    petsAllowed?: boolean;
    operatingHours: any;
    bookingAmount?: number;
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
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
}

interface ICommercialPlot extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    plotDetails: IPlotDetails;
    pricingDetails: IPricingDetails;
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
        Type: [{ type: String, required: true }],
        address: { type: String, required: true },
        landmark: { type: String, required: true },
        location: { latitude: String, longitude: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
    
        isCornerProperty: { type: Boolean, default: false }
    },
    plotDetails: {
        totalArea: { type: Number},
        zoningType: { type: String },
        boundaryWall: { type: Boolean },
        waterSewer: { type: Boolean },
        electricity: { type: Boolean },
        previousConstruction: [{type:String}],
        roadAccess: { type: String },
        securityRoom: { type: Boolean },
       
    },
    pricingDetails: {
        propertyPrice: { type: Number, required: true },
        priceType: { type: String, enum: ['fixed', 'negotiable'], required: true },
        area: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        pricePerSqFt: { type: Number, required: true }
    },
    availability: {
        availableFrom: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String, required: true },
        possessionDate: { type: String, required: true },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        petsAllowed: { type: Boolean, default: false },
        operatingHours: { type: Schema.Types.Mixed },
        bookingAmount: { type: Number}
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
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String,default: 'Sell' },
        propertyName: { type: String,  default: 'Plot' },
        status: { type: String, default: 'Available' }
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
    IArea,
    IPricingDetails,
    IAvailability,
    IContactInformation,
    IMedia,
    IMetadata
};

export default model<ICommercialPlot>('CommercialSellPlot', CommercialPlotSchema);