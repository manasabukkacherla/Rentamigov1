import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Bell,
  Shield,
  X,
  Upload,
  Coins,
  Building,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { User as UserType } from "../types";
import { toast } from "@/hooks/use-toast";
import { Subscription } from "node_modules/react-hook-form/dist/utils/createSubject";

export function Settings() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
const [subLoading, setSubLoading]   = useState<boolean>(true);
const [subError,   setSubError]     = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserType>({
    id: "",
    fullName: "",
    username: "",
    email: "",
    role: "",
    photoUrl: "",
    tokens: 0,
    plan: "basic" as PlanType, // ✅ Ensures TypeScript knows it's a valid key
    planExpiry: "",
    phone: "",
    company: "",
    address: "",
    notifications: {
      emailNotifications: false,
      smsNotifications: false,
    },
  });
interface Subscription {
  plan: "free" | "basic" | "premium" | "enterprise";
  tokens: number;
  planExpiry: string; // ISO date-string
}
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Retrieved user from session storage:", parsedUser); // ✅ Debug log

        if (parsedUser.id) {
          fetchUserDetails(parsedUser.id);
        } else {
          console.error("User ID is missing in session storage.");
          setError("User ID not found.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error parsing session storage:", error);
        setError("Error reading user data.");
        setLoading(false);
      }
    } else {
      console.error("No user data found in session storage.");
      setError("No user data found.");
      setLoading(false);
    }
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      console.log("Fetching user details for ID:", userId); // ✅ Debug log

      const response = await fetch(`/api/sign/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response Status:", response.status); // ✅ Debug log

      const data = await response.json();
      console.log("Fetched user data:", data); // ✅ Debug log

      if (response.ok) {
        setUser(data.user);
      } else {
        console.error("Error fetching user details:", data.error);
        setError(data.error || "Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Network error fetching user details:", error);
      setError("❌ Network error while fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading user details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({
          ...prev,
          photoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (
    type: "emailNotifications" | "smsNotifications"
  ) => {
    setUser((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };
    const fetchSubscription = async (id: string) => {
  try {
    const res  = await fetch(`http://localhost:3000/api/subscription/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to load subscription");

    setSubscription({
      plan: data.plan,
      tokens: data.tokens,
      planExpiry: data.planExpiry,
    });
  } catch (err: any) {
    console.error(err);
    setSubError(err.message || "Could not load subscription");
  } finally {
    setSubLoading(false);
  }
};
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = sessionStorage.getItem("user");
    let userId = "";

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser.id || parsedUser._id;
      } catch (error) {
        console.error("❌ Error parsing session storage:", error);
        setError("Error reading user data. Please log in again.");
        toast.error("Error reading user data. Please log in again.");
        return;
      }
    } else {
      console.error("❌ No user data found in session storage.");
      setError("No user data found. Please log in again.");
      toast.error("No user data found. Please log in again.");
      return;
    }

    console.log("🔄 Using User ID from sessionStorage:", userId);

    if (!userId) {
      console.error("❌ Error: User ID is missing. Cannot update profile.");
      setError("User ID not found. Please try again.");
      toast.error("User ID not found. Please try again.");
      return;
    }

    fetch(`/api/sign/user/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Profile update response:", data);

        if (data.success || data.message === "User updated successfully") {
          toast.success("✅ Profile updated successfully!");
        } else {
          console.error("❌ Backend returned an error:", data.error);
          setError(data.error || "Failed to update profile.");
          toast.error(data.error || "Failed to update profile.");
        }
      })
      .catch((error) => {
        console.error("❌ Network error updating profile:", error);
        setError("Network error while updating profile.");
        toast.error("Network error while updating profile.");
      });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("All password fields are required.");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }

    // Retrieve user ID from session storage
    const storedUser = sessionStorage.getItem("user");
    let userId = "";

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser.id || parsedUser._id; // Ensure correct ID usage
      } catch (error) {
        console.error("❌ Error parsing session storage:", error);
        setError("Error reading user data. Please log in again.");
        return;
      }
    } else {
      console.error("❌ No user data found in session storage.");
      setError("No user data found. Please log in again.");
      return;
    }

    console.log("🔄 Changing password for User ID:", userId);

    try {
      const response = await fetch(`/api/sign/user/update-password/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });


      const data = await response.json();
      console.log("✅ Password change response:", data);

      if (data.success) {
        alert("✅ Password changed successfully!");
        setShowPasswordModal(false);
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error updating password:", error);
      alert("❌ Network error while updating password.");
    }
  };

  type PlanType = "free" | "basic" | "premium" | "enterprise";

  const planFeatures: Record<PlanType, string[]> = {
    free: ["5 Properties", "10 Leads/month", "Basic Analytics"],
    basic: [
      "20 Properties",
      "50 Leads/month",
      "Advanced Analytics",
      "Email Support",
    ],
    premium: [
      "Unlimited Properties",
      "Unlimited Leads",
      "Premium Analytics",
      "24/7 Support",
    ],
    enterprise: [
      "Custom Solutions",
      "Dedicated Account Manager",
      "API Access",
      "Custom Branding",
    ],
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
        Settings
      </h1>

      <div className="space-y-4 sm:space-y-6">
        {/* Profile Photo & Basic Info */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
          <div className="flex items-center mb-6">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-black">
              Profile Settings
            </h2>
          </div>
        {subLoading ? (
  <p className="text-center text-gray-600">Loading subscription…</p>
) : subError ? (
  <p className="text-center text-red-600">{subError}</p>
) : subscription && (
  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10 mb-4 sm:mb-6">
    <div className="flex items-center mb-4 sm:mb-6">
      <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
      <h2 className="text-lg sm:text-xl font-semibold text-black">
        Your Plan
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span className="font-medium">Plan:</span>
        <span className="capitalize">{subscription.plan}</span>
      </div>

      <div className="flex items-center gap-3">
        <Building className="w-4 h-4 text-black" />
        <span className="font-medium">Tokens:</span>
        <span>{subscription.tokens.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-3">
        <MapPin className="w-4 h-4 text-black" />
        <span className="font-medium">Expires:</span>
        <span>
          {new Date(subscription.planExpiry).toLocaleDateString()}
        </span>
      </div>
    </div>

    {/* optional: list features */}
    <ul className="mt-4 sm:mt-6 list-disc list-inside text-black/70 text-sm">
      {planFeatures[subscription.plan].map(f => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  </div>
)}
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <img
                  src={user?.photoUrl || "https://via.placeholder.com/150"}
                  alt={user?.fullName || "User"}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-black/10"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-black">
                  {user?.role || "N/A"}
                </p>
                <p className="text-xs text-black/60">Account Type</p>
              </div>
            </div>

            {/* Basic Info Form */}
            <form
              onSubmit={handleProfileUpdate}
              className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.fullName || ""}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={user?.username || ""}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={user?.phone || ""}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-black/60 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={user?.company || ""}
                  onChange={(e) =>
                    setUser({ ...user, company: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-black/60 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={user?.address || ""}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Subscription & Tokens */}

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
          <div className="flex items-center mb-4 sm:mb-6">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-black">
              Notification Preferences
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={user.notifications?.emailNotifications || false}
                onChange={() => handleNotificationChange("emailNotifications")}
              />
              <label className="ml-2 text-sm sm:text-base text-black">
                Email notifications for new leads
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={user.notifications?.smsNotifications || false}
                onChange={() => handleNotificationChange("smsNotifications")}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-black/20 text-black focus:ring-red-500"
              />
              <label className="ml-2 text-sm sm:text-base text-black">
                SMS notifications for urgent updates
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
          <div className="flex items-center mb-4 sm:mb-6">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-black">
              Security
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full px-4 py-2 bg-black text-white text-sm sm:text-base rounded-lg hover:bg-black/80 transition-colors"
            >
              Change Password
            </button>
            <button
              onClick={() => alert("2FA setup would be implemented here")}
              className="w-full px-4 py-2 bg-black/5 text-black text-sm sm:text-base rounded-lg hover:bg-black/10 transition-colors"
            >
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-black">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-black/60" />
              </button>
            </div>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-black/60 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-black/60 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-black/60 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="flex gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-black text-white text-sm sm:text-base rounded-lg hover:bg-black/80 transition-colors"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 bg-black/5 text-black text-sm sm:text-base rounded-lg hover:bg-black/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
