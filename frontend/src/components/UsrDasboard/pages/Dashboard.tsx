import React, { useState, useEffect } from 'react';
import {
  Home, Users, TrendingUp, DollarSign, Plus,
  Download, Bell, ArrowUpRight
} from 'lucide-react';
import { StatCard } from '../StatCard';
import { Link } from 'react-router-dom';
import { CircularChart } from '../CircularChart';
import axios from 'axios';

interface Property {
  createdBy: string;
  status: string;
}

interface Lead {
  createdBy: string;
  status: string;
}

export function Dashboard() {
  const [username, setUsername] = useState('User');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);

  const [propertyStats, setPropertyStats] = useState({
    total: 0,
    rented: 0,
    available: 0,
    sold: 0
  });

  const [leadStats, setLeadStats] = useState({
    total: 0,
    converted: 0
  });

  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number | null>(null);

  const quickActions = [
    { icon: Plus, label: 'Add Property', link: '/properties' },
    { icon: Download, label: 'Export Leads', link: '/leads' },
    { icon: Bell, label: 'View Notifications', link: '/notifications' }
  ];

  // ✅ Get userId from session
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('Session userData:', userData);
        setUsername(userData.username || 'User');
        setRole(userData.role || '');
        setUserId(userData.userId || '');
      } catch (err) {
        console.error("Session parse error:", err);
      }
    }
  }, []);

  // ✅ Fetch all properties and leads once
  useEffect(() => {
    axios.get('/api/allproperties/all')
      .then(res => {
        const props = res.data.data || [];
        console.log("Fetched all properties:", props);
        setAllProperties(props);
      })
      .catch(err => console.error("Error fetching properties", err));

    axios.get('/api/enquiry/enquiries')
      .then(res => {
        const leads = res.data.data || [];
        console.log("Fetched all leads:", leads);
        setAllLeads(leads);
      })
      .catch(err => console.error("Error fetching leads", err));
  }, []);

  // ✅ Filter property stats
  useEffect(() => {
    if (!userId || allProperties.length === 0) return;

    console.log("Filtering properties for userId:", userId);

    const userProps = allProperties.filter(p => p.createdBy === userId);
    console.log("Filtered properties:", userProps);

    const rented = userProps.filter(p => p.status === 'Rented').length;
    const available = userProps.filter(p => p.status === 'Available').length;
    const sold = userProps.filter(p => p.status === 'Sold').length;

    setPropertyStats({
      total: userProps.length,
      rented,
      available,
      sold
    });
  }, [userId, allProperties]);

  // ✅ Filter lead stats
  useEffect(() => {
    if (!userId || allLeads.length === 0) return;

    console.log("Filtering leads for userId:", userId);

    const userLeads = allLeads.filter(l => l.createdBy === userId);
    console.log("Filtered leads:", userLeads);

    const converted = userLeads.filter(l => l.status === 'converted').length;

    setLeadStats({
      total: userLeads.length,
      converted
    });
  }, [userId, allLeads]);

  const performanceMetrics = [
    {
      label: 'Available Properties',
      value: propertyStats.available,
      color: 'rgb(0,0,0)',
      icon: Home
    },
    {
      label: 'Rented Properties',
      value: propertyStats.rented,
      color: 'rgba(0,0,0,0.8)',
      icon: DollarSign
    },
    {
      label: 'Sold Properties',
      value: propertyStats.sold,
      color: 'rgba(0,0,0,0.6)',
      icon: TrendingUp
    },
    {
      label: 'Total Leads',
      value: leadStats.total,
      color: 'rgba(0,0,0,0.4)',
      icon: Users
    },
    {
      label: 'Converted Leads',
      value: leadStats.converted,
      color: 'rgba(0,0,0,0.2)',
      icon: Bell
    }
  ];

  return (
    <div className="p-4 bg-white min-h-screen space-y-6">
      {/* Welcome */}
      <div className="bg-white border border-black/10 rounded-lg p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-black mb-2">Welcome back, {username}! 👋</h1>
        <p className="text-black/70">Role: <strong>{role}</strong></p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={`/Userdashboard${action.link}`}
              className="flex justify-between items-center border border-black/10 p-4 rounded-xl bg-white shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-black text-white p-2.5 rounded-lg">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-black font-semibold">{action.label}</span>
              </div>
              <ArrowUpRight className="text-black w-5 h-5" />
            </Link>
          );
        })}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Properties" value={propertyStats.total} icon={Home} />
        <StatCard title="Total Leads" value={leadStats.total} icon={Users} />
        <StatCard title="Available Properties" value={propertyStats.available} icon={TrendingUp} />
        <StatCard title="Rented Properties" value={propertyStats.rented} icon={DollarSign} />
      </div>

      {/* Performance Overview */}
      <div className="bg-white border border-black/10 rounded-xl shadow-lg p-5">
        <h2 className="text-xl font-semibold text-black mb-6">Performance Overview</h2>
        <CircularChart
          data={performanceMetrics.map(m => ({
            label: m.label,
            value: m.value,
            color: m.color
          }))}
          size={250}
          selectedIndex={selectedMetricIndex}
          onSegmentClick={(i) => setSelectedMetricIndex(i === selectedMetricIndex ? null : i)}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {performanceMetrics.map((m, i) => {
            const Icon = m.icon;
            const isSelected = selectedMetricIndex === i;
            return (
              <button
                key={i}
                onClick={() => setSelectedMetricIndex(isSelected ? null : i)}
                className={`p-4 rounded-xl text-left transition ${
                  isSelected ? 'bg-black text-white scale-105' : 'bg-black/5 text-black hover:bg-black/10'
                }`}
              >
                <div className={`p-2 rounded-lg w-min mb-2 ${isSelected ? 'bg-white/20' : 'bg-black/10'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-lg font-semibold">{m.value}</div>
                <div className={`text-xs ${isSelected ? 'text-white/70' : 'text-black/60'}`}>{m.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
