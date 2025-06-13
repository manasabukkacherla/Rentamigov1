import { Request, Response } from 'express';
import { PropertyController } from '../base/PropertyController';
import CommercialOfficeSpace from '../../models/commercial/CommercialRentOfficeSpace';

export class CommercialPropertyController extends PropertyController {
    constructor(model: any, prefix: string) {
        super(model, prefix);
    }

    // Add any commercial-specific methods here
}
