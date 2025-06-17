import mongoose, { Schema, model, Document, Types } from 'mongoose';

// Interfaces
export interface ICommercialLeasePlot extends Document {
    propertyId: string;
    basicInformation: {
        title: string;
        Type: string[];
        address:{
            street: string;
            city: string;
            state: string;
            zipCode: string;
        };
        landmark?: string;
        location: {
            latitude: string;
            longitude: string;
        };
        isCornerProperty: boolean;
    };
    plotDetails: {
        totalArea: number;
        zoningType: string;
        boundaryWall?: boolean;
        waterSewer?: boolean;
        electricity?: boolean;
        roadAccess: string;
        securityRoom: boolean;  
        previousConstruction: string;
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
        createdBy: Schema.Types.ObjectId | null;
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
        title: { type: String, required: false, default: '' },
        Type: [{ type: String, required: false, default: '' }],
        address: { type: {
            street: { type: String, required: false, default: '' },
            city: { type: String, required: false, default: '' },
            state: { type: String, required: false, default: '' },
            zipCode: { type: String, required: false, default: '' },
        },
        required: false, default: undefined },
        landmark: { type: String, default: '' },
        location: { type: {
            latitude: { type: String, required: false, default: '' },
            longitude: { type: String, required: false, default: '' },
        },
        required: false, default: undefined },
        isCornerProperty: { type: Boolean, default: false }
    },
    plotDetails: {
        totalPlotArea: { type: Number, required: false, default: 0 },
        zoningType: { type: String, required: false, default: 'commercial' },
        boundaryWall: { type: Boolean, default: false },
        waterSewer: { type: Boolean, default: false },
        electricity: { type: Boolean, default: false },
        roadAccess: { type: String, required: false, default: '' },
        securityRoom: { type: Boolean, default: false },
        previousConstruction: { type: String, required: false, default: '' }
    },
    leaseTerms: {
        leaseAmount: { type: Number, required: false, default: 0 },
        leaseduration: {
            duration: { type: Number, required: false, default: 0 },
            type: { type: String, enum: ['month', 'year'], required: false, default: 'month' },
            amountType: { type: String, enum: ['fixed', 'negotiable'], required: false, default: 'fixed' }
        },
        leasetenure: {
            minimumTenure: {
                duration: { type: Number, required: false, default: 0 },
                type: { type: String, enum: ['month', 'year'], required: false, default: 'month' }
            },
            maximumTenure: {
                duration: { type: Number, required: false, default: 0 },
                type: { type: String, enum: ['month', 'year'], required: false, default: 'month' }
            },
            lockInPeriod: {
                duration: { type: Number, required: false, default: 0 },
                type: { type: String, enum: ['month', 'year'], required: false, default: 'month' }
            },
            noticePeriod: {
                duration: { type: Number, required: false, default: 0 },
                type: { type: String, enum: ['month', 'year'], required: false, default: 'month' }
            }
        },
       
    },
    availability: {
        availableFrom: { type: Date, default: Date.now },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String, required: false, default: 'later' },
        leaseDuration: { type: String, default: '' },
        noticePeriod: { type: String, default: '' },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: { type: Boolean, default: false }
    },
    contactInformation: {
        name: { type: String, required: false, default: '' },
        email: { type: String, required: false, default: '' },
        phone: { type: String, required: false, default: '' },
        alternatePhone: { type: String, default: '' },
        preferredContactTime: { type: String, default: '' },
        bestTimeToContact: { type: String, default: '' }
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
