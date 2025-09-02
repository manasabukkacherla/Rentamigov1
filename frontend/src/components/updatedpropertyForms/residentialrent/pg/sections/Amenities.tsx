import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface AmenitiesProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const Amenities: React.FC<AmenitiesProps> = ({ register, errors }) => {
  const amenities = [
    {
      category: 'Common Areas',
      items: [
        'Living Room',
        'Dining Area',
        'Kitchen',
        'Balcony',
        'Terrace',
        'Garden',
        'Parking',
        'Lift',
        'Power Backup',
        'Security Guard'
      ]
    },
    {
      category: 'Kitchen Facilities',
      items: [
        'Refrigerator',
        'Microwave',
        'Gas Connection',
        'Induction',
        'Water Purifier',
        'Dishwasher',
        'Cooking Allowed',
        'Non-Veg Allowed'
      ]
    },
    {
      category: 'Laundry',
      items: [
        'Washing Machine',
        'Dryer',
        'Iron',
        'Ironing Board',
        'Laundry Service'
      ]
    },
    {
      category: 'Entertainment',
      items: [
        'TV Room',
        'Gym',
        'Indoor Games',
        'Outdoor Games',
        'Swimming Pool',
        'Sports Area'
      ]
    },
    {
      category: 'Other Facilities',
      items: [
        'WiFi',
        'AC',
        'Geyser',
        'Housekeeping',
        'Doctor on Call',
        'CCTV',
        'Fire Safety',
        'First Aid Kit'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Amenities</h2>

      {amenities.map((category, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-lg font-medium text-black">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.items.map((item) => (
              <div key={item} className="flex items-center">
                <input
                  type="checkbox"
                  id={item}
                  value={item}
                  {...register('amenities')}
                  ref={index === 0 && firstFieldRef}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-black text-black"
                />
                <label htmlFor={item} className="ml-2 text-sm text-black">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Additional Amenities */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Additional Amenities
        </label>
        <textarea
          {...register('additionalAmenities')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter any additional amenities not listed above"
        />
        {errors.additionalAmenities && (
          <p className="mt-1 text-sm text-red-600">{errors.additionalAmenities.message as string}</p>
        )}
      </div>

      {/* House Rules */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          House Rules *
        </label>
        <textarea
          {...register('houseRules')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter house rules and regulations"
        />
        {errors.houseRules && (
          <p className="mt-1 text-sm text-red-600">{errors.houseRules.message as string}</p>
        )}
      </div>
    </div>
  );
};

export default Amenities; 