"use client"

import React, { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import MapSelector from "../MapSelector"
import ShopDetails from "../CommercialComponents/ShopDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Rent from "../residentialrent/Rent"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, DollarSign, Calendar } from "lucide-react"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import PropertyName from "../PropertyName"
import ShopType from "../CommercialComponents/ShopType"
import CornerProperty from "../CommercialComponents/CornerProperty"
import OfficeSpaceDetails from "./OfficeSpaceDetails"

interface IOfficeDetails {
    seatingCapacity: number;
    cabins: {
        available: boolean;
        count: number;
    };
    conferenceRoom: boolean;
    meetingRoom: boolean;
    receptionArea: boolean;
    wifiSetup: boolean;
    serverRoom: boolean;
    coworkingFriendly: boolean;
}

interface OfficeSpaceDetailsProps {
    onDetailsChange: (details: IOfficeDetails) => void;
}

interface FormData {
    basicInformation: IBasicInformation;
    shopDetails: IShopDetails;
    officeDetails?: IOfficeDetails; // Add office details to form data
    rentalTerms: IRentalTerms;
    contactInformation: IContactInformation;
    media: IMedia;
}

const RentShopMain = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        basicInformation: {
            title: '',
            shopType: [],
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: ''
            },
            landmark: '',
            location: {
                latitude: 0,
                longitude: 0
            },
            isCornerProperty: false
        },
        shopDetails: {
            frontageWidth: 0,
            heightOfShop: 0,
            displayWindow: false,
            attachedStorageRoom: false,
            averageFootTraffic: 'low',
            customerParking: false,
            previousBusiness: ''
        },
        officeDetails: {
            seatingCapacity: 0,
            cabins: {
                available: false,
                count: 0
            },
            conferenceRoom: false,
            meetingRoom: false,
            receptionArea: false,
            wifiSetup: false,
            serverRoom: false,
            coworkingFriendly: false
        },
        // ... rest of the existing formData ...
    });

    const formSections = [
        {
            title: "Basic Information",
            icon: <Store className="w-5 h-5" />,
            content: (
                <div className="space-y-6">
                    <PropertyName
                        propertyName={formData.basicInformation.title}
                        onPropertyNameChange={(name) => setFormData(prev => ({
                            ...prev,
                            basicInformation: { ...prev.basicInformation, title: name }
                        }))}
                    />
                    <ShopType
                        onShopTypeChange={(types) => setFormData(prev => ({
                            ...prev,
                            basicInformation: { ...prev.basicInformation, shopType: types }
                        }))}
                    />
                    <CommercialPropertyAddress
                        onAddressChange={(address) => setFormData(prev => ({
                            ...prev,
                            basicInformation: { ...prev.basicInformation, address }
                        }))}
                    />
                    <Landmark
                        onLandmarkChange={(landmark) => setFormData(prev => ({
                            ...prev,
                            basicInformation: { ...prev.basicInformation, landmark }
                        }))}
                        onLocationSelect={(location) => setFormData(prev => ({
                            ...prev,
                            basicInformation: {
                                ...prev.basicInformation,
                                location: {
                                    latitude: parseFloat(location.latitude),
                                    longitude: parseFloat(location.longitude)
                                }
                            }
                        }))}
                    />
                    <CornerProperty
                        onCornerPropertyChange={(isCorner) => setFormData(prev => ({
                            ...prev,
                            basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
                        }))}
                    />
                </div>
            ),
        },
        {
            title: "Shop Details",
            icon: <Building2 className="w-5 h-5" />,
            content: (
                <div className="space-y-6">
                    <ShopDetails
                        onDetailsChange={(details) => setFormData(prev => ({
                            ...prev,
                            shopDetails: {
                                frontageWidth: details.frontageWidth,
                                heightOfShop: details.heightOfShop,
                                displayWindow: details.displayWindow,
                                attachedStorageRoom: details.attachedStorageRoom,
                                averageFootTraffic: details.averageFootTraffic,
                                customerParking: details.customerParking,
                                previousBusiness: details.previousBusiness
                            }
                        }))}
                    />
                    <OfficeSpaceDetails
                        onDetailsChange={(details) => setFormData(prev => ({
                            ...prev,
                            officeDetails: details
                        }))}
                    />
                </div>
            ),
        },
        // ... rest of the existing formSections ...
    ];

    // ... rest of the existing code ...
}

export default RentShopMain; 