// src/controllers/propertyController.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';

// === Commercial Lease Imports ===
import CommercialLeaseAgriculture from '../models/commercial/CommercialLeaseAgriculture';
import CommercialLeaseOthers from '../models/commercial/CommercialLeaseOthers';
import CommercialLeasePlot from '../models/commercial/commercialLeasePlot';
import CommercialLeaseRetail from '../models/commercial/CommercialLeaseRetail';
import CommercialLeaseShop from '../models/commercial/CommercialLeaseShop';
import CommercialLeaseShowroom from '../models/commercial/CommercialLeaseShowroom';
import CommercialLeaseCoveredSpace from '../models/commercial/CommericalLeaseCoveredSpace';
import CommercialLeaseOfficeSpace from '../models/commercial/CommericalLeaseOfficeSpace';
import { CommercialLeaseShed } from '../models/commercial/CommericalLeaseShed';
import CommercialLeaseWarehouse from '../models/commercial/CommericalLeaseWarehouse';

// === Commercial Rent Imports ===
import CommercialRentAgriculture from '../models/commercial/CommercialRentAgriculture';
import CommercialRentCoveredSpace from '../models/commercial/CommercialRentCoveredSpace';
import CommercialRentOfficeSpace from '../models/commercial/CommercialRentOfficeSpace';
import CommercialRentOthers from '../models/commercial/CommercialRentOthers';
import CommercialRentPlot from '../models/commercial/commercialRentPlot';
import CommercialRentRetailStore from '../models/commercial/CommercialRentRetailStore';
import CommercialRentShed from '../models/commercial/CommercialRentShed';
import CommercialRentShop from '../models/commercial/commercialrentshop';
import CommercialRentShowroom from '../models/commercial/commericalRentShowroom';
import CommercialRentWarehouse from '../models/commercial/CommercialRentWarehouse';

// === Commercial Sell Imports ===
import CommercialSellAgriculture from '../models/commercial/CommercialSellAgriculture';
import CommercialSellCoveredSpace from '../models/commercial/CommercialSellCoveredSpace';
import CommercialSellOfficeSpace from '../models/commercial/CommercialSellOfficeSpace';
import CommercialSellOthers from '../models/commercial/CommercialSellOthers';
import CommercialSellPlot from '../models/commercial/commercialsellplot';
import CommercialSellRetailStore from '../models/commercial/CommercialSellRetailStore';
import CommercialSellShed from '../models/commercial/CommercialSellShed';
import CommercialSellShop from '../models/commercial/CommercialsellShop';
import CommercialSellShowroom from '../models/commercial/CommercialsellShowroom';
import CommercialSellWarehouse from '../models/commercial/CommercialSellWarehouse';

// === Residential Imports ===
import ResidentialLeaseAppartment from '../models/residential/residentialLeaseAppartment';
import ResidentialLeaseIndependentHouse from '../models/residential/residentialLeaseIndependentHouse';
import ResidentialRentApartment from '../models/residential/residentialRentApartment';
import ResidentialRentBuilderFloor from '../models/residential/residentialRentBuilderFloor';
import ResidentialRentIndependent from '../models/residential/residentialRentIndependent';
import ResidentialSaleApartment from '../models/residential/residentialSaleApartment';
import ResidentialSaleBuilderFloor from '../models/residential/residentialSaleBuilderFloor';
import ResidentialSaleIndependentHouse from '../models/residential/saleIndependentHouse';
import ResidentialSalePlot from '../models/residential/salePlot';

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    console.time("🏠 Property Fetch Time");

    // Phase 1
    const part1 = await Promise.all([
      CommercialLeaseAgriculture.find(), CommercialLeaseOthers.find(), CommercialLeasePlot.find(),
      CommercialLeaseRetail.find(), CommercialLeaseShop.find(), CommercialLeaseShowroom.find(),
      CommercialLeaseCoveredSpace.find(), CommercialLeaseOfficeSpace.find(), CommercialLeaseShed.find(),
      CommercialLeaseWarehouse.find(), CommercialRentAgriculture.find(), CommercialRentCoveredSpace.find()
    ]);
    
    // Phase 2
    const part2 = await Promise.all([
      CommercialRentOfficeSpace.find(), CommercialRentOthers.find(), CommercialRentPlot.find(),
      CommercialRentRetailStore.find(), CommercialRentShed.find(), CommercialRentShop.find(),
      CommercialRentShowroom.find(), CommercialRentWarehouse.find(), CommercialSellAgriculture.find(),
      CommercialSellCoveredSpace.find(), CommercialSellOfficeSpace.find(), CommercialSellOthers.find()
    ]);

    // Phase 3
    const part3 = await Promise.all([
      CommercialSellPlot.find(), CommercialSellRetailStore.find(), CommercialSellShed.find(),
      CommercialSellShop.find(), CommercialSellShowroom.find(), CommercialSellWarehouse.find(),
      ResidentialLeaseAppartment.find(), ResidentialLeaseIndependentHouse.find(), ResidentialRentApartment.find(),
      ResidentialRentBuilderFloor.find(), ResidentialRentIndependent.find(), ResidentialSaleApartment.find(),
      ResidentialSaleBuilderFloor.find(), ResidentialSaleIndependentHouse.find(), ResidentialSalePlot.find()
    ]);

    // Flatten all
    const allResults = [...part1, ...part2, ...part3].flat();

    console.timeEnd("🏠 Property Fetch Time");
    res.status(200).json(allResults);
  } catch (err) {
    console.error("Failed to fetch properties:", err);
    res.status(500).json({ error: "Failed to fetch all properties" });
  }
};


export const getPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('🔥 getPropertyById CALLED with ID:', id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid property ID' });
  }

  try {
    // This example uses one model (you may want to iterate multiple models to find the match)
    const property = await ResidentialSaleApartment.findById(id); // Adjust based on your model structure
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Error fetching property', error });
  }
};
