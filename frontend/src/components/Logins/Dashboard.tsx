import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => (window.location.href = "/login"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600"
      >
        <LogOut className="h-5 w-5" /> Logout
      </button>
    </div>
  );
}

export default Dashboard;
