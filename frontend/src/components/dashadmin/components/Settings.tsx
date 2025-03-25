import React, { useEffect, useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Retrieve data from session storage
    const storedData = sessionStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData((prevState) => ({
        ...prevState,
        id: parsedData.id || "",
        fullName: parsedData.username || "", // Assuming username as full name
        email: parsedData.email || "",
      }));
    }
  }, []);

  // Validate passwords as user types - without toasts
  useEffect(() => {
    const newErrors = { ...errors };

    // Clear errors when fields are empty
    if (!userData.currentPassword) newErrors.currentPassword = "";
    if (!userData.newPassword) newErrors.newPassword = "";
    if (!userData.confirmPassword) newErrors.confirmPassword = "";

    // Validate new password
    if (userData.newPassword) {
      if (userData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters long";
      } else {
        newErrors.newPassword = "";
      }
    }

    // Validate confirm password
    if (
      userData.confirmPassword &&
      userData.newPassword !== userData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    } else if (userData.confirmPassword) {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
  }, [
    userData.currentPassword,
    userData.newPassword,
    userData.confirmPassword,
  ]);

  const handlePasswordChange = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    if (
      !userData.currentPassword ||
      !userData.newPassword ||
      !userData.confirmPassword
    ) {
      toast.error("All password fields are required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (userData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (userData.newPassword !== userData.confirmPassword) {
      toast.error("New password and confirm password do not match", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await axios.put(`/api/sign/user/update-password/${userData.id}`, {
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword,
      });

      toast.success("Password updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Clear password fields after successful update
      setUserData((prevState) => ({
        ...prevState,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      // Reset errors
      setErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Error updating password. Please try again.";

      if (errorMessage.toLowerCase().includes("current password")) {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Current password is incorrect",
        }));
        toast.error("Current password is incorrect", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Account Settings
            </h3>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                value={userData.fullName}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                value={userData.email}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
        </div>
        <form onSubmit={handlePasswordChange} className="p-6 space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 pr-10 ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                }`}
                value={userData.currentPassword}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    currentPassword: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPasswords.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 pr-10 ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  value={userData.newPassword}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      newPassword: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 pr-10 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
