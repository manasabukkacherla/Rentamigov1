import { Schema, model, Document, Types } from 'mongoose';

interface IBasicInformation {
    title: string;
    plotType: string[];
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
    createdBy: Types.ObjectId;
    createdAt: Date;
}

interface IRentalTerms {
    rentDetails: {
        expectedRent: number;
        isNegotiable: boolean;
        rentType: string;
    }
    securityDeposit: {
        amount: number;
    }
    maintenanceAmount?: {
        amount?: number;
        frequency?: string;
    }
    otherCharges: {
        water: {
            amount?: number;
            type: string;
        }
        electricity: {
            amount?: number;
            type: string;
        }
        gas: {
            amount?: number;
            type: string;
        }
        others: {
            amount?: number;
            type: string;
        }
    }
    brokerage: {
        required: string;
        amount?: number;
    }
    availability: {
        type: string;
        date?: string;
    }
}

interface ICommercialRentPlot extends Document {
    propertyId: string;

    basicInformation: IBasicInformation;
    plotDetails: {
        totalArea: number;
        zoningType: string;
        boundaryWall: boolean;
        waterSewer: boolean;
        electricity: boolean;
        roadAccess: string;
        securityRoom: boolean;  
        previousConstruction: {
            exists: boolean;
            details?: string;
        }
    },
    propertyDetails: {
        area: {
            totalArea: number;
            carpetArea: number;
            builtUpArea: number;
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
        waterAvailability: string;
        propertyAge: string;
        propertyCondition: string;
      };
    rentalTerms: IRentalTerms;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialRentPlotSchema = new Schema<ICommercialRentPlot>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        plotType: { type: [String], required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        landmark: { type: String, required: true },
        location: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        isCornerProperty: { type: Boolean }
    },
    plotDetails: {
        totalArea: { type: Number, required: true },
        zoningType: { type: String, required: true },
        boundaryWall: { type: Boolean, required: true },
        waterSewer: { type: Boolean, required: true },
        electricity: { type: Boolean, required: true },
        roadAccess: { type: String, required: true },
        securityRoom: { type: Boolean, required: true },
        previousConstruction: {
            exists: { type: Boolean, required: true },
            details: { type: String, required: false },
        }
    },
    propertyDetails: {
        area: { 
          totalArea: { type: Number, required: true },
          carpetArea: { type: Number, required: true },
          builtUpArea: { type: Number, required: true },
        },
        floor: { 
          floorNumber: { type: Number, required: true },
          totalFloors: { type: Number, required: true },
        },
        facingDirection: { type: String, required: true },
        furnishingStatus: { type: String, required: true },
        propertyAmenities: { type: [String], required: true },
        wholeSpaceAmenities: { type: [String], required: true },
        electricitySupply: { 
          powerLoad: { type: Number, required: true },
          backup: { type: Boolean, required: true },
        },
        waterAvailability: { type: String, required: true },
        propertyAge: { type: String, required: true },
        propertyCondition: { type: String, required: true },
      },  
    rentalTerms: {
        rentDetails: {
            expectedRent: { type: Number, required: true },
            isNegotiable: { type: Boolean, default: false },
            rentType: { type: String, required: true },
        },
        securityDeposit: {
            amount: { type: Number, required: true },
        },
        maintenanceAmount: {
            amount: { type: Number },
            frequency: { type: String },
        },
        otherCharges: {
            water: {
                amount: { type: Number },
                type: { type: String, required: true },
            },
            electricity: {
                amount: { type: Number },
                type: { type: String, required: true },
            },
            gas: {
                amount: { type: Number },
                type: { type: String, required: true },
            },
            others: {
                amount: { type: Number },
                type: { type: String, required: true },
            }
        },
        brokerage: {
            required: { type: String, required: true },
            amount: { type: Number },
        },
        availability: {
            type: { type: String, required: true },
            date: { type: String },
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
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

// Indexes
// CommercialRentPlotSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialRentPlotSchema.index({ 'basicInformation.city': 1 });
CommercialRentPlotSchema.index({ 'basicInformation.state': 1 });
CommercialRentPlotSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
// export { ICommercialrentShop, IBasicInformation, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialRentPlot>('CommercialRentPlot', CommercialRentPlotSchema);