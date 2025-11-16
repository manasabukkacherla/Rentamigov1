// import { Request, Response } from 'express';
// import LeaseIndependentHouse from '../../models/residential/residentialLeaseIndependentHouse';
// import _ from 'lodash';

// const generatePropertyId = async (): Promise<string> => {
//   try {
//       const prefix = "RA-RESLEIH";
  
//       const highestShowroom = await LeaseIndependentHouse.findOne({
//         propertyId: { $regex: `^${prefix}\\d+$` }
//       }).sort({ propertyId: -1 });
  
//       let nextNumber = 1;
  
//       if (highestShowroom) {
//         const match = highestShowroom.propertyId.match(/(\d+)$/);
//         if (match && match[1]) {
//           nextNumber = parseInt(match[1], 10) + 1;
//         }
//       }
  
//       const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
  
//       const existingWithExactId = await LeaseIndependentHouse.findOne({ propertyId });
  
//       if (existingWithExactId) {
//         console.log(`Property ID ${propertyId} already exists, trying next number`);
  
//         const forcedNextNumber = nextNumber + 1;
//         const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
  
//         const forcedExisting = await LeaseIndependentHouse.findOne({ propertyId: forcedPropertyId });
  
//         if (forcedExisting) {
//           return generatePropertyId();
//         }
  
//         return forcedPropertyId;
//       }
  
//       return propertyId;
//     } catch (error) {
//       console.error('Error generating property ID:', error);
//       const timestamp = Date.now().toString().slice(-8);
//       return `RA-RESLEIH${timestamp}`;
//     }
// };

// export const createLeaseIndependentHouse = async (req: Request, res: Response) => {
//   try {
//     const formData = req.body;
//     const propertyId = await generatePropertyId();
//     console.log("formData", formData);
//     console.log("propertyId", propertyId);
//     const propertyData = JSON.parse(JSON.stringify({
//       ...req.body,
//       propertyId,
//       metadata: {
//         ...req.body.metadata,
//         createdAt: new Date()
//       }
//     }));
//     const property = new LeaseIndependentHouse(propertyData);

//     console.log("propertyData", propertyData);

//     await property.save();
//     res.status(201).json({
//       success: true,
//       message: 'Lease Independent House created successfully',
//       data: property,
//     });
//   } catch (error) {
//     console.error('Error creating lease independent house:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to create lease independent house',
//     });
//   }
// };

// export const getAllLeaseIndependentHouses = async (req: Request, res: Response) => {
//   try {
//     const properties = await LeaseIndependentHouse.find({}).sort({ 'metadata.createdAt': -1 });
//     res.status(200).json({
//       success: true,
//       message: 'Fetched all independent house leases successfully',
//       data: properties,
//     });
//   } catch (error) {
//     console.error('Error fetching houses:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to fetch independent house leases',
//     });
//   }
// };

// // export const getLeaseIndependentHouseById = async (req: Request, res: Response) => {
// //   try {
// //     const Id  = req.params.Id;
// //     const property = await LeaseIndependentHouse.findOne({ Id });

// //     if (!property) {
// //       return res.status(404).json({
// //         success: false,
// //         error: 'Lease Independent House not found',
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: 'Lease Independent House fetched successfully',
// //       data: property,
// //     });
// //   } catch (error) {
// //     console.error('Error fetching house:', error);
// //     res.status(500).json({
// //       success: false,
// //       error: 'Failed to fetch lease independent house',
// //     });
// //   }
// // };

// // export const updateLeaseIndependentHouse = async (req: Request, res: Response) => {
// //   try {
// //     const Id = req.params.Id;
// //     const incomingData = req.body;

// //     if (!incomingData) {
// //       return res.status(400).json({ success: false, message: 'No data provided for update' });
// //     }

// //     const cleanedData = JSON.parse(
// //       JSON.stringify(incomingData, (key, value) => (['_id', '__v'].includes(key) ? undefined : value))
// //     );

// //     const existing = await LeaseIndependentHouse.findOne({Id});
// //     if (!existing) {
// //       return res.status(404).json({ success: false, message: 'Property not found' });
// //     }

