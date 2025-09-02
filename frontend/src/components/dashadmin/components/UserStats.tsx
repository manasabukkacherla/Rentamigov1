import React, { useEffect, useState } from 'react';
import { UserCircle, Users, Activity, Clock, Calendar, MapPin, Search, Ban, CheckCircle, Mail, Phone, MoreVertical, Globe, Calendar as CalendarIcon } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface User{
  _id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  role: string;
  acceptTerms: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  image: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  website: string;
}

const UserStats = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'id' | 'phone'>('id');
  const [users, setUsers] = useState<User[]>([
    {
      _id:"",
      username:"",
      fullName:"",
      email:"",
      phone:"",
      address:"",
      city:"",
      state:"",
      role:"",
      acceptTerms:false,
      emailVerified:false,
      createdAt:"",
      updatedAt:"",
      __v:0,
      bio:"",
      image:"",
      instagram:"",
      linkedin:"",
      twitter:"",
      website:""
    }
  ]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sign/users');
        console.log('API Response:', response); 
        setUsers( Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.users)
        ? response.data.users
        : []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);
  let admin=0;
  let employee=0;
  let owner=0;
  let tenant=0;
  let agent=0;
  let usertype=0;
  users.map((user)=>{
    if(user.role==='admin') admin++;
    else if(user.role==='employee') employee++;
    else if(user.role==='owner') owner++;
    else if(user.role==='tenant') tenant++;
    else if(user.role==='agent') agent++;
    else usertype++;
    
  })
  const stats = [
    {
      title: 'Admin',
      value: admin,
    },
    {
      title: 'Employee',
      value: employee,
    },
    {
      title: 'Owner',
      value: owner,
    },
    {
      title: 'Tenant',
      value: tenant,
    },
    {
      title: 'Agent',
      value: agent,
    },
    {
      title: 'User',
      value: usertype,
    },
  ];
  const usersType=['admin','employee','owner','tenant','agent','user'];

  const userGrowthData = {
    labels: usersType,
    datasets: [
      {
        label: 'User Type',
        data: [admin, employee, owner, tenant, agent,usertype],
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tension: 0.4
      },
      
    ]
  };
  
  const userTypeData = {
    labels: ['admin', 'employee', 'owner', 'tenant', 'agent', 'user'],
    datasets: [
      {
        data: [admin, employee, owner, tenant, agent,usertype],
        backgroundColor: [
          'rgba(0, 0, 0, 0.8)',
          'rgba(0, 0, 0, 0.5)',
          'rgba(0, 0, 0, 0.2)',
        ],
        borderColor: [
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
          'rgb(0, 0, 0)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        display: window.innerWidth > 768,
      },
    },
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  function handleToggleUserStatus(_id: string): void {
    throw new Error('Function not implemented.');
  }

  // const handleToggleUserStatus = (userId: string) => {
  //   setUsers(users.map(user => {
  //     if (user.id === userId) {
  //       return {
  //         ...user,
  //         status: user.status === 'active' ? 'blocked' : 'active'
  //       };
  //     }
  //     return user;
  //   }));
  // };

  // const filteredUsers = users.filter(user => {
  //   if (!searchTerm) return true;
  //   if (searchBy === 'id') {
  //     return user.id.toLowerCase().includes(searchTerm.toLowerCase());
  //   }
  //   return user.phone.includes(searchTerm);
  // });
   console.log(users);

  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">User Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          return (
            <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">User Growth</h3>
            <select className="text-sm border rounded-lg px-3 py-2">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] md:h-[400px]">
            <Line options={options} data={userGrowthData} />
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">User Types</h3>
            <select className="text-sm border rounded-lg px-3 py-2">
              <option>All Time</option>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
            </select>
          </div>
          <div className="h-[300px] md:h-[400px]">
            <Pie data={userTypeData} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <select 
                className="text-sm border rounded-lg px-3 py-2 bg-white"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value as 'id' | 'phone')}
              >
                <option value="id">Search by ID</option>
                <option value="phone">Search by Phone</option>
              </select>
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder={`Search by ${searchBy}...`}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 bg-white"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {users.map((user) => (
              <div 
                key={user._id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <div className="h-24 bg-black"></div>
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-md p-1 border-4 border-white">
                    <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-900">
                        {user.fullName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    {/* <button
                      onClick={() => handleToggleUserStatus(user._id)}
                      className={`p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors ${
                        user.status === 'active'
                          ? 'hover:bg-gray-100'
                          : 'hover:bg-gray-100'
                      }`}
                    > */}
                      {/* {user.status === 'active' ? (
                        <Ban className="w-5 h-5 text-black" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-black" />
                      )}
                    </button> */}
                  </div>
                </div>

                <div className="pt-16 p-6">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">{user.fullName}</h4>
                    <p className="text-sm text-gray-500 mt-1">{user._id}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Mail className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="w-4 h-4 mr-3 text-gray-400" />
                      {user.phone}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Globe className="w-4 h-4 mr-3 text-gray-400" />
                      {user.address}
                    </div>
                    {/* <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-3 text-gray-400" />
                      {user.lastActive}
                    </div> */}
                    {/* <div className="flex items-center text-gray-600 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-3 text-gray-400" />
                      Joined {user.joinDate}
                    </div> */}
                  </div>

                  <div className="mt-6 pt-6 border-t flex items-center justify-between">
                    {/* <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {user.status}
                    </span> */}
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Address</th>
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Active</th> */}
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th> */}
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th> */}
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Role</th>

              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-6 py-4 text-gray-500">{user._id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {user.fullName.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-500">
                      {/* MapPin< className="w-4 h-4 mr-1" /> */}
                      {user.address}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 text-gray-500">{user.lastActive}</td> */}
                  <td className="px-6 py-4">
                    {/* <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span> */}
                  </td>
                  <td className="px-6 py-4">
                    {/* <button
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={`p-2 rounded-lg ${
                        user.status === 'active'
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {user.status === 'active' ? (
                        <Ban className="w-5 h-5" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                    </button> */}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.role === 'manager'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserStats;