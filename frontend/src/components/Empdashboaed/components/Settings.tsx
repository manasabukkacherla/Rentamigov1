import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Moon,
  Sun,
  Camera,
  Mail,
  Phone,
  Shield,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";
import { useEffect } from "react";
import Toast from "./Toast";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  propertyAlerts: boolean;
  maintenanceUpdates: boolean;
  paymentReminders: boolean;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications"
  >("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const [notificationPrefs, setNotificationPrefs] =
    useState<NotificationPreferences>({
      emailNotifications: true,
      propertyAlerts: true,
      maintenanceUpdates: true,
      paymentReminders: true,
    });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        setToast({
          show: true,
          message: "User ID not found in session. Please log in again.",
          type: "error",
        });
        return;
      }

      try {
        const response = await fetch(`/api/sign/employee/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setProfile({
            name: data.employee.name || data.employee.fullName || "",
            email: data.employee.email || "",
            phone: data.employee.phone || "",
            avatar:
              data.employee.avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          });
        } else {
          setToast({
            show: true,
            message: "Error fetching user data: " + data.error,
            type: "error",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
        setToast({
          show: true,
          message: "Server error, please try again.",
          type: "error",
        });
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      setToast({
        show: true,
        message: "User not found in session. Please log in again.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const userData = JSON.parse(storedUser);
    const userId = userData.id;

    const updatedUserData = {
      name: profile.name || userData.name,
      phone: profile.phone || userData.phone,
    };

    if (!updatedUserData.name || !updatedUserData.phone) {
      setToast({
        show: true,
        message: "Full name and phone number cannot be empty.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/sign/employee/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      const data = await response.json();

      if (data.success) {
        setToast({
          show: true,
          message: "Profile updated successfully!",
          type: "success",
        });

        const updatedSessionUser = {
          ...userData,
          fullName: updatedUserData.name,
          phone: updatedUserData.phone,
        };
        sessionStorage.setItem("user", JSON.stringify(updatedSessionUser));

        setProfile((prevProfile) => ({
          ...prevProfile,
          name: updatedUserData.name,
          phone: updatedUserData.phone,
        }));
      } else {
        setToast({
          show: true,
          message: "Error updating profile: " + data.error,
          type: "error",
        });
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      setToast({
        show: true,
        message: "Failed to update profile. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = sessionStorage.getItem("userId"); // Get user ID from session storage
    if (!userId) {
      setToast({
        show: true,
        message: "User ID not found in session. Please log in again.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    // Validate input fields
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setToast({
        show: true,
        message: "Both current and new passwords are required.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/sign/employee/update-password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setToast({
          show: true,
          message: "Password updated successfully!",
          type: "success",
        });

        // Clear password fields after success
        setPasswordData({ currentPassword: "", newPassword: "" });
      } else {
        setToast({
          show: true,
          message: "Error updating password: " + data.error,
          type: "error",
        });
      }
    } catch (error) {
      console.error("❌ Error updating password:", error);
      setToast({
        show: true,
        message: "Failed to update password. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = (key: keyof NotificationPreferences) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Manage your personal information and preferences",
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
      description: "Update your password and security settings",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Configure how you receive notifications",
    },
  ];

  return (
    <div className="p-4 sm:p-8 bg-white">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <h2 className="text-3xl font-light mb-8 text-black tracking-tight">
        Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                <ChevronRight className="w-5 h-5 ml-auto" />
              </button>
            );
          })}
        </nav>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="max-w-4xl mx-auto">
            {activeTab === "profile" && (
              <div>
                <h3 className="text-lg font-medium text-black">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Update your personal information and how others see you on the
                  platform.
                </p>

                <form onSubmit={handleProfileUpdate} className="mt-6 space-y-6">
                  <div className="flex items-center gap-8">
                    <div className="relative">
                      <img
                        src={profile.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-black"
                      />
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 p-1.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Profile photo</h4>
                      <p className="text-sm text-gray-600">
                        Click the camera icon to upload a new photo
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-black"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="mt-1 block w-full rounded-lg border border-gray-200 py-2 px-3 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-black"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={profile.email}
                        disabled
                        className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 shadow-sm text-gray-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-black"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="mt-1 block w-full rounded-lg border border-gray-200 py-2 px-3 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h3 className="text-lg font-medium text-black">Security</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your password and security preferences.
                </p>

                <form
                  onSubmit={handlePasswordChange}
                  className="mt-6 space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-black"
                      >
                        Current Password
                      </label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="current-password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="block w-full rounded-lg border border-gray-200 py-2 px-3 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-black"
                      >
                        New Password
                      </label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="new-password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="block w-full rounded-lg border border-gray-200 py-2 px-3 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h3 className="text-lg font-medium text-black">
                  Notification Preferences
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Choose how you want to receive notifications and updates.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      key: "emailNotifications",
                      title: "Email Notifications",
                      description: "Receive notifications via email",
                    },
                    {
                      key: "propertyAlerts",
                      title: "Property Alerts",
                      description:
                        "Get notified about new properties matching your criteria",
                    },
                    {
                      key: "maintenanceUpdates",
                      title: "Maintenance Updates",
                      description: "Receive updates about maintenance requests",
                    },
                    {
                      key: "paymentReminders",
                      title: "Payment Reminders",
                      description: "Get reminded about upcoming payments",
                    },
                  ].map(({ key, title, description }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-medium text-black">{title}</h4>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleNotificationToggle(
                            key as keyof NotificationPreferences
                          )
                        }
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                          notificationPrefs[
                            key as keyof NotificationPreferences
                          ]
                            ? "bg-black"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            notificationPrefs[
                              key as keyof NotificationPreferences
                            ]
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
