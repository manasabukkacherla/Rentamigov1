import { useState } from 'react';
import { ArrowRight, Warehouse, Snowflake, Truck, Factory, ShoppingBag, FileCheck } from 'lucide-react';

interface WarehouseTypeProps {
  onWarehouseTypeChange?: (type: string) => void;
}

const WarehouseType = ({ onWarehouseTypeChange }: WarehouseTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onWarehouseTypeChange?.(type);
  };

  const warehouseTypes = [
    { value: 'general', label: 'General Warehouse' },
    { value: 'cold-storage', label: 'Cold Storage Warehouse' },
    { value: 'distribution', label: 'Distribution Center' },
    { value: 'industrial', label: 'Industrial Warehouse' },
    { value: 'ecommerce', label: 'E-Commerce Fulfillment Center' },
    { value: 'bonded', label: 'Bonded Warehouse' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'cold-storage':
        return <Snowflake size={20} className="text-white/60" />;
      case 'distribution':
        return <Truck size={20} className="text-white/60" />;
      case 'industrial':
        return <Factory size={20} className="text-white/60" />;
      case 'ecommerce':
        return <ShoppingBag size={20} className="text-white/60" />;
      case 'bonded':
        return <FileCheck size={20} className="text-white/60" />;
      default:
        return <Warehouse size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Warehouse Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Warehouse Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Warehouse Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a warehouse type</option>
            {warehouseTypes.map(({ value, label }) => (
              <option key={value} value={value} className="bg-black">
                {label}
              </option>
            ))}
          </select>

          {selectedType && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                {getIcon(selectedType)}
                <h5 className="font-medium">Overview</h5>
              </div>
              <p className="text-white/80">
                {selectedType === 'general' && 'Standard warehouse space suitable for various storage needs with basic amenities.'}
                {selectedType === 'cold-storage' && 'Temperature-controlled storage facility for perishable goods and temperature-sensitive items.'}
                {selectedType === 'distribution' && 'Strategic facility for efficient storage and distribution of goods to various locations.'}
                {selectedType === 'industrial' && 'Heavy-duty warehouse space suitable for manufacturing and industrial storage needs.'}
                {selectedType === 'ecommerce' && 'Modern facility optimized for online retail fulfillment with advanced inventory management.'}
                {selectedType === 'bonded' && 'Secured warehouse for storing imported goods before duty payment with customs supervision.'}
              </p>
            </div>
          )}

          {selectedType && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'general' && (
                    <>
                      <li>• Basic storage facilities</li>
                      <li>• Loading/unloading docks</li>
                      <li>• Security systems</li>
                      <li>• Inventory management</li>
                    </>
                  )}
                  {selectedType === 'cold-storage' && (
                    <>
                      <li>• Temperature control</li>
                      <li>• Humidity monitoring</li>
                      <li>• Cold rooms</li>
                      <li>• Backup power systems</li>
                    </>
                  )}
                  {selectedType === 'distribution' && (
                    <>
                      <li>• Multiple loading bays</li>
                      <li>• Cross-docking facilities</li>
                      <li>• Sorting areas</li>
                      <li>• Fleet management</li>
                    </>
                  )}
                  {selectedType === 'industrial' && (
                    <>
                      <li>• Heavy machinery support</li>
                      <li>• High power capacity</li>
                      <li>• Industrial ventilation</li>
                      <li>• Waste management</li>
                    </>
                  )}
                  {selectedType === 'ecommerce' && (
                    <>
                      <li>• Automated systems</li>
                      <li>• Picking stations</li>
                      <li>• Packaging areas</li>
                      <li>• Returns processing</li>
                    </>
                  )}
                  {selectedType === 'bonded' && (
                    <>
                      <li>• Customs supervision</li>
                      <li>• Security measures</li>
                      <li>• Documentation center</li>
                      <li>• Duty-free storage</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Ideal For</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'general' && (
                    <>
                      <li>• Retail businesses</li>
                      <li>• Wholesalers</li>
                      <li>• Small manufacturers</li>
                      <li>• Local distributors</li>
                    </>
                  )}
                  {selectedType === 'cold-storage' && (
                    <>
                      <li>• Food industry</li>
                      <li>• Pharmaceuticals</li>
                      <li>• Chemical storage</li>
                      <li>• Perishable goods</li>
                    </>
                  )}
                  {selectedType === 'distribution' && (
                    <>
                      <li>• Logistics companies</li>
                      <li>• Supply chain hubs</li>
                      <li>• Retail chains</li>
                      <li>• FMCG companies</li>
                    </>
                  )}
                  {selectedType === 'industrial' && (
                    <>
                      <li>• Manufacturers</li>
                      <li>• Heavy industries</li>
                      <li>• Equipment storage</li>
                      <li>• Raw materials</li>
                    </>
                  )}
                  {selectedType === 'ecommerce' && (
                    <>
                      <li>• Online retailers</li>
                      <li>• D2C brands</li>
                      <li>• Marketplace sellers</li>
                      <li>• 3PL providers</li>
                    </>
                  )}
                  {selectedType === 'bonded' && (
                    <>
                      <li>• Import/Export firms</li>
                      <li>• International trade</li>
                      <li>• Customs brokers</li>
                      <li>• Duty-free operators</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehouseType;