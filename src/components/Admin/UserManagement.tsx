import { motion } from "framer-motion";
import { useState } from "react";
import { BsTrash2 } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

export function ModernUserManagement({ users, onEditUser, onDeleteUser }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  //   const filteredUsers = users.filter((user: any) => {
  //     const matchesSearch =
  //       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.email.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesRole = !roleFilter || user.role === roleFilter;
  //     const matchesStatus = !statusFilter || user.status === statusFilter;
  //     return matchesSearch && matchesRole && matchesStatus;
  //   });

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: "bg-purple-100 text-purple-700 ring-1 ring-purple-200",
      moderator: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
      user: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
    };
    return styles[role as keyof typeof styles] || styles.user;
  };

  const getStatusBadge = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 ring-1 ring-green-200"
      : "bg-orange-100 text-orange-700 ring-1 ring-orange-200";
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="p-8 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              User Management
            </h3>
            <p className="text-gray-600 text-sm">
              Manage and monitor platform users
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/20 focus:border-[#42D5AE] outline-none w-full sm:w-64 transition-all"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/20 focus:border-[#42D5AE] outline-none bg-white text-sm"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/20 focus:border-[#42D5AE] outline-none bg-white text-sm"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Projects
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {/* {filteredUsers.map((user: any) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white font-semibold shadow-sm">
                      {user.avatar}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getRoleBadge(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {user.projects}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                  {new Date(user.lastActive).toLocaleDateString()}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-2 text-[#42D5AE] hover:bg-[#42D5AE]/10 rounded-xl transition-colors"
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <BsTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
