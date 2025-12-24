import { motion } from "framer-motion";
import { FaSave, FaTimes } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../config/axios.config";
import { getToken } from "../../helpers/helpers";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  IRolesResponse,
  IRole,
  IAssignRoleRequest,
  IErrorResponse,
} from "../../interfaces";
import { useState, useEffect } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  currentRoles: string[]; // Array of role types like ["ROLE_USER", "ROLE_ADMIN"]
}

export function AssignRoleModal({
  isOpen,
  onClose,
  userId,
  userName,
  currentRoles,
}: IProps) {
  const queryClient = useQueryClient();
  const token = getToken();
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);

  // Don't render if userId is missing
  if (!isOpen || !userId || userId.trim() === "") return null;

  // Fetch all available roles
  const { data: rolesData, isLoading: isLoadingRoles } =
    useQuery<IRolesResponse>({
      queryKey: ["RolesData"],
      queryFn: async () => {
        const { data } = await axiosInstance.get<IRolesResponse>(`/roles/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      },
    });

  const roles = rolesData?.data?.roleCollection ?? [];

  // Find ROLE_USER role - this cannot be removed
  const userRole = roles.find((role) => role.type === "ROLE_USER");
  const userRoleId = userRole?.id;

  // Initialize selected roles based on current user roles
  useEffect(() => {
    if (isOpen && roles.length > 0) {
      // Map current role types to role IDs
      const roleIds = roles
        .filter((role) => currentRoles.includes(role.type))
        .map((role) => role.id);

      // Ensure ROLE_USER is always included
      if (userRoleId && !roleIds.includes(userRoleId)) {
        roleIds.push(userRoleId);
      }

      setSelectedRoleIds(roleIds);
    }
  }, [isOpen, roles, currentRoles, userRoleId]);

  const handleRoleToggle = (roleId: string) => {
    // Prevent removing ROLE_USER
    if (roleId === userRoleId) {
      return;
    }

    setSelectedRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSubmit = async () => {
    if (!userId || userId.trim() === "") {
      toast.error("User ID is missing. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    // Remove ROLE_USER from the request (it should not be included)
    const finalRoleIds = selectedRoleIds.filter((id) => id !== userRoleId);

    if (finalRoleIds.length === 0) {
      toast.error("Please select at least one role", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    try {
      // Ensure userId is valid
      const validUserId = userId?.trim();
      if (!validUserId) {
        toast.error("Invalid user ID. Please try again.", {
          position: "top-right",
          duration: 2000,
        });
        return;
      }

      const payload: IAssignRoleRequest = {
        id: validUserId,
        roleIds: finalRoleIds,
      };
      await axiosInstance.put(`/roles/assign`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Roles assigned successfully", {
        position: "top-right",
        duration: 1000,
      });

      // Invalidate users query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["UsersData"] });
      onClose();
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      toast.error(
        err.response?.data?.message ||
          "Failed to assign roles. Please try again.",
        {
          position: "top-right",
          duration: 2000,
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Assign Roles
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Assign roles to {userName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {isLoadingRoles ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#42D5AE]"></div>
              <span className="ml-3 text-gray-600">Loading roles...</span>
            </div>
          ) : roles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No roles available
            </div>
          ) : (
            <div className="space-y-3">
              {roles.map((role: IRole) => {
                const isUserRole = role.type === "ROLE_USER";
                const isSelected = selectedRoleIds.includes(role.id);
                const isDisabled = isUserRole;

                return (
                  <label
                    key={role.id}
                    className={`flex items-center p-4 border rounded-xl transition-colors ${
                      isDisabled
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-75"
                        : "border-gray-200 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRoleToggle(role.id)}
                      disabled={isDisabled}
                      className={`w-5 h-5 text-[#42D5AE] border-gray-300 rounded focus:ring-2 focus:ring-[#42D5AE]/20 ${
                        isDisabled ? "cursor-not-allowed" : ""
                      }`}
                    />
                    <div className="ml-3 flex-1">
                      <span className="text-sm font-medium text-gray-900">
                        {role.type.replace("ROLE_", "")}
                      </span>
                      {isDisabled && (
                        <span className="ml-2 text-xs text-gray-500 italic">
                          (Cannot be removed)
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedRoleIds.length === 0}
            className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:shadow-lg hover:shadow-[#42D5AE]/25 text-white rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSave className="w-4 h-4" />
            Assign Roles
          </button>
        </div>
      </motion.div>
    </div>
  );
}
