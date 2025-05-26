import LeaseApartment from '../models/residential/residentialLeaseAppartment';

// Generate Property ID for Lease Apartment
export const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-RESLEAP";
    const highest = await LeaseApartment.findOne({
      propertyId: { $regex: `^${prefix}\d+$` },
    }).sort({ propertyId: -1 });

    let nextNumber = 1;
    if (highest) {
      const match = highest.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    const existing = await LeaseApartment.findOne({ propertyId });
    if (existing) {
      return generatePropertyId();
    }
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-RESLEAP${timestamp}`;
  }
}; 