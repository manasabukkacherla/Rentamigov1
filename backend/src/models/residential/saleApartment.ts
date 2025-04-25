import mongoose, { Schema, Document, Types } from 'mongoose';
import { NumberListInstance } from 'twilio/lib/rest/pricing/v2/number';


interface propertyDetails {
    propertyId?: string;
    title: string;
    showflat?: boolean;
    apartmentNo: string;
    flatno: string;
    floor: string;
    city: string;
    state: string;
    zipcode: string;
    address: string;
    location?: string;
}


interface propertyDetails {
    propertysize: number;
    bedrooms: number;
    washrooms: number
    balconies: number;
    parkingdetails: 'yes' | 'No';
    twowheelerparking?: number;
    fourwheelerparking?: number;
    ExtraRooms?: string[];
    utility?: 'Yes' | 'No';
    Furnishingstatus?: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';
    totalfloors: number;
    propertyonfloor: number;
    propertyfacing: string;
    propertyage: string;
    superareasqft: number;
    superareasqmt: number;
    builtupareasqft: number;
    builtupareasqmt: number;
    carpetareasqft: number;
    carpetareasqmt: number;
    electricityavailability: string;
    wateravailability: string[];
};

interface flatamenities {
    lights: number;
    Geyers: number;
    lofts: number;
    clothhanger: number;
    cotwithmattress: number;
    airconditioner: number;
    exhaustfan: number;
    ceilingfan: number;
    wardrobes: number;
    kitchen: number;
    dining: number;
    sidetable: number;
    desertcooler: number;

}

interface availableitems {
    availableitems: string[];
    securityandsafety: string[];
    powerutility: string[];
    parkingtranspotation: string[];
    recreationalsportsfacilities: string[];
    childrenfamilyamenities: string[];
    healthwellnessfacilities: string[];
    shoppingconviencestores: string[];
    ecofriendlysustainable: string[];
    communityculturalspaces: string[]
    smarthometechnology: string[]
}

interface pricedetails {
    propertyprice: number;
    pricetype: 'negotiable' | 'fixed';
    pricepersqft?: number;
    additionalcharges:
    {
        chargestype: 'inclusive' | 'exclusive';
        registrationcharges?: number;
        stampdutycharges?: number;
        othercharges?:
        {
            watercharges?:
            {
                type: 'inclusive' | 'exclusive';
                amount?: number;
            }
            electricitycharges?:
            {
                type: 'inclusive' | 'exclusive';
                amount?: number;
            }
            gascharges?:
            {
                type: 'inclusive' | 'exclusive';
                amount?: number;
            }
            othercharges?:
            {
                type: 'inclusive' | 'exclusive';
                amount?: number;
            }


        }
        brokerages:
        {
            type: 'yes' | 'no';
            amount?: number;
        }
    }

}

interface availability {
    availablefrom: string;
    date?: string;


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
    createdBy: Types.ObjectId | null;
    createdAt: Date;
    updatedAt?: Date;
    status: 'active' | 'inactive' | 'sold' | 'rented';
    views: number;
    favorites: number;
    isVerified: boolean;
}interface IMedia {
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
    createdBy: Types.ObjectId | null;
    createdAt: Date;
    updatedAt?: Date;
    status: 'active' | 'inactive' | 'sold' | 'rented';
    views: number;
    favorites: number;
    isVerified: boolean;
}

