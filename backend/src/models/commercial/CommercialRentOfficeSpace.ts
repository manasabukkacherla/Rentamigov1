import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
    totalArea: number;
    builtUpArea: number;
    carpetArea: number;
}

interface IBasicInformation {
    title: string;
    Type: string[];
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
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: 'Commercial';
    propertyName:'Office Space';
    intent:'Rent';
    status: 'Available' | 'Rented' | 'Under Maintenance' ;
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
        propertyAge: string;
        propertyCondition: string;
    };
    rentalTerms: IRentalTerms;
    
    brokerage: {
        required: string;
        amount?: number;
    };
    availability: {
        type: string;
        date?: string;
    };
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema
const CommercialRentOfficeSpaceSchema = new Schema<ICommercialRentOfficeSpace>({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        Type: [{ type: String, required: true }],
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        landmark: { type: String, required: true },
        location: {
            latitude: { type: String ,required:true},
            longitude: { type: String ,required:true},
        },
        isCornerProperty: { type: Boolean,default:false }
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
        propertyAge: { type: String },
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
            frequency: { type: String},
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
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        // propertyType: { type: String, default:'Commercial', required: true },
        // propertyName:{type:String},
        // intent: { type: String, default:'Rent', required: true },
        // status: { 
        //     type: String, 
        //     enum: ['available', 'rented', 'Under Maintenance'], 
        //     default: 'available' 
        // }
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String,default: 'Rent' },
        propertyName: { type: String,  default: 'Office Space' },
        status: { type: String, default: 'Available' } 
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
export { ICommercialRentOfficeSpace, IBasicInformation, IArea, IContactInformation, IMedia, IMetadata };
export default model<ICommercialRentOfficeSpace>('CommercialRentOfficeSpace', CommercialRentOfficeSpaceSchema); 