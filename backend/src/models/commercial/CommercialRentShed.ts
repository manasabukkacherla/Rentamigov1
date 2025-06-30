import { Schema, model, Document, Types } from 'mongoose';

interface IBasicInformation {
    title: string;
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
    createdBy: Schema.Types.ObjectId | string | null;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
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
}

interface ICommercialRentShed extends Document {
    propertyId: string;

    basicInformation: IBasicInformation;
    propertyDetails: {
        propertySize: number;
        propertyFeatures: {
            bedrooms: number;
            washrooms: number;
            balconies: number;
            hasParking: boolean;
            parkingDetails?: {
                twoWheeler?: number;
                fourWheeler?: number;
            };
            extraRooms: {
                servant: boolean;
                puja: boolean;
                store: boolean;
                others: boolean;
            };
            utilityArea: string;
            furnishingStatus: string;
            totalFloors: number;
            propertyOnFloor: string;
            facing: string;
            propertyAge: string;
            superBuiltUpAreaSqft: number;
            superBuiltUpAreaSqmt: number;
            builtUpAreaSqft: number;
            builtUpAreaSqmt: number;
            carpetAreaSqft: number;
            carpetAreaSqmt: number;
            electricityAvailability: string;
            waterAvailability: {
                borewell: boolean;
                governmentSupply: boolean;
                tankerSupply: boolean;
            };
        };          
    };
    rentalTerms: IRentalTerms; 
    brokerage: {
        required: string;
        amount?: number;
    }
    availability: {
        type: string;
        date?: string;
    }
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialRentShedSchema = new Schema<ICommercialRentShed>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
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
    propertyDetails: {
        propertySize: { type: Number, required: true },
        propertyFeatures: {
            bedrooms: { type: Number, required: true },
            washrooms: { type: Number, required: true },
            balconies: { type: Number, required: true },
            hasParking: { type: Boolean, required: true },
            parkingDetails: {
                twoWheeler: { type: Number, required: false },
                fourWheeler: { type: Number, required: false }
            },
            extraRooms: {
                servant: { type: Boolean, required: true },
                puja: { type: Boolean, required: true },
                store: { type: Boolean, required: true },
                others: { type: Boolean, required: true }
            },
            utilityArea: { type: String, required: true },
            furnishingStatus: { type: String, required: true },
            totalFloors: { type: Number, required: true },
            propertyOnFloor: { type: String, required: true },
            facing: { type: String},
            propertyAge: { type: String },
            superBuiltUpAreaSqft: { type: Number, required: true },
            superBuiltUpAreaSqmt: { type: Number, required: true },
            builtUpAreaSqft: { type: Number, required: true },
            builtUpAreaSqmt: { type: Number, required: true },
            carpetAreaSqft: { type: Number, required: true },
            carpetAreaSqmt: { type: Number, required: true },
            electricityAvailability: { type: String},
            waterAvailability: {
                borewell: { type: Boolean, required: true },
                governmentSupply: { type: Boolean, required: true },
                tankerSupply: { type: Boolean, required: true }
            }
        },
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
    },
    brokerage: {
        required: { type: String, required: true },
        amount: { type: Number },
    },
    availability: {
        type: { type: String, required: true },
        date: { type: String },
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
        createdBy: { type: Schema.Types.ObjectId, required: false },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, required: true },
        intent: { type: String, required: true },
        propertyName: { type: String, required: true },
        status: { type: String, required: true },
    },
}, {
    timestamps: true
});

// Indexes
// CommercialRentShedSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialRentShedSchema.index({ 'basicInformation.city': 1 });
CommercialRentShedSchema.index({ 'basicInformation.state': 1 });
CommercialRentShedSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
// export { ICommercialrentShop, IBasicInformation, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialRentShed>('CommercialRentShed', CommercialRentShedSchema);