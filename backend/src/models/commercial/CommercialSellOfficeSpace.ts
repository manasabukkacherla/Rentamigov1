
import { Schema, model, Document } from 'mongoose';

// Area interface
interface IArea {
    totalArea: number;
    builtUpArea: number;
    carpetArea: number;
}

// Floor interface
interface IFloor {
    floorNumber: number;
    totalFloors: number;
}

// Basic Information interface
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

// Office Details interface
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

// Price interface
interface IPricingDetails {
   propertyPrice: number;
  pricetype: "fixed" | "negotiable";
}

// Registration Charges interface
interface IRegistration {
    chargestype: 'inclusive' | 'exclusive',
    registrationAmount?: number,
    stampDutyAmount?: number
}

// Brokerage interface
interface IBrokerage {
    required: string;
    amount?: number;
}

// Availability interface
interface IAvailability {
    type: string;
    date?: Date | string | null;
}

// Contact Information interface
interface IContactInformation {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
}

// Media interface
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

// Metadata interface
interface IMetadata {
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
}

// Main interface for Commercial Sell Office Space
interface ICommercialSellOfficeSpace extends Document {
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
        waterAvailability: string[];
        propertyAge: string;
        propertyCondition: string;
    };
    pricingDetails: IPricingDetails;
    registration: IRegistration;
    brokerage: IBrokerage;
    availability: IAvailability;
    contactInformation: IContactInformation;
    media: IMedia;
    metadata: IMetadata;
}

// Schema definition
const CommercialSellOfficeSpaceSchema = new Schema<ICommercialSellOfficeSpace>({
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
        isCornerProperty: { type: Boolean, default: false }
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
            builtUpArea: { type: Number, required: true },
            carpetArea: { type: Number, required: true }
        },
        floor: {
            floorNumber: { type: Number, required: true },
            totalFloors: { type: Number, required: true }
        },
        facingDirection: { type: String, required: true },
        furnishingStatus: { type: String, required: true },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number, required: true },
            backup: { type: Boolean, required: true }
        },
        waterAvailability: [{ type: String, required: true }],
        propertyAge: { type:String, required: true },
        propertyCondition: { type: String, required: true }
    },
    pricingDetails: {
        propertyPrice: { type: Number, required: true },
        pricetype: { type: String, enum: ['fixed', 'negotiable'], default: 'fixed' }
    },
    registration: {
        chargestype: { type: String, enum: ['inclusive', 'exclusive'], default: 'inclusive' },
        registrationAmount: { type: Number },
        stampDutyAmount: { type: Number },
    },
    brokerage: {
        required: { type: String, required: true },
        amount: { type: Number }
    },
    availability: {
        type: { type: String, required: true, enum: ['immediate', 'specific'] },
        date: { type: Date }
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
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String,default: 'Sell' },
        propertyName: { type: String,  default: 'Office Space' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});

const CommercialSellOfficeSpace = model<ICommercialSellOfficeSpace>('CommercialSellOfficeSpace', CommercialSellOfficeSpaceSchema);

export default CommercialSellOfficeSpace;

