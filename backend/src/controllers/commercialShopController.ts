import { Request, Response } from 'express';
import CommercialShop from '../models/commercial/CommercialsellShop';
// import { validateCommercialShop } from '../validators/commercialShopValidator';
import { request } from 'http';

// Generate property ID with format RA-COMSESHXXXX
const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial shop property ID
    const prefix = "RA-COMSESH";
    
    // Find the shop with the highest property ID number
    const highestShop = await CommercialShop.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1; // Default start number
    
    if (highestShop) {
      // Extract the numeric part from the existing highest property ID
      const match = highestShop.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        // Convert to number and increment by 1
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    // Create the property ID with the sequence number
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    // Check if this exact ID somehow exists (should be rare but possible with manual entries)
    const existingWithExactId = await CommercialShop.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialShop.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        // If still colliding, recursively generate a new ID
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    // Fallback to timestamp-based ID if there's an error
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMSESH${timestamp}`;
  }
};

// Create a new commercial shop listing
export const createCommercialShop = async (req: Request, res: Response) => {
  try {
    const shopData = req.body;
    
    // Validate the input data
    // const validationError = validateCommercialShop(shopData);
    // if (validationError) {
    //   return res.status(400).json({ error: validationError });
    // }

    // Generate property ID
    const propertyId = await generatePropertyId();

    // Add metadata and property ID
    shopData.metadata = {
      // createdBy: req.user._id,
      createdBy: shopData.metadata.createdBy,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false
    };
    
    // Add property ID to the shop data
    shopData.propertyId = propertyId;

    // Create new shop listing
    const shop = new CommercialShop(shopData);
    await shop.save();

    res.status(201).json({
      message: 'Commercial shop listing created successfully',
      data: shop
    });
  } catch (error) {
    console.error('Error creating commercial shop:', error);
    res.status(500).json({ error: 'Failed to create commercial shop listing' });
  }
};

// Get all commercial shop listings
// export const getAllCommercialShops = async (req: Request, res: Response) => {
//   try {
//     const { 
//       page = 1, 
//       limit = 10, 
//       city, 
//       priceRange, 
//       areaRange,
//       shopType,
//       status = 'published'
//     } = req.query;

//     // Build query
//     const query: any = { 'metadata.status': status };
    
//     if (city) {
//       query['basicInformation.city'] = city;
//     }
    
//     if (priceRange) {
//       const [min, max] = (priceRange as string).split('-');
//       query['pricingDetails.expectedPrice'] = {
//         $gte: parseInt(min),
//         $lte: parseInt(max)
//       };
//     }

//     if (areaRange) {
//       const [min, max] = (areaRange as string).split('-');
//       query['propertyDetails.area.totalArea'] = {
//         $gte: parseInt(min),
//         $lte: parseInt(max)
//       };
//     }

//     if (shopType) {
//       query['basicInformation.shopType'] = shopType;
//     }

//     // Execute query with pagination
//     const shops = await CommercialShop.find(query)
//       .skip((Number(page) - 1) * Number(limit))
//       .limit(Number(limit))
//       .sort({ 'metadata.createdAt': -1 });

//     // Get total count
//     const total = await CommercialShop.countDocuments(query);

//     res.json({
//       data: shops,
//       pagination: {
//         total,
//         page: Number(page),
//         pages: Math.ceil(total / Number(limit))
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching commercial shops:', error);
//     res.status(500).json({ error: 'Failed to fetch commercial shop listings' });
//   }
// };

// Get a specific commercial shop by ID
// export const getCommercialShopById = async (req: Request, res: Response) => {
//   try {
//     const shop = await CommercialShop.findById(req.params.id);
//     if (!shop) {
//       return res.status(404).json({ error: 'Commercial shop not found' });
//     }
//     res.json({ data: shop });
//   } catch (error) {
//     console.error('Error fetching commercial shop:', error);
//     res.status(500).json({ error: 'Failed to fetch commercial shop' });
//   }
// };

// Update a commercial shop listing
// export const updateCommercialShop = async (req: Request, res: Response) => {
//   try {
//     const shopId = req.params.id;
//     const updateData = req.body;

//     // Validate the update data
//     // const validationError = validateCommercialShop(updateData, true);
//     // if (validationError) {
//     //   return res.status(400).json({ error: validationError });
//     // }

//     // Update metadata
//     updateData.metadata = {
//       ...updateData.metadata,
//       updatedAt: new Date()
//     };

//     const shop = await CommercialShop.findByIdAndUpdate(
//       shopId,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!shop) {
//       return res.status(404).json({ error: 'Commercial shop not found' });
//     }

//     res.json({
//       message: 'Commercial shop listing updated successfully',
//       data: shop
//     });
//   } catch (error) {
//     console.error('Error updating commercial shop:', error);
//     res.status(500).json({ error: 'Failed to update commercial shop listing' });
//   }
// };

// Delete a commercial shop listing
// export const deleteCommercialShop = async (req: Request, res: Response) => {
//   try {
//     const shop = await CommercialShop.findById(req.params.id);
//     if (!shop) {
//       return res.status(404).json({ error: 'Commercial shop not found' });
//     }

//     await shop.deleteOne();

//     res.json({
//       message: 'Commercial shop listing deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting commercial shop:', error);
//     res.status(500).json({ error: 'Failed to delete commercial shop listing' });
//   }
// };

// Change listing status
// export const changeListingStatus = async (req: Request, res: Response) => {
//   try {
//     const { status } = req.body;
//     const validStatuses = ['draft', 'published', 'underReview', 'rejected'];
    
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ error: 'Invalid status' });
//     }

//     const shop = await CommercialShop.findByIdAndUpdate(
//       req.params.id,
//       {
//         'metadata.status': status,
//         'metadata.updatedAt': new Date()
//       },
//       { new: true }
//     );

//     if (!shop) {
//       return res.status(404).json({ error: 'Commercial shop not found' });
//     }

//     res.json({
//       message: 'Status updated successfully',
//       data: shop
//     });
//   } catch (error) {
//     console.error('Error changing listing status:', error);
//     res.status(500).json({ error: 'Failed to change listing status' });
//   }
// }; 