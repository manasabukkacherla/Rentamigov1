// import Joi from 'joi';
// import { ICommercialShop } from '../models/CommercialShop';

// // Area validation schema
// const areaSchema = Joi.object({
//   totalArea: Joi.number().required().min(1).max(1000000),
//   carpetArea: Joi.number().required().min(1).max(1000000),
//   builtUpArea: Joi.number().required().min(1).max(1000000),
//   widthOfEntrance: Joi.number().required().min(0.1).max(100),
//   ceilingHeight: Joi.number().required().min(1).max(100),
//   unit: Joi.string().required().valid('sqft', 'sqm', 'sqyd')
// });

// // Basic information validation schema
// const basicInformationSchema = Joi.object({
//   title: Joi.string().required().min(10).max(200),
//   description: Joi.string().required().min(50).max(5000),
//   shopType: Joi.string().required().valid('retail', 'office', 'warehouse', 'industrial', 'other'),
//   propertyType: Joi.string().required().valid('commercial', 'mixed-use'),
//   address: Joi.string().required().min(10).max(500),
//   landmark: Joi.string().required().min(3).max(100),
//   city: Joi.string().required().min(2).max(50),
//   state: Joi.string().required().min(2).max(50),
//   pinCode: Joi.string().required().pattern(/^[0-9]{6}$/),
//   locality: Joi.string().required().min(2).max(100)
// });

// // Property details validation schema
// const propertyDetailsSchema = Joi.object({
//   area: areaSchema,
//   floors: Joi.number().required().min(1).max(100),
//   washroomCount: Joi.number().required().min(0).max(20),
//   parkingAvailable: Joi.boolean().required(),
//   parkingCount: Joi.when('parkingAvailable', {
//     is: true,
//     then: Joi.number().required().min(1).max(1000),
//     otherwise: Joi.optional()
//   }),
//   liftAvailable: Joi.boolean().required(),
//   liftCount: Joi.when('liftAvailable', {
//     is: true,
//     then: Joi.number().required().min(1).max(20),
//     otherwise: Joi.optional()
//   }),
//   waterSupply: Joi.array().items(
//     Joi.string().valid('municipal', 'borewell', 'tanker', '24x7', 'other')
//   ).min(1),
//   electricityConnection: Joi.boolean().required(),
//   securityFeatures: Joi.array().items(
//     Joi.string().valid('cctv', 'security-staff', 'gated-complex', 'intercom', 'other')
//   ),
//   fireEmergencySystem: Joi.boolean().required(),
//   cornerShop: Joi.boolean().required(),
//   mainRoadFacing: Joi.boolean().required(),
//   personalWashroom: Joi.boolean().required(),
//   pantryAvailable: Joi.boolean().required(),
//   floorNumber: Joi.number().required().min(-5).max(200)
// });

// // Pricing details validation schema
// const pricingDetailsSchema = Joi.object({
//   expectedPrice: Joi.number().required().min(1).max(1000000000),
//   pricePerSqFt: Joi.number().required().min(1).max(1000000),
//   maintenanceCharges: Joi.number().required().min(0).max(1000000),
//   maintenanceType: Joi.string().required().valid('monthly', 'quarterly', 'yearly'),
//   bookingAmount: Joi.number().required().min(0).max(1000000000),
//   annualDuesPayable: Joi.number().required().min(0).max(1000000000)
// });

// // Availability validation schema
// const availabilitySchema = Joi.object({
//   availableFrom: Joi.date().required().min('now'),
//   availabilityStatus: Joi.string().required().valid('ready-to-move', 'under-construction', 'upcoming'),
//   ageOfConstruction: Joi.string().required().valid('new', '0-1', '1-3', '3-5', '5-10', '10+'),
//   possessionStatus: Joi.string().required().valid('owned', 'rented', 'vacant')
// });

// // Contact information validation schema
// const contactInformationSchema = Joi.object({
//   name: Joi.string().required().min(2).max(100),
//   email: Joi.string().required().email(),
//   phone: Joi.string().required().pattern(/^[0-9]{10}$/),
//   alternatePhone: Joi.string().optional().pattern(/^[0-9]{10}$/),
//   preferredContactTime: Joi.string().optional()
// });

// // Media validation schema
// const mediaSchema = Joi.object({
//   photos: Joi.object({
//     exterior: Joi.array().items(Joi.string().required()).max(5),
//     interior: Joi.array().items(Joi.string().required()).max(5),
//     floorPlan: Joi.array().items(Joi.string().required()).max(5),
//     washrooms: Joi.array().items(Joi.string().required()).max(5),
//     lifts: Joi.array().items(Joi.string().required()).max(5),
//     emergencyExits: Joi.array().items(Joi.string().required()).max(5)
//   }).required(),
//   videoTour: Joi.string().optional(),
//   documents: Joi.object({
//     propertyTitle: Joi.string().optional(),
//     taxReceipts: Joi.string().optional(),
//     buildingApproval: Joi.string().optional(),
//     nocs: Joi.array().items(Joi.string()).optional(),
//     otherDocuments: Joi.array().items(Joi.string()).optional()
//   }).required()
// });

// // Nearby facilities validation schema
// const nearbyFacilitySchema = Joi.object({
//   type: Joi.string().required().valid(
//     'school', 'hospital', 'metro', 'bus-stop', 'restaurant',
//     'park', 'bank', 'atm', 'shopping-mall', 'other'
//   ),
//   distance: Joi.number().required().min(0.1).max(50),
//   name: Joi.string().required().min(2).max(100)
// });

// // Main commercial shop validation schema
// const commercialShopSchema = Joi.object({
//   basicInformation: basicInformationSchema.required(),
//   propertyDetails: propertyDetailsSchema.required(),
//   pricingDetails: pricingDetailsSchema.required(),
//   availability: availabilitySchema.required(),
//   contactInformation: contactInformationSchema.required(),
//   media: mediaSchema.required(),
//   amenities: Joi.array().items(Joi.string()).min(1).required(),
//   nearbyFacilities: Joi.array().items(nearbyFacilitySchema).min(1).required(),
//   metadata: Joi.object({
//     createdBy: Joi.string().required(),
//     status: Joi.string().valid('draft', 'published', 'underReview', 'rejected').default('draft'),
//     createdAt: Joi.date().default(Date.now),
//     updatedAt: Joi.date().default(Date.now),
//     isVerified: Joi.boolean().default(false),
//     verifiedBy: Joi.string().optional(),
//     verifiedAt: Joi.date().optional(),
//     rejectionReason: Joi.string().optional()
//   }).required()
// });

// export const validateCommercialShop = (data: Partial<ICommercialShop>, isUpdate: boolean = false): string | null => {
//   const validationOptions = {
//     abortEarly: false,
//     allowUnknown: true,
//     stripUnknown: true
//   };

//   // If it's an update operation, make all fields optional
//   const schema = isUpdate
//     ? commercialShopSchema.tailor('update')
//     : commercialShopSchema;

//   const { error } = schema.validate(data, validationOptions);
  
//   if (error) {
//     return error.details
//       .map(detail => detail.message)
//       .join(', ');
//   }

//   return null;
// };

// // Add a custom rule to make all fields optional for updates
// commercialShopSchema.tailor('update', schema => {
//   return schema.fork(
//     Object.keys(schema.describe().keys),
//     field => field.optional()
//   );
// }); 