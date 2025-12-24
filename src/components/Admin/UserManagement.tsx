import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BsTrash2 } from "react-icons/bs";
import {
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiUserPlus,
} from "react-icons/fi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../config/axios.config";
import { getToken } from "../../helpers/helpers";
import { IUsersResponse, User } from "../../interfaces";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import DeleteModel from "../DeleteSessionModel";
import { AssignRoleModal } from "./AssignRoleModal";
import { AnimatePresence } from "framer-motion";

export function ModernUserManagement() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    userId?: string;
    userName?: string;
  }>({ isOpen: false });
  const [assignRoleModal, setAssignRoleModal] = useState<{
    isOpen: boolean;
    userId?: string;
    userName?: string;
    currentRoles?: string[];
  }>({ isOpen: false });

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(0); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append("page", currentPage.toString());
  queryParams.append("size", pageSize.toString());
  if (roleFilter) {
    queryParams.append("role", roleFilter);
  }
  if (debouncedSearchTerm) {
    queryParams.append("userName", debouncedSearchTerm);
  }

  // Fetch users with axios
  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery<IUsersResponse>({
    queryKey: [
      "UsersData",
      currentPage,
      pageSize,
      roleFilter,
      debouncedSearchTerm,
    ],
    queryFn: async () => {
      const token = getToken();
      const { data } = await axiosInstance.get<IUsersResponse>(
        `/users/?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });

  const users = usersData?.data?.userCollection ?? [];

  const handleRoleFilterChange = (role: string) => {
    setRoleFilter(role);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const getRoleBadge = (roles: string[]) => {
    const role = roles?.[0] || "ROLE_USER";
    // Remove "ROLE_" prefix for display
    const roleDisplay = role.replace("ROLE_", "");
    const styles = {
      ADMIN: "bg-purple-100 text-purple-700 ring-1 ring-purple-200",
      USER: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
    };
    return styles[roleDisplay as keyof typeof styles] || styles.USER;
  };

  const getRoleDisplay = (roles: string[]) => {
    const role = roles?.[0] || "ROLE_USER";
    return role.replace("ROLE_", "");
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const openDeleteModal = (userId: string, userName: string) => {
    setDeleteModal({ isOpen: true, userId, userName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false });
  };

  const handleDeleteUser = async () => {
    if (!deleteModal.userId) return;

    try {
      const token = getToken();
      await axiosInstance.delete(`/users/delete/${deleteModal.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully", {
        position: "top-right",
        duration: 1000,
      });

      // Invalidate and refetch users data
      queryClient.invalidateQueries({
        queryKey: ["UsersData"],
      });

      closeDeleteModal();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message ||
          "Failed to delete user. Please try again.",
        {
          position: "top-right",
          duration: 2000,
        }
      );
    }
  };

  const openAssignRoleModal = (user: User) => {
    if (!user || !user.id || user.id.trim() === "") {
      toast.error("Invalid user data. Cannot assign roles.", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    setAssignRoleModal({
      isOpen: true,
      userId: user.id,
      userName: user.name || `${user.firstName} ${user.lastName}`,
      currentRoles: user.roles || [],
    });
  };

  const closeAssignRoleModal = () => {
    setAssignRoleModal({ isOpen: false });
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
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                onChange={(e) => handleRoleFilterChange(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/20 focus:border-[#42D5AE] outline-none bg-white text-sm"
              >
                <option value="">All Roles</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_USER">User</option>
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
                Sessions
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-8 py-12 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#42D5AE]"></div>
                    <span className="ml-3 text-gray-600">Loading users...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-8 py-12 text-center text-red-600">
                  Error loading users. Please try again.
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-8 py-12 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user: User) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#42D5AE] to-[#38b28d] flex items-center justify-center text-white font-semibold shadow-sm">
                        {getInitials(
                          user.name || `${user.firstName} ${user.lastName}`
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {user.name || `${user.firstName} ${user.lastName}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {user.roles?.map((role, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadge(
                            [role]
                          )}`}
                        >
                          {getRoleDisplay([role])}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 ring-1 ring-green-200">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {user.totalSessions || 0}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openAssignRoleModal(user)}
                        disabled={user.roles?.includes("ROLE_ADMIN") || false}
                        className={`p-2 rounded-xl transition-colors ${
                          user.roles?.includes("ROLE_ADMIN")
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed opacity-50"
                            : "text-blue-600 hover:bg-blue-50"
                        }`}
                        title={
                          user.roles?.includes("ROLE_ADMIN")
                            ? "Cannot modify admin user roles"
                            : "Assign Roles"
                        }
                      >
                        <FiUserPlus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          openDeleteModal(
                            user.id,
                            user.name || `${user.firstName} ${user.lastName}`
                          )
                        }
                        disabled={user.roles?.includes("ROLE_ADMIN") || false}
                        className={`p-2 rounded-xl transition-colors ${
                          user.roles?.includes("ROLE_ADMIN")
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed opacity-50"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                        title={
                          user.roles?.includes("ROLE_ADMIN")
                            ? "Cannot delete admin users"
                            : "Delete User"
                        }
                      >
                        <BsTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {users.length > 0 && (
        <div className="p-8 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {currentPage * pageSize + 1} to{" "}
              {Math.min((currentPage + 1) * pageSize, users.length)} of{" "}
              {users.length} users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-sm text-gray-600 px-4">
                Page {currentPage + 1}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={users.length < pageSize}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Role Modal */}
      <AnimatePresence>
        {assignRoleModal.isOpen &&
          assignRoleModal.userId &&
          assignRoleModal.userId.trim() !== "" && (
            <AssignRoleModal
              isOpen={assignRoleModal.isOpen}
              onClose={closeAssignRoleModal}
              userId={assignRoleModal.userId}
              userName={assignRoleModal.userName || "User"}
              currentRoles={assignRoleModal.currentRoles || []}
            />
          )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <DeleteModel
        OpenDeleteModal={deleteModal.isOpen}
        closeDeleteModal={closeDeleteModal}
        onSubmitRemove={handleDeleteUser}
        title="Delete User"
        description={`Are you sure you want to delete ${
          deleteModal.userName || "this user"
        }? This action cannot be undone.`}
      />
    </div>
  );
}
