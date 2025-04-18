import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
    totalArea: number;
    builtUpArea: number;
    carpetArea: number;
}

interface IBasicInformation {
    title: string;
    officeType: string[];
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    landmark: string;
    location: {
        latitude?: number;
        longitude?: number;
    };
    isCornerProperty: boolean;
}

interface IOfficeDetails {
    seatingCapacity: number;
    cabins: {
        available: boolean;
        count?: number;
    };
    conferenceRoom: boolean;
    meetingRoom: boolean;
    receptionArea: boolean;
    wifiSetup: boolean;
    serverRoom: boolean;
    coworkingFriendly: boolean;
}

interface IAvailability {
    availableFrom?: string;
    availableImmediately: boolean;
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
    };
    securityDeposit: {
        amount: number;
    };
    maintenanceAmount: {
        amount: number;
        frequency: string;
    };
    otherCharges: {
        water: {
            amount?: number;
            type: string;
        };
        electricity: {
            amount?: number;
            type: string;
        };
        gas: {
            amount?: number;
            type: string;
        };
        others: {
            amount?: number;
            type: string;
        };
    };
    brokerage: {
        required: string;
        amount?: number;
    };
    availability: {
        type: string;
        date?: string;
    };
}

interface IFloor {
    floorNumber: number;
    totalFloors: number;
}

interface ICommercialRentOfficeSpace extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    officeDetails: IOfficeDetails;
    propertyDetails: {
        area: IArea;
        floor: IFloor;
        facingDirection: string;
        furnishingStatus: string;
        propertyAmenities: string[];
        wholeSpaceAmenities: string[];
        electricitySupply: {
            powerLoad: number;
            backup: boolean;
        };
        waterAvailability: string;
        propertyAge: number;
        propertyCondition: string;
    };
    rentalTerms: IRentalTerms;
    availability: IAvailability;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialRentOfficeSpaceSchema = new Schema<ICommercialRentOfficeSpace>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        officeType: [{ type: String, required: true }],
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        landmark: { type: String, required: true },
        location: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        isCornerProperty: { type: Boolean }
    },
    officeDetails: {
        seatingCapacity: { type: Number, required: true },
        cabins: {
            available: { type: Boolean, required: true },
            count: { type: Number }
        },
        conferenceRoom: { type: Boolean, required: true },
        meetingRoom: { type: Boolean, required: true },
        receptionArea: { type: Boolean, required: true },
        wifiSetup: { type: Boolean, required: true },
        serverRoom: { type: Boolean, required: true },
        coworkingFriendly: { type: Boolean, required: true }
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
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number },
            backup: { type: Boolean, default: false }
        },
        waterAvailability: [{ type: String }],
        propertyAge: { type: Number },
        propertyCondition: { type: String }
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
            amount: { type: Number, required: true },
            frequency: { type: String, required: true },
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
    availability: {
        availableFrom: { type: String },
        availableImmediately: { type: Boolean, required: true }
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
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

// Indexes
CommercialRentOfficeSpaceSchema.index({ 'basicInformation.city': 1 });
CommercialRentOfficeSpaceSchema.index({ 'basicInformation.state': 1 });
CommercialRentOfficeSpaceSchema.index({ 'rentalTerms.rentDetails.expectedRent': 1 });
CommercialRentOfficeSpaceSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialRentOfficeSpaceSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialRentOfficeSpace, IBasicInformation, IArea, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialRentOfficeSpace>('CommercialRentOfficeSpace', CommercialRentOfficeSpaceSchema); 