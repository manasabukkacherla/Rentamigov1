// import mongoose, { Schema, Document, Types } from 'mongoose';
// import { NumberListInstance } from 'twilio/lib/rest/pricing/v2/number';

// interface IBasicInformation {
//     propertyId?: string;
//     title: string;
    
//     showflat: boolean;
//     apartmentType: string;
//     flatno: number;
//     floor: number;
//     address: {
//       street: string;
//       city: string;
//       state: string;
//       zipCode: string;
      
//     location?: string;
//     };
//   }
// // export interface ICommercialLeaseOthers extends Document {
// //     propertyId?: string;
// //     title: string;
// //     showflat: boolean;
// //     apartmentType: string;
// //     flatno: number;
// //     floor: number;
// //     city: string;
// //     state: string;
// //     zipcode: string;
// //     address: string;
// //     location?: string;
// // };

// interface propertyDetails {
//     propertysize: number;
//     bedrooms: number;
//     washrooms: number
//     bathrooms: number;
//     balconies: number;
//     parkingdetails: 'yes' | 'No';
//     ExtraRooms: string[];
//     utility: 'Yes' | 'No';
//     Furnishingstatus: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';
//     totalfloors: number;
//     propertyonfloor: number;
//     propertyfacing: string;
//     propertyage: string;
//     superareasqft: number;
//     superareasqmt: number;
//     builtupareasqft: number;
//     builtupareasqmt: number;
//     carpetareasqft: number;
//     carpetareasqmt: number;
//     electricityavailability: string;
//     wateravailability: string[];
// };

// interface flatamenities {
//     lights: number;
//     geysers: number;
//     lofts: number;
//     clothHanger: number;
//     cotWithMattress: number;
//     airConditioner: number;
//     exhaustFan: number;
//     ceilingFan: number;
//     wardrobes: number;
//     kitchenCabinets: number;
//     diningTableWithChairs: number;
//     sideTable: number;
//     desertCooler: number;
// }

// interface availableitems {
//     availableitems: string[];
//     powerutility: string[];
//     parkingtranspotation: string[];
//     recreationalsportsfacilities: string[];
//     childrenfamilyamenities: string[];
//     healthwellnessfacilities: string[];
//     shoppingconviencestores: string[];
//     ecofriendlysustainable: string[];
//     communityculturalspaces: string[]
//     smarthometechnology: string[]
//     otheritems: string[];
// }

// interface pricedetails {
//     propertyprice: number;
//     pricetype: 'negotiable' | 'fixed';
//     additionalcharges:
//     {
//         chargestype: 'inclusive' | 'exclusive';
//         registrationcharges?: number;
//         stampdutycharges?: number;
//         othercharges:
//         {
//             watercharges:
//             {
//                 type: 'inclusive' | 'exclusive';
//                 amount?: number;
//             }
//             electricitycharges:
//             {
//                 type: 'inclusive' | 'exclusive';
//                 amount?: number;
//             }
//             gascharges:
//             {
//                 type: 'inclusive' | 'exclusive';
//                 amount?: number;
//             }
//             othercharges:
//             {
//                 type: 'inclusive' | 'exclusive';
//                 amount?: number;
//             }


//         }
//         brokerages:
//         {
//             type: 'yes' | 'no';
//             amount?: number;
//         }
//     }

// }


// interface IMetadata {
//     createdBy: Schema.Types.ObjectId | string;
//     createdAt: Date;
//   }

// interface availability {
//     availablefrom: string;
//     date?: string;


// }

// interface IMedia {
//     photos: {
//       exterior: string[]; 
//       interior: string[]; 
//       floorPlan: string[]; 
//       washrooms: string[]; 
//       lifts: string[]; 
//       emergencyExits: string[]; 
//     };
//     videoTour?: string; 
//     documents: string[]; 
//   }


//   interface IResidentialRentAppartment extends Document {
//     propertyId: string;
    
//     basicInformation: IBasicInformation;
// //    AppartmentDetails: ;
//     propertyDetails: propertyDetails;
//     flatAmenities: flatamenities;
     
//     priceDetails: pricedetails;
//     media: IMedia;
//     metadata: IMetadata;
//   }
  






// const ResidentailRentAppartmentSchema = new Schema<IResidentialRentAppartment>({
//     propertyId: { type: String, required: true, unique: true },
//     basicInformation:{
//     title: { type: String, required: true},
//     showflat: { type: Boolean, required: true},
//     apartmentType:{ type: String, required: true},
//     flatno:{ type: Number, required: true},
//     floor:{ type: Number, required: true},
//     address: {
//       street: { type: String, required: true},
//       city:  { type: String, required: true},
//       state:{ type: String, required: true},
//       zipCode: { type: String, required: true},
      
//     location: { type: String},
//     },
// },
      
    
// //     AppartmentDetails: {
      
// //     },
//     propertyDetails: {
//       propertysize:{ type:Number, required:true},
//       bedrooms: { type:Number, required:true},
//     washrooms: { type:Number, required:true},
//     bathrooms: { type:Number, required:true},
//     balconies: { type:Number, required:true},
//     parkingdetails: { type: String, required: true},
//     ExtraRooms: { type:String, required:true},
//     utility: { type: String, required: true}, 
//     Furnishingstatus: { type: String, required: true},
//     totalfloors:{ type:Number, required:true},
//     propertyonfloor:{ type:Number, required:true},
//     propertyfacing:{ type:String, required:true},
//     propertyage: { type:Number, required:true},
//     superareasqft: { type:Number, required:true},
//     superareasqmt: { type:Number, required:true},
//     builtupareasqft: { type:Number, required:true},
//     builtupareasqmt: { type:Number, required:true},
//     carpetareasqft: { type:Number, required:true},
//     carpetareasqmt: { type:Number, required:true},
//     electricityavailability: { type:String, required:true},
//     wateravailability: { type:String, required:true},
//     },


//     priceDetails: {
//         propertyprice: { type:Number, required:true},
//         pricetype: { type: String, required: true} ,
//         additionalcharges:
//         {
//             chargestype:  { type: String, required: true},
//             registrationcharges?:{ type:Number, required:true},
//             stampdutycharges?:{ type:Number, required:true},
      
//       otherCharges: {
//         water: {
//             amount: { type: Number },
//             type: { type: String, required: true},
//         },
//         electricity: {
//             amount: { type: Number },
//             type: { type: String, required: true},
//         },
//         gas: {
//             amount: { type: Number },
//             type: { type: String, required: true},
//         },
//         others: {
//             amount: { type: Number },
//             type: { type: String, required: true},
//         }
//     },

//       brokerage: {
//         required: { type: String, required: true },
//         amount: { type: Number }
//       },
//     //   availability: {
//     //     type: { type: String, required: true, enum: ['Immediate', 'Specific Date'] },
//     //     date: { type: String }
//     //   }
// },
//     },
    
//     media: {
//       photos: {
//         exterior: [{ type: String }], 
//         interior: [{ type: String }], 
//         floorPlan: [{ type: String }], 
//         washrooms: [{ type: String }],
//         lifts: [{ type: String }],
//         emergencyExits: [{ type: String }] 
//       },
//       videoTour: { type: String }, 
//       documents: [{ type: String }] 
//     },
//     metadata: {
//       createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//       createdAt: { type: Date, default: Date.now },
      
//     }
//   }, {
//     timestamps: true
//   }
// );