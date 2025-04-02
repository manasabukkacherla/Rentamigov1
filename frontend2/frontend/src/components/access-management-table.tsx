// import { useEffect, useState } from "react";
// import { ChevronDown, Plus } from "lucide-react";
// import AddEmployeeForm from "./add-employee-form";
// import axios from "axios";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   mobile: string;
//   access: string;
//   selected: boolean;
// }
// interface Employee {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   role: string;
//   phone: string;
// }
// interface EmployeeUpdatePayload {
//   firstname: string;
//   lastname: string;
//   email: string;
//   role: string;
//   phone: string;
// }
// export default function AccessManagementTable() {
//   const [users, setUsers] = useState<User[]>([]);
//   // const [users, setUsers] = useState<User[]>([
//   //   {
//   //     id: 1,
//   //     name: "Samit Bhattacharya",
//   //     email: "Samit@rentamigo.in",
//   //     mobile: "9999999999",
//   //     access: "Employee",
//   //     selected: false,
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Pradeep Kavali",
//   //     email: "Pradeep@rentamigo.in",
//   //     mobile: "9999999999",
//   //     access: "Employee",
//   //     selected: false,
//   //   },
//   // ]);
//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get("https://api.rentamigo.in//api/employees");
//       const employeeData = response.data.data;

//       // Transform the API data to match our User interface
//       const transformedUsers: User[] = employeeData.map((emp: Employee) => ({
//         id: emp._id,
//         name: `${emp.firstname} ${emp.lastname}`,
//         email: emp.email,
//         mobile: emp.phone,
//         access: emp.role.charAt(0).toUpperCase() + emp.role.slice(1), // Capitalize role
//         selected: false,
//       }));

//       setUsers(transformedUsers);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const [selectAll, setSelectAll] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);

//   const handleSelectAll = () => {
//     setSelectAll(!selectAll);
//     setUsers(users.map((user) => ({ ...user, selected: !selectAll })));
//   };

//   const handleSelectUser = (id: number) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id ? { ...user, selected: !user.selected } : user
//       )
//     );
//   };

//   const handleAccessChange = (id: number, newAccess: string) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id ? { ...user, access: newAccess } : user
//       )
//     );
//   };
//   const handleUpdateEmployee = async (id: string, data: EmployeeUpdatePayload) => {
//     try {
//       await axios.put(`https://api.rentamigo.in//api/employees/${id}`, data);
//       await fetchEmployees();
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       alert("Failed to update employee");
//     }
//   };

//   const handleAddEmployee = (newEmployee: Omit<User, "id" | "selected">) => {
//     const newId =
//       users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
//     setUsers([...users, { ...newEmployee, id: newId, selected: false }]);
//     setShowAddForm(false);
//   };

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <div className="mb-6 flex justify-between items-center">
//         <img src="src/assets/logo.png" alt="Rentamigo Logo" className="h-10" />
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
//         >
//           <Plus className="mr-2" size={16} />
//           Add
//         </button>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b">
//               <th className="p-4 text-left">
//                 <input
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                   className="rounded border-gray-300"
//                 />
//               </th>
//               <th className="p-4 text-left">S. No</th>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-left">Mobile</th>
//               <th className="p-4 text-left">Access</th>
//               <th className="p-4 text-left">Access Change</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="border-b">
//                 <td className="p-4">
//                   <input
//                     type="checkbox"
//                     checked={user.selected}
//                     onChange={() => handleSelectUser(user.id)}
//                     className="rounded border-gray-300"
//                   />
//                 </td>
//                 <td className="p-4">{user.id}</td>
//                 <td className="p-4">{user.name}</td>
//                 <td className="p-4">{user.email}</td>
//                 <td className="p-4">{user.mobile}</td>
//                 <td className="p-4">{user.access}</td>
//                 <td className="p-4">
//                   <div className="relative">
//                     <select
//                       className="w-full appearance-none border rounded px-3 py-2 pr-8 bg-white"
//                       onChange={(e) =>
//                         handleAccessChange(user.id, e.target.value)
//                       }
//                       defaultValue=""
//                     >
//                       <option value="" disabled>
//                         Select
//                       </option>
//                       <option value="Manager">Manager</option>
//                       <option value="Employee">Employee</option>
//                     </select>
//                     <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {users.map((user) => (
//           <div key={user.id} className="border rounded-lg p-4 space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <input
//                   type="checkbox"
//                   checked={user.selected}
//                   onChange={() => handleSelectUser(user.id)}
//                   className="rounded border-gray-300"
//                 />
//                 <span className="font-medium">#{user.id}</span>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div>
//                 <label className="text-sm text-gray-500">Name</label>
//                 <p className="font-medium">{user.name}</p>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Email</label>
//                 <p>{user.email}</p>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Mobile</label>
//                 <p>{user.mobile}</p>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Current Access</label>
//                 <p>{user.access}</p>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Access Change</label>
//                 <div className="relative mt-1">
//                   <select
//                     className="w-full appearance-none border rounded px-3 py-2 pr-8 bg-white"
//                     onChange={(e) =>
//                       handleAccessChange(user.id, e.target.value)
//                     }
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select
//                     </option>
//                     <option value="Manager">Manager</option>
//                     <option value="Employee">Employee</option>
//                   </select>
//                   <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showAddForm && (
//         <AddEmployeeForm
//           onClose={() => setShowAddForm(false)}
//           onSubmit={handleAddEmployee}
//         />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import AddEmployeeForm from "./add-employee-form";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  access: string;
  selected: boolean;
}

interface Employee {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone: string;
}

interface EmployeeUpdatePayload {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone: string;
}

export default function AccessManagementTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUserForUpdate, setSelectedUserForUpdate] =
    useState<User | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://api.rentamigo.in//api/employees");
      const employeeData = response.data.data;

      const transformedUsers: User[] = employeeData.map((emp: Employee) => ({
        id: emp._id,
        name: `${emp.firstname} ${emp.lastname}`,
        email: emp.email,
        mobile: emp.phone,
        access: emp.role.charAt(0).toUpperCase() + emp.role.slice(1),
        selected: false,
      }));

      setUsers(transformedUsers);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setUsers(users.map((user) => ({ ...user, selected: !selectAll })));
  };

  const handleSelectUser = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, selected: !user.selected } : user
      )
    );
  };

  const handleAccessChange = (id: string, newAccess: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, access: newAccess } : user
      )
    );
  };

  const handleUpdateEmployee = async (
    id: string,
    data: EmployeeUpdatePayload
  ) => {
    try {
      await axios.put(`https://api.rentamigo.in//api/employees/${id}`, data);
      await fetchEmployees();
      setSelectedUserForUpdate(null);
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
    }
  };

  const handleAddEmployee = (newEmployee: Omit<User, "id" | "selected">) => {
    const newId = Math.random().toString();
    setUsers([...users, { ...newEmployee, id: newId, selected: false }]);
    setShowAddForm(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <img src="src/assets/logo.png" alt="Rentamigo Logo" className="h-10" />
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="p-4 text-left">S. No</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Mobile</th>
              <th className="p-4 text-left">Access</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={user.selected}
                    onChange={() => handleSelectUser(user.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.mobile}</td>
                <td className="p-4">{user.access}</td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedUserForUpdate(user)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  {/* <select
                    className="w-32 appearance-none border rounded px-3 py-2 pr-8 bg-white"
                    onChange={(e) =>
                      handleAccessChange(user.id, e.target.value)
                    }
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                  </select> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border rounded-lg p-4 space-y-3">
            {/* Mobile card content remains the same */}
          </div>
        ))}
      </div>

      {showAddForm && (
        <AddEmployeeForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddEmployee}
        />
      )}

      {selectedUserForUpdate && (
        <UpdateEmployeeModal
          user={selectedUserForUpdate}
          onClose={() => setSelectedUserForUpdate(null)}
          onUpdate={handleUpdateEmployee}
        />
      )}
    </div>
  );
}

function UpdateEmployeeModal({
  user,
  onClose,
  onUpdate,
}: {
  user: User;
  onClose: () => void;
  onUpdate: (id: string, data: EmployeeUpdatePayload) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    firstname: user.name.split(" ")[0],
    lastname: user.name.split(" ")[1] || "",
    email: user.email,
    role: user.access.toLowerCase(),
    phone: user.mobile,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(user.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Update Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
