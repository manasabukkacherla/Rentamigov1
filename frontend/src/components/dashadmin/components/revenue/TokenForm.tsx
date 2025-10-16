import React, { useState, useEffect } from "react";
import { showToast } from "../../components/Toast";
import { Toaster } from "react-hot-toast";

interface TokenFormProps {
  onClose: () => void;
  onSave: (data: { pricePerToken: number }, isEdit: boolean, id?: string) => void;
  initialData?: { _id?: string; pricePerToken: number };
}

const TokenForm: React.FC<TokenFormProps> = ({
  onClose,
  onSave,
  initialData,
}) => {
  const [pricePerToken, setPricePerToken] = useState<number>(
    initialData?.pricePerToken || 0
  );

  const isEdit = !!initialData?._id;

  const handleSubmit = async () => {
    if (pricePerToken <= 0) {
      showToast.error("Price per token must be greater than 0");
      return;
    }

    const url = isEdit
      ? `/api/tokens/${initialData?._id}`
      : `/api/tokens`;

    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pricePerToken }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save");

      showToast.success(`Token price ${isEdit ? "updated" : "created"} successfully`);
      onSave({ pricePerToken }, isEdit, initialData?._id);
      onClose();
    } catch (error) {
      showToast.error((error as Error).message || "Failed to save token price");
    }
  };

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">
            {isEdit ? "Edit" : "Create"} Token Price
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price Per Token (₹)
              </label>
              <input
                type="number"
                value={pricePerToken}
                onChange={(e) => setPricePerToken(Number(e.target.value))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter price per token"
                min={0}
                step={0.01}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              {isEdit ? "Save Changes" : "Create Price"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenForm;
