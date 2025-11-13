import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ApiError, IData } from "../../interfaces";
import { useFields, useSystems, useTechnologies } from "../../api";
import ContentCard from "./ContentCard";
import { AnimatePresence } from "framer-motion";
import { TechnologyModal } from "./TechnologyModal";
import { SystemModal } from "./SystemModal";
import { FieldModel } from "./FieldModel";
import DeleteModel from "../DeleteSessionModel";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Modern Content Management Component
export function ModernContentManagement() {
  /*--State------------------------------------------------------------------------------------------------ */
  const [activeTab, setActiveTab] = useState("categories");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTechnologyModalOpen, setIsTechnologyModalOpen] = useState(false);
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [isFieldModalOpenEdit, setIsFieldModalOpenEdit] = useState(false);
  const [selectedField, setSelectedField] = useState<any | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    entityType?: "category" | "field" | "technology";
    entityId?: string;
  }>({ isOpen: false });
  const queryClient = useQueryClient();
  /*--Data-------------------------------------------------------------------------------------------------- */
  const { data: Systems } = useSystems();
  const technologies = useTechnologies().data?.data.technologies ?? [];
  const Fields = useFields().data?.data ?? [];
  const techData = technologies.map((tech) => ({
    id: tech.id,
    name: tech.name,
  }));
  /*--Habdler------------------------------------------------------------------------------------------------ */
  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const handleAddTechnology = () => {
    setIsTechnologyModalOpen(true);
  };
  const handleAddField = () => {
    setIsFieldModalOpen(true);
  };
  const openDeleteModal = (
    id: string,
    type: "category" | "field" | "technology"
  ) => {
    setDeleteModal({ isOpen: true, entityId: id, entityType: type });
  };
  const handleEdit = (field: any) => {
    setSelectedField(field); // pass existing field → edit mode
    setIsFieldModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModal({ isOpen: false });
  const handleDelete = () => {
    if (deleteModal.entityType === "category") onSubmitRemoveCategory();
    else if (deleteModal.entityType === "field") onSubmitRemoveField();
    else if (deleteModal.entityType === "technology")
      onSubmitRemoveTechnology();
    closeDeleteModal();
  };
  const onSubmitRemoveCategory = async () => {
    try {
      const res = await axiosInstance.delete(
        `/admin/systems/${deleteModal.entityId}/`
      );
      toast.success("category deleted successfully", {
        position: "top-right",
        duration: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: [`SystemsData`],
      });
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(
        `You cannot delete this category because it is linked to one or more sessions`,
        {
          position: "top-right",
          duration: 2000,
        }
      );
    }
  };
  const onSubmitRemoveField = async () => {
    try {
      const res = await axiosInstance.delete(
        `/admin/fields/${deleteModal.entityId}/`
      );
      toast.success(" field deleted  successfully", {
        position: "top-right",
        duration: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: [`FieldsData`],
      });
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(
        `You cannot delete this field because it is linked to one or more sessions.`,
        {
          position: "top-right",
          duration: 2000,
        }
      );
    }
  };
  const onSubmitRemoveTechnology = async () => {
    try {
      const res = await axiosInstance.delete(
        `/admin/technologies/${deleteModal.entityId}/`
      );
      toast.success("technology deleted successfully", {
        position: "top-right",
        duration: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: [`technologiesData`],
      });
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(
        `You cannot delete this technology because it is linked to one or more sessions.`,
        {
          position: "top-right",
          duration: 2000,
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="p-8 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              Content Management
            </h3>
            <p className="text-gray-600 text-sm">
              Organize categories and technologies
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "categories"
                ? "bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white shadow-lg shadow-[#42D5AE]/25"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab("technologies")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "technologies"
                ? "bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white shadow-lg shadow-[#42D5AE]/25"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Technologies
          </button>
          <button
            onClick={() => setActiveTab("Fields")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "Fields"
                ? "bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white shadow-lg shadow-[#42D5AE]/25"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Fields
          </button>
        </div>
      </div>
      <div className="p-8">
        {activeTab === "categories" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold text-gray-900">Categories</h4>
              <button
                onClick={handleAddCategory}
                className="bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#42D5AE]/25 transition-all flex items-center gap-2 font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Add Category
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Systems?.data.systems?.map((data: IData) => (
                <ContentCard
                  data={data}
                  key={data.id}
                  onDelete={() => {
                    openDeleteModal(data.id, "category");
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "technologies" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold text-gray-900">Technologies</h4>
              <button
                onClick={handleAddTechnology}
                className="bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#42D5AE]/25 transition-all flex items-center gap-2 font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Add technology
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {techData.map((data: IData) => (
                <ContentCard
                  data={data}
                  key={data.id}
                  onDelete={() => {
                    openDeleteModal(data.id, "technology");
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === "Fields" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold text-gray-900">Fields</h4>
              <button
                onClick={handleAddField}
                className="bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#42D5AE]/25 transition-all flex items-center gap-2 font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Add Field
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Fields.map((data: IData) => (
                <ContentCard
                  data={data}
                  key={data.id}
                  onDelete={() => {
                    openDeleteModal(data.id, "field");
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isTechnologyModalOpen && (
          <TechnologyModal
            isOpen={isTechnologyModalOpen}
            onClose={() => setIsTechnologyModalOpen(false)}
            Fields={Fields}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCategoryModalOpen && (
          <SystemModal
            isOpen={isCategoryModalOpen}
            onClose={() => setIsCategoryModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFieldModalOpen && (
          <FieldModel
            isOpen={isFieldModalOpen}
            onClose={() => setIsFieldModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <DeleteModel
        OpenDeleteModal={deleteModal.isOpen}
        closeDeleteModal={closeDeleteModal}
        onSubmitRemove={handleDelete}
        title={`Delete ${
          deleteModal.entityType
            ? deleteModal.entityType.charAt(0).toUpperCase() +
              deleteModal.entityType.slice(1)
            : ""
        }`}
        description={`Are you sure you want to remove this ${
          deleteModal.entityType ?? ""
        }? This action cannot be undone.`}
      />
    </div>
  );
}