// //     const merged = _.merge(existing.toObject(), cleanedData);

// //     const updated = await LeaseIndependentHouse.findOneAndUpdate({Id}, { $set: merged }, {
// //       new: true,
// //       runValidators: true,
// //     });

// //     res.status(200).json({ success: true, message: 'Updated successfully', data: updated });
// //   } catch (error) {
// //     console.error('Update error:', error);
// //     res.status(500).json({ success: false, message: 'Failed to update lease independent house' });
// //   }
// // };

// // In your controller - fix updateLeaseIndependentHouse
// export const updateLeaseIndependentHouse = async (req: Request, res: Response) => {
//   try {
//     const { propertyId } = req.params; // This should match your route parameter
//     const incomingData = req.body;

//     if (!incomingData) {
//       return res.status(400).json({ success: false, message: 'No data provided for update' });
//     }

//     // Find by MongoDB _id instead of propertyId
//     const existing = await LeaseIndependentHouse.findOne({propertyId});
//     if (!existing) {
//       return res.status(404).json({ success: false, message: 'Property not found' });
//     }

//     // Clean the data
//     const cleanedData = JSON.parse(
//       JSON.stringify(incomingData, (key, value) => (['_id', '__v', 'propertyId'].includes(key) ? undefined : value))
//     );

//     // Update the document
//     const updated = await LeaseIndependentHouse.findOneAndUpdate(
//       {propertyId},
//       { $set: cleanedData }, 
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({ 
//       success: true, 
//       message: 'Updated successfully', 
//       data: updated 
//     });
//   } catch (error) {
//     console.error('Update error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Failed to update lease independent house',
//       error 
//     });
//   }
// };

// // Also fix getLeaseIndependentHouseById
// export const getLeaseIndependentHouseById = async (req: Request, res: Response) => {
//   try {
//     const { propertyId } = req.params; // Change to match your route parameter name
//     const property = await LeaseIndependentHouse.findOne({propertyId}); // Use findById for MongoDB _id

//     if (!property) {
//       return res.status(404).json({
//         success: false,
//         error: 'Lease Independent House not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Lease Independent House fetched successfully',
//       data: property,
//     });
//   } catch (error) {
//     console.error('Error fetching house:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to fetch lease independent house',
//     });
//   }
// };

// export const deleteLeaseIndependentHouse = async (req: Request, res: Response) => {
//   try {
//     const deleted = await LeaseIndependentHouse.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ success: false, message: 'Property not found' });
//     }

//     res.status(200).json({ success: true, message: 'Deleted successfully' });
//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({ success: false, message: 'Failed to delete lease independent house' });
//   }
// };
import { Request, Response } from 'express';
import LeaseIndependentHouse from '../../models/residential/residentialLeaseIndependentHouse';
import _ from 'lodash';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-RESLEIH";

    const highestShowroom = await LeaseIndependentHouse.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });

    let nextNumber = 1;

    if (highestShowroom) {
      const match = highestShowroom.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

    const existingWithExactId = await LeaseIndependentHouse.findOne({ propertyId });

    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);

      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

      const forcedExisting = await LeaseIndependentHouse.findOne({ propertyId: forcedPropertyId });

      if (forcedExisting) {
        return generatePropertyId();
      }

      return forcedPropertyId;
    }

    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-RESLEIH${timestamp}`;
  }
};

// export const createLeaseIndependentHouse = async (req: Request, res: Response) => {
//   try {
//     const formData = req.body;
//     const propertyId = await generatePropertyId();
//     console.log("formData", formData);
//     console.log("propertyId", propertyId);
//     const propertyData = JSON.parse(JSON.stringify({
//       ...req.body,
//       propertyId,
//       metadata: {
//         ...req.body.metadata,
//         createdAt: new Date()
//       }
//     }));
//     const property = new LeaseIndependentHouse(propertyData);

//     console.log("propertyData", propertyData);

//     await property.save();
//     res.status(201).json({
//       success: true,
//       message: 'Lease Independent House created successfully',
//       data: property,
//     });
//   } catch (error) {
//     console.error('Error creating lease independent house:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to create lease independent house',
//     });
//   }
// };

export const getAllLeaseIndependentHouses = async (req: Request, res: Response) => {
  try {
    const properties = await LeaseIndependentHouse.find({}).sort({ 'metadata.createdAt': -1 });
    res.status(200).json({
      success: true,
      message: 'Fetched all independent house leases successfully',
      data: properties,
    });
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch independent house leases',
    });
  }
};

export const getLeaseIndependentHouseById = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params; 
    const property = await LeaseIndependentHouse.findOne({ propertyId }); 
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Lease Independent House not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lease Independent House fetched successfully',
      data: property,
    });
  } catch (error) {
    console.error('Error fetching house:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lease independent house',
    });
  }
};

// export const updateLeaseIndependentHouse = async (req: Request, res: Response) => {
//   try {
//     const { propertyId } = req.params; // This should match your route parameter
//     const incomingData = req.body;

//     if (!incomingData) {
//       return res.status(400).json({ success: false, message: 'No data provided for update' });
//     }

//     // Find by propertyId
//     const existing = await LeaseIndependentHouse.findOne({ propertyId });
//     if (!existing) {
//       return res.status(404).json({ success: false, message: 'Property not found' });
//     }

//     // Clean the data
//     const cleanedData = JSON.parse(
//       JSON.stringify(incomingData, (key, value) => (['_id', '__v', 'propertyId'].includes(key) ? undefined : value))
//     );

//     // Update the document
//     const updated = await LeaseIndependentHouse.findOneAndUpdate(
//       { propertyId },
//       { $set: cleanedData },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Updated successfully',
//       data: updated
//     });
//   } catch (error) {
//     console.error('Update error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update lease independent house',
//       error
//     });
//   }
// };
// ... (keep generatePropertyId and other functions as-is)
export const createLeaseIndependentHouse = async (req: Request, res: Response) => {
  try {
    console.log("Request body received:", req.body);

    const formData = req.body;

    // Basic validation
    if (!formData?.basicInformation?.title || !formData?.basicInformation?.propertyAddress?.city) {
      return res.status(400).json({ 
        success: false, 
        error: "Required fields missing (title and city are required)" 
      });
    }

    const propertyId = await generatePropertyId();
    
    const propertyData = {
      ...formData,
      propertyId,
      metadata: {
        ...formData.metadata,
        createdAt: new Date(),
      },
    };

    console.log("Creating property with data:", propertyData);
    
    const property = new LeaseIndependentHouse(propertyData);
    await property.save();
    
    console.log("Property created successfully with ID:", property._id);

    res.status(201).json({
      success: true,
      message: 'Lease Independent House created successfully',
      data: property,
    });
  } catch (error: any) {
    console.error('Error creating lease independent house:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create lease independent house',
    });
  }
};

export const updateLeaseIndependentHouse = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const incomingData = req.body;

    console.log(`Update request for propertyId: ${propertyId}`, incomingData);

    if (!incomingData) {
      return res.status(400).json({ 
        success: false, 
        message: 'No data provided for update' 
      });
    }

    // Find existing property
    const existing = await LeaseIndependentHouse.findOne({ propertyId });
    if (!existing) {
      return res.status(404).json({ 
        success: false, 
        message: 'Property not found' 
      });
    }

    // Clean data - remove MongoDB internal fields
    const cleanedData = JSON.parse(
      JSON.stringify(incomingData, (key, value) => 
        ['_id', '__v', 'propertyId'].includes(key) ? undefined : value
      )
    );

    console.log("Cleaned data for update:", cleanedData);

    // Update the document
    const updated = await LeaseIndependentHouse.findOneAndUpdate(
      { propertyId },
      { $set: cleanedData },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Property not found after update attempt'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Updated successfully',
      data: updated,
    });
  } catch (error: any) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lease independent house',
      error: error.message,
    });
  }
};
// ... (keep getAllLeaseIndependentHouses, getLeaseIndependentHouseById, deleteLeaseIndependentHouse as-is)
export const deleteLeaseIndependentHouse = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params; 
    const deleted = await LeaseIndependentHouse.findOneAndDelete({ propertyId }); // Use findOneAndDelete with propertyId

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete lease independent house' });
  }
};
