import { useState } from 'react';

interface CornerPropertyProps {
  isCornerProperty: boolean;
  onCornerPropertyChange?: (isCorner: boolean) => void;
}

const CornerProperty = ({ isCornerProperty, onCornerPropertyChange }: CornerPropertyProps) => {
  const [isCorner, setIsCorner] = useState(isCornerProperty);

  const handleChange = (value: boolean) => {
    setIsCorner(value);
    onCornerPropertyChange?.(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isCorner}
          onChange={(e) => handleChange(e.target.checked)}
          className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
        />
        <span className="text-black">This is a corner property</span>
      </label>
    </div>
  );
};

export default CornerProperty;