"use strict";
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import ResidentialRentApartment from './models/residential/residentialRentApartment';
// // Load environment variables
// dotenv.config();
// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rentamigo';
//     await mongoose.connect(mongoURI);
//     console.log('MongoDB Connected...');
//   } catch (err) {
//     console.error('MongoDB Connection Error:', err);
//     process.exit(1);
//   }
// };
// // Fix mediaItems for a specific property
// const fixProperty = async (propertyId: string) => {
//   try {
//     // Find the property
//     const property = await ResidentialRentApartment.findOne({ propertyId });
//     if (!property) {
//       console.error(`Property not found with ID: ${propertyId}`);
//       return false;
//     }
//     console.log(`Found property: ${property.propertyId}`);
//     console.log('Media state before fix:');
//     console.log('- Has media object:', !!property.media);
//     console.log('- Has mediaItems array:', !!property.media?.mediaItems);
//     console.log('- mediaItems count:', property.media?.mediaItems?.length || 0);
//     // Prepare fixed mediaItems array
//     const fixedMediaItems = [];
//     // Process photos
//     if (property.media && property.media.photos) {
//       for (const category in property.media.photos) {
//         const photos = property.media.photos[category];
//         if (Array.isArray(photos)) {
//           photos.forEach(photo => {
//             if (photo && typeof photo === 'object' && photo.url) {
//               // For structured photo objects
//               fixedMediaItems.push({
//                 id: photo.id || new mongoose.Types.ObjectId().toString(),
//                 type: 'photo',
//                 url: photo.url,
//                 title: photo.title || 'Untitled',
//                 category: category,
//                 tags: photo.tags || []
//               });
//               console.log(`Added photo from ${category}: ${photo.url.substring(0, 50)}...`);
//             } else if (typeof photo === 'string') {
//               // For string URLs
//               fixedMediaItems.push({
//                 id: new mongoose.Types.ObjectId().toString(),
//                 type: 'photo',
//                 url: photo,
//                 title: 'Untitled',
//                 category: category,
//                 tags: []
//               });
//               console.log(`Added photo from ${category}: ${photo.substring(0, 50)}...`);
//             }
//           });
//         }
//       }
//     }
//     // Process videoTour
//     if (property.media && property.media.videoTour) {
//       fixedMediaItems.push({
//         id: new mongoose.Types.ObjectId().toString(),
//         type: 'video',
//         url: property.media.videoTour,
//         title: 'Video Tour',
//         category: 'videoTour',
//         tags: []
//       });
//       console.log(`Added video: ${property.media.videoTour.substring(0, 50)}...`);
//     }
//     // Process documents
//     if (property.media && Array.isArray(property.media.documents)) {
//       property.media.documents.forEach((docUrl: string) => {
//         if (docUrl) {
//           fixedMediaItems.push({
//             id: new mongoose.Types.ObjectId().toString(),
//             type: 'document',
//             url: docUrl,
//             title: 'Document',
//             category: 'document',
//             tags: []
//           });
//           console.log(`Added document: ${docUrl.substring(0, 50)}...`);
//         }
//       });
//     }
//     console.log(`Total items to add: ${fixedMediaItems.length}`);
//     if (fixedMediaItems.length > 0) {
//       // Update the property
//       const updateResult = await ResidentialRentApartment.updateOne(
//         { propertyId },
//         { $set: { 'media.mediaItems': fixedMediaItems } }
//       );
//       console.log('Update result:', updateResult);
//       // Verify the update
//       const updatedProperty = await ResidentialRentApartment.findOne({ propertyId });
//       console.log('After fix:');
//       console.log('- Has mediaItems array:', !!updatedProperty?.media?.mediaItems);
//       console.log('- mediaItems count:', updatedProperty?.media?.mediaItems?.length || 0);
//       return true;
//     } else {
//       console.log('No media items found to fix');
//       return false;
//     }
//   } catch (error) {
//     console.error('Error fixing property media:', error);
//     return false;
//   }
// };
// // Main function
// const main = async () => {
//   await connectDB();
//   // Get property ID from command line arguments or use default
//   const propertyId = process.argv[2] || 'RA-RESREAP0006';
//   console.log(`Fixing property with ID: ${propertyId}`);
//   const result = await fixProperty(propertyId);
//   if (result) {
//     console.log(`✅ Successfully fixed property ${propertyId}`);
//   } else {
//     console.log(`❌ Failed to fix property ${propertyId}`);
//   }
//   // Disconnect from MongoDB
//   await mongoose.disconnect();
// };
// // Run the script
// main().catch(console.error); 
