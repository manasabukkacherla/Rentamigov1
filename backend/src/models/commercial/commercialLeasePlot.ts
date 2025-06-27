import mongoose, { Schema, model, Document, Types } from 'mongoose';

// Interfaces
export interface ICommercialLeasePlot extends Document {
    propertyId: string;
    basicInformation: {
        title: string;
        plotType: string[];
        address: {
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
        leaseAmount: {
            amount: number;
            duration: number;
            durationType: string;
            amountType: "fixed" | "negotiable";
        };
        leaseTenure: {
            minimumTenure: string;
            minimumUnit: string;
            maximumTenure: string;
            maximumUnit: string;
            lockInPeriod: string;
            lockInUnit: string;
            noticePeriod: string;
            noticePeriodUnit: string;
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
        plotType: [{ type: String, required: false }],
        address: {
            street: { type: String, required: false, default: '' },
            city: { type: String, required: false, default: '' },
            state: { type: String, required: false, default: '' },
            zipCode: { type: String, required: false, default: '' },
        },
        landmark: { type: String, default: '' },
        location: {
            latitude: { type: String, required: false, default: '' },
            longitude: { type: String, required: false, default: '' },
        },
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
        leaseAmount: {
            amount: { type: Number, required: true, default: 0 },
            duration: { type: Number, required: true, default: 0 },
            durationType: { type: String, enum: ['month', 'year'], required: true, default: 'month' },
            amountType: { type: String, enum: ['fixed', 'negotiable'], required: true, default: 'fixed' },
        },
        leaseTenure: {
            minimumTenure: { type: String, default: "0" },
            minimumUnit: { type: String, default: "months" },
            maximumTenure: { type: String, default: "0" },
            maximumUnit: { type: String, default: "months" },
            lockInPeriod: { type: String, default: "0" },
            lockInUnit: { type: String, default: "months" },
            noticePeriod: { type: String, default: "0" },
            noticePeriodUnit: { type: String, default: "months" },
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
        bestTimeToContact: { type: String, default: '' }
    },
    media: {
        photos: {
            exterior: [{ type: String }],
            
        },
        videoTour: { type: String },
        documents: [{ type: String }]
    },
    metadata: {
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Rent' },
        propertyName: { type: String, default: 'Plot' },
        status: { type: String, default: 'Available' }
    }
});



// Create and export model
export default mongoose.model<ICommercialLeasePlot>('CommercialLeasePlot', CommercialLeasePlot);
// export defult LeasePlot;

// Export interfaces
