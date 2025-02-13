import React, { useState } from "react";
import {
  Home,
  User,
  Phone,
  LayoutGrid,
  Sofa,
  Compass,
  Tv,
  Refrigerator,
  WashingMachine,
  Bed,
  UtensilsCrossed,
  Wind,
  Coffee,
  BatteryCharging,
  Droplets,
  Microwave,
  Flame,
  PenLine,
  Lightbulb,
  Fan,
  Droplet,
  DoorClosed,
} from "lucide-react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

export interface FormData {
  propertyName: string;
  propertyType: string;
  propertyConfiguration: string;
  furnishingStatus: string;
  facing: string;
  amenities: string[];
}

interface PropertyFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
}

interface Amenity {
  id: string;
  label: string;
  icon: React.ElementType;
}

const BASIC_AMENITIES: Amenity[] = [
  { id: "light", label: "Light", icon: Lightbulb },
  { id: "fan", label: "Fan", icon: Fan },
  { id: "geyser", label: "Geyser", icon: Droplet },
  { id: "wardrobe", label: "Wardrobe", icon: DoorClosed },
  { id: "kitchenCabinets", label: "Kitchen Cabinets", icon: UtensilsCrossed },
];

const FULL_AMENITIES: Amenity[] = [
  { id: "tv", label: "TV", icon: Tv },
  { id: "fridge", label: "Fridge", icon: Refrigerator },
  { id: "washingMachine", label: "Washing Machine", icon: WashingMachine },
  { id: "cotMattress", label: "Cot mattress", icon: Bed },
  { id: "sofa", label: "Sofa", icon: Sofa },
  { id: "diningTable", label: "Dining Table with Chairs", icon: UtensilsCrossed },
  { id: "ac", label: "AC", icon: Wind },
  { id: "coffeeTable", label: "Coffee Table", icon: Coffee },
  { id: "inverter", label: "Inverter", icon: BatteryCharging },
  { id: "waterPurifier", label: "Water purifier", icon: Droplets },
  { id: "microwave", label: "Microwave oven", icon: Microwave },
  { id: "gasStove", label: "Gas stove/Induction", icon: Flame },
  { id: "pipedGas", label: "Piped Gas", icon: PenLine },
  ...BASIC_AMENITIES,
];

const PROPERTY_TYPES = [
  { value: "Apartment", label: "Apartment" },
  { value: "Standalone Building", label: "Standalone Building" },
  { value: "Villa", label: "Villa" },
  { value: "Row House", label: "Row House" },
];

const PROPERTY_CONFIGURATIONS = [
  { value: "Studio Room (1 RK)", label: "Studio Room (1 RK)" },
  { value: "1 BHK", label: "1 BHK" },
  { value: "2 BHK", label: "2 BHK" },
  { value: "3 BHK", label: "3 BHK" },
  { value: "4 BHK", label: "4 BHK" },
  { value: "4+ BHK", label: "4+ BHK" },
];

const FURNISHING_STATUS = [
  { value: "Unfurnished", label: "Unfurnished" },
  { value: "Semi Furnished", label: "Semi Furnished" },
  { value: "Fully Furnished", label: "Fully Furnished" },
  { value: "Partially Furnished", label: "Partially Furnished" },
];

const FACING_OPTIONS = [
  { value: "North", label: "North" },
  { value: "East", label: "East" },
  { value: "South", label: "South" },
  { value: "West", label: "West" },
  { value: "North-East", label: "North-East" },
  { value: "South-East", label: "South-East" },
  { value: "North-West", label: "North-West" },
  { value: "South-West", label: "South-West" },
];

export function PropertyForm({ formData, setFormData, onSubmit }: PropertyFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // ✅ Clear the error when the user types
  };

  const handleAmenitiesChange = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.propertyName) newErrors.propertyName = "Please enter Property Name";
    if (!formData.propertyType) newErrors.propertyType = "Please select Property Type";
    if (!formData.propertyConfiguration)
      newErrors.propertyConfiguration = "Please select Property Configuration";
    if (!formData.furnishingStatus) newErrors.furnishingStatus = "Please select Furnishing Status";
    if (!formData.facing) newErrors.facing = "Please select Facing direction";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  const amenities =
    formData.furnishingStatus === "Semi Furnished" ? BASIC_AMENITIES : FULL_AMENITIES;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
          <InputField
            label="Property Name"
            icon={Home}
            value={formData.propertyName}
            onChange={updateField("propertyName")}
            placeholder="Enter property name"
          />
          {errors.propertyName && <p className="text-red-600 text-sm">{errors.propertyName}</p>}
        </div>

        <div>
          <SelectField
            label="Property Type"
            icon={Sofa}
            value={formData.propertyType}
            onChange={updateField("propertyType")}
            options={PROPERTY_TYPES}
          />
          {errors.propertyType && <p className="text-red-600 text-sm">{errors.propertyType}</p>}
        </div>
        <div>
          <SelectField
            label="Property Configuration"
            icon={LayoutGrid}
            value={formData.propertyConfiguration}
            onChange={updateField("propertyConfiguration")}
            options={PROPERTY_CONFIGURATIONS}
          />
          {errors.propertyConfiguration && (
            <p className="text-red-600 text-sm">{errors.propertyConfiguration}</p>
          )}
        </div>
        <div>
          <SelectField
            label="Furnishing Status"
            icon={Sofa}
            value={formData.furnishingStatus}
            onChange={updateField("furnishingStatus")}
            options={FURNISHING_STATUS}
          />
          {errors.furnishingStatus && (
            <p className="text-red-600 text-sm">{errors.furnishingStatus}</p>
          )}
        </div>
        <div>
          <SelectField
            label="Facing"
            icon={Compass}
            value={formData.facing}
            onChange={updateField("facing")}
            options={FACING_OPTIONS}
          />
          {errors.facing && <p className="text-red-600 text-sm">{errors.facing}</p>}
        </div>
      </div>
      {["Semi Furnished", "Fully Furnished", "Partially Furnished"].includes(
        formData.furnishingStatus
      ) && (
        <div>
          <p className="text-lg font-medium">Amenities</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {amenities.map(({ id, label, icon: Icon }) => (
              <label
                key={id}
                className="flex items-center space-x-3 p-2 border rounded hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(id)}
                  onChange={() => handleAmenitiesChange(id)}
                />
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-end">
        
      </div>
    </div>
  );
}
