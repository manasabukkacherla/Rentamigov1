import mongoose, { Schema, model, Document, Types } from 'mongoose';

// Interfaces
export interface ICommercialLeasePlot extends Document {
    propertyId: string;
    basicInformation: {
        title: string;
        type: string[];
        address:{
            street: string;
            city: string;
            state: string;
            zipCode: string;
        };
        landmark?: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        isCornerProperty: boolean;
    };
    propertyDetails: {
        totalPlotArea: number;
        zoningType: string;
        infrastructure: string[];
        roadAccess: string;
        securityRoom: boolean;
        previousConstruction: string;  
        zoningInformation: string;
    };
    leaseTerms: {
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
    };
    availability: {
        availableFrom?: Date;
        availableImmediately?: boolean;
        availabilityStatus: string;
        leaseDuration?: string;
        noticePeriod?: string;
        isPetsAllowed?: boolean;
        operatingHours?: boolean;
    };
    contactInformation: {
        name: string;
        email: string;
        phone: string;
        alternatePhone?: string;
        bestTimeToContact?: string;
    };
    media: {
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
    };
    metadata: {
        userId: Schema.Types.ObjectId | null;
        userName: string;
        createdAt: Date;
        propertyType: string;
        propertyName: string;
        intent: string;
        status: string;
    };
}


// Schema
const CommercialLeasePlot = new Schema<ICommercialLeasePlot>({
    propertyId: { type: String, required: false, unique: false },
    basicInformation: {
        title: { type: String, required: false },
        plotType: { type: [String], required: false },
        address: { type: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            zipCode: { type: String, required: false },
        },
        required: false },
        landmark: { type: String },
        coordinates: { type: {
            latitude: { type: String, required: false },
            longitude: { type: String, required: false },
        },
        required: false },
        isCornerProperty: { type: Boolean, default: false }
    },
    propertyDetails: {
        totalPlotArea: { type: Number, required: false },
        zoningType: { type: String, required: false },
        infrastructure: { type: [String] },
        roadAccess: { type: String, required: false },
        securityRoom: { type: Boolean, default: false },
        previousConstruction: { type: String, required: false }
    },
    leaseTerms: {
        leaseAmount: { type: Number, required: false },
        leaseduration: {
            duration: { type: Number, required: false },
            type: { type: String, enum: ['month', 'year'], required: false },
            amountType: { type: String, enum: ['fixed', 'negotiable'], required: false }
        },
        leasetenure: {
            minimumTenure: {
                duration: { type: Number, required: false },
                type: { type: String, enum: ['month', 'year'], required: false }
            },
            maximumTenure: {
                duration: { type: Number, required: false },
                type: { type: String, enum: ['month', 'year'], required: false }
            },
            lockInPeriod: {
                duration: { type: Number, required: false },
                type: { type: String, enum: ['month', 'year'], required: false }
            },
            noticePeriod: {
                duration: { type: Number, required: false },
                type: { type: String, enum: ['month', 'year'], required: false }
            }
        }
    },
    availability: {
        availableFrom: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String, required: false },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: {type:Boolean,default:false}
    },
    contactInformation: {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
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
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String,default: 'Rent' },
        propertyName: { type: String,  default: 'Plot' },
        status: { type: String, default: 'Available' }
    }
});



// Create and export model
export default mongoose.model<ICommercialLeasePlot>('CommercialLeasePlot', CommercialLeasePlot);
// export defult LeasePlot;

// Export interfaces
