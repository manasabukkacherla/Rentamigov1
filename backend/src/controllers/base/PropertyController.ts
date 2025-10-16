import { Request, Response } from 'express';
import _ from 'lodash';
 
export abstract class PropertyController {
    protected constructor(protected model: any, protected prefix: string) {}
  
    protected async generatePropertyId(): Promise<string> {
          try {
            const highestProperty = await this.model.findOne({
              propertyId: { $regex: `^${this.prefix}\\d+$` }
            }).sort({ propertyId: -1 });
      
            let nextNumber = 1;
      
            if (highestProperty) {
              const match = highestProperty.propertyId.match(/(\d+)$/);
              if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
              }
            }
      
            let propertyId = `${this.prefix}${nextNumber.toString().padStart(4, '0')}`;
            let existing = await this.model.findOne({ propertyId });
      
            if (existing) {
              console.log(`Property ID ${propertyId} already exists, trying next number`);
              let forcedNextNumber = nextNumber + 1;
      
              while (true) {
                const forcedPropertyId = `${this.prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
                const forcedExisting = await this.model.findOne({ propertyId: forcedPropertyId });
      
                if (!forcedExisting) {
                  return forcedPropertyId;
                }
      
                forcedNextNumber++;
              }
            }
      
            return propertyId;
          } catch (error) {
            console.error('Error generating property ID:', error);
            const timestamp = Date.now().toString().slice(-8);
            return `${this.prefix}${timestamp}`;
          }
        }
      
    // protected async generatePropertyId(): Promise<string> {
    //     try {
            
    //         const highestProperty = await this.model.findOne({
    //             propertyId: { $regex: `^${this.prefix}\d+$` }
    //         }).sort({ propertyId: -1 });

    //         let nextNumber = 1;
    //         if (highestProperty) {
    //             const match = highestProperty.propertyId.match(/(\d+)$/);
    //             if (match && match[1]) {
    //                 nextNumber = parseInt(match[1], 10) + 1;
    //             }
    //         }

    //         const propertyId = `${this.prefix}${nextNumber.toString().padStart(4, '0')}`;
    //         const existing = await this.model.findOne({ propertyId });

    //         if (existing) {
    //             return this.generatePropertyId();
    //         }

    //         return propertyId;
    //     } catch (error:any) {
    //         console.error('Error generating property ID:', error);
    //         throw error;
    //     }
    // }
    // async createProperty(req: Request, res: Response) {
    //     try {
    //         const propertyId = await this.generatePropertyId();
    //         const property = new this.model({
    //             ...req.body,
    //             propertyId,
    //             metadata: {
    //                 ...req.body.metadata,
    //                 createdBy: req.user?.id || null,
    //                 createdAt: new Date(),
    //                 propertyType: req.body.propertyType,
    //                 propertyName:req.body.propertyName,
    //                 intent:req.body.intent,
    //                 status:req.body.status
    //             }
    //         });

    //                 const data2 = new this.model(property);
    //                 await data2.save();
    //         // await property.save();
    //         res.status(200).json({
    //             success: true,
    //             message: 'Property created successfully',
    //             data: data2
    //         });
    //     } catch (error: any) {
    //         console.error("Create property error:", error);
    //         if (!res.headersSent) {
    //             res.status(500).json({
    //                 success: false,
    //                 message: error.message || "Unknown create property error",
    //             });
    //         }
    //     }
    // }
    
    // async createProperty(req: Request, res: Response) {
    //     try {
    //         const propertyId = await this.generatePropertyId();
    //         const property = new this.model({
    //             ...req.body,
    //             propertyId
    //         });
    //         await property.save();
    //         res.status(200).json({
    //             success: true,
    //             count: 1,
    //             data: property
    //         });
    //     } catch (error: any) {
    //         console.error("Create property error:", error);
    //         res.status(500).json({
    //             success: false,
    //             message: error instanceof Error ? error.message : "Unknown create property error",
    //         });
    //     }
    // }
    async createProperty(req: Request, res: Response) {
        try {
            const formData = req.body;
        console.log(formData);
            const propertyId = await this.generatePropertyId();
    
            const property = new this.model({
                ...formData,
                propertyId,
                metadata: {
                    ...formData.metadata,
                    createdBy: req.user?.id || null,
                    createdAt: new Date(),
                    propertyType: formData.propertyType,
                    propertyName: formData.propertyName,
                    intent: formData.intent,
                    status: formData.status
                }
            });
    
            await property.save();
    
            res.status(201).json({
                success: true,
                message: 'Property created successfully',
                data: property
            });
        } catch (error: any) {
            console.error("Create property error:", error);
            if (!res.headersSent) {
                res.status(500).json({
                    success: false,
                    message: error.message || "Unknown create property error",
                });
            }
        }
    }
    

    async getProperties(req: Request, res: Response) {
        try {
            // const officeSpaces = await CommercialOfficeSpace.find()
            //             .sort({ 'metadata.createdAt': -1 });
            
                    
            const properties = await this.model.find();
            res.status(200).json({
                success: true,
                count: properties.length,
                data: properties
            });
        } catch (error: any) {
            console.error("Get properties error:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Unknown get properties error",
            });
        }
    }

    async getPropertyById(req: Request, res: Response) {
        try {
            const property = await this.model.findOne({propertyId:req.params.propertyId});
            if (!property) {
                return res.status(404).json({ message: 'Property not found' });
            }
            res.json(property);
        } catch (error: any) {
            console.error("Get property by ID error:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Unknown get property by ID error",
            });
        }
    }

    async updateProperty(req: Request, res: Response) {
        try {
            const property = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!property) {
                return res.status(404).json({ message: 'Property not found' });
            }
            res.json(property);
        } catch (error : any) {
            console.error("Update property error:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Unknown update property error",
            });
        }
    }

    async deleteProperty(req: Request, res: Response) {
        try {
            const property = await this.model.findByIdAndDelete(req.params.id);
            if (!property) {
                return res.status(404).json({ message: 'Property not found' });
            }
            res.json({ message: 'Property deleted successfully' });
        } catch (error : any) {
            console.error("Delete property error:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Unknown delete property error",
            });
        }
    }
}