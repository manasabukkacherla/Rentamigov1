import { Schema, model, Document, Types } from 'mongoose';

// Common interfaces
interface IArea {
    totalArea: number;
    carpetArea: number;
    builtUpArea: number;
}

interface IFloor {
    floorNumber: number;
    totalFloors: number;
}

interface IBasicInformation {
    title: string;
    showroomType: string;
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
    isCornerProperty?: boolean;
}
interface showRoomDetails {
    totalSpace: number;
    frontageWidth: number;
    ceilingHeight: number;
    glassFrontage: boolean;
    lightingType: string;
    acInstalled: boolean;
    nearbyCompetitors: {
        present: boolean;
        brandNames: string;
    };
    displayRacks: boolean;
}
interface propertyDetails {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
        powerLoad: number | null;
        backup: boolean;
    };
    waterAvailability: string[];
    propertyAge: number | null;
    propertyCondition: string;
}
interface IRentalDetails {
    expectedRent: number;
    rentType: "inclusive" | "exclusive";
    isNegotiable: boolean;
    securityDeposit: {
        amount: number;
        depositType: string;
    };
    maintenanceCharges?: {
        amount?: number;
        frequency?: "monthly" | "quarterly" | "yearly" | "Half-yearly";
    };
    otherCharges: {
        water: {
            amount: number;
            type: string;
        };
        electricity: {
            amount: number;
            type: string;
        };
        gas: {
            amount: number;
            type: string;
        };
        others: {
            amount: number;
            type: string;
        };
        brokerage: {
            required: boolean;
            amount: number;
        };


    };

}

interface IAvailability {
    immediate: boolean;
    specificDate: Date;

};


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

interface ICommercialRentShowroom extends Document {
    propertyId: string;
    basicInformation: IBasicInformation;
    showroomDetails: showRoomDetails;
    propertyDetails: propertyDetails;
    rentalDetails: IRentalDetails;
    brokerage: {
        required: string;
        amount: number;
    };
    availability: IAvailability;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialRentShowroomSchema = new Schema<ICommercialRentShowroom>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        showroomType: [{ type: String, required: true }],
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
        isCornerProperty: { type: Boolean, default: false }
    },
    showroomDetails: {
        totalSpace: { type: Number, required: true },
        frontageWidth: { type: Number, required: true },
        ceilingHeight: { type: Number, required: true },
        glassFrontage: { type: Boolean, default: false },
        lightingType: { type: String },
        acInstalled: { type: Boolean, default: false },
        nearbyCompetitors: {
            present: { type: Boolean, default: false },
            brandNames: { type: String }
        },
        displayRacks: { type: Boolean, default: false }
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
        facingDirection: { type: String, required: false },
        furnishingStatus: { type: String, required: false },
        propertyAmenities: [{ type: String, required: false }],
        wholeSpaceAmenities: [{ type: String, required: false }],
        electricitySupply: {
            powerLoad: { type: Number, required: false, default: null },
            backup: { type: Boolean, default: false }
        },
        waterAvailability: { type: [String], default: [] },
        propertyAge: { type: Number, required: false, default: null },
        propertyCondition: { type: String, required: false, default: 'new' }
    },
    rentalDetails: {
        expectedRent: { type: Number, required: true },
        rentType: { type: String, enum: ['inclusive', 'exclusive'], required: true },
        isNegotiable: { type: Boolean, default: false },
        securityDeposit: {
            amount: { type: Number, required: true },
            depositType: { type: String }
        },
        maintenanceCharges: {
            amount: { type: Number, required: false },
            frequency: {
                type: String,
                enum: ['monthly', 'quarterly', 'yearly', 'half-yearly', ''],
                required: false,
                default: null,
                validate: {
                    validator: function (v: string) {
                        return v === '' || ['monthly', 'quarterly', 'yearly', 'half-yearly'].includes(v);
                    },
                    message: 'Invalid frequency value'
                }
            }
        },
        otherCharges: {
            water: {
                amount: { type: Number, required: false },
                type: { type: String, required: true }
            },
            electricity: {
                amount: { type: Number, required: false },
                type: { type: String, required: true }
            },
            gas: {
                amount: { type: Number, required: false },
                type: { type: String, required: true }
            },
            others: {
                amount: { type: Number, required: false },
                type: { type: String, required: true }
            },
            propertyTax: { type: Boolean, default: false },
            otherInclusives: [{ type: String }]
        },
        lockInPeriod: { type: Number },
        rentFreeMonth: { type: Boolean, default: false },
        rentFreeDuration: { type: Number }
    },
    brokerage: {
        required: { type: String, enum: ['yes', 'no'], required: true },
        amount: { type: Number }
    },
    availability: {
        immediate: { type: Boolean, default: false },
        specificDate: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        petsAllowed: { type: Boolean, default: false },
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
CommercialRentShowroomSchema.index({ propertyId: 1 }, { unique: true });
CommercialRentShowroomSchema.index({ 'basicInformation.city': 1 });
CommercialRentShowroomSchema.index({ 'basicInformation.state': 1 });
CommercialRentShowroomSchema.index({ 'rentalDetails.expectedRent': 1 });
CommercialRentShowroomSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialRentShowroomSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialRentShowroom, IBasicInformation, IArea, IRentalDetails, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialRentShowroom>('CommercialRentShowroom', CommercialRentShowroomSchema); 