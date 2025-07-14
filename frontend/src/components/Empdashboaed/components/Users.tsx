import React, { useEffect, useState } from 'react';
import {
  Search, Ban, CheckCircle, Mail, Phone, MoreVertical, Globe
} from 'lucide-react';
import axios from 'axios';

interface User {
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

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'id' | 'phone'>('id');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sign/users');
        setUsers(
          Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data.users)
            ? response.data.users
            : []
        );
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (value: string) => setSearchTerm(value);

  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    if (searchBy === 'id') {
      return user._id.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return user.phone.includes(searchTerm);
  });

  return (
    <div className="space-y-6 md:space-y-8">
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

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Address</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
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
                <td className="px-6 py-4 text-gray-500">{user.address}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-3 py-1 rounded-full text-sm ${user.role === 'manager' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;