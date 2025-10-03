import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IData } from "../../interfaces";
import { useFields, useSystems, useTechnologies } from "../../api";
import ContentCard from "./ContentCard";
import { AnimatePresence } from "framer-motion";
import { TechnologyModal } from "./TechnologyModal";
import { SystemModal } from "./SystemModal";
import { FieldModel } from "./FieldModel";

// Modern Content Management Component
export function ModernContentManagement() {
  /*--State------------------------------------------------------------------------------------------------ */
  const [activeTab, setActiveTab] = useState("categories");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTechnologyModalOpen, setIsTechnologyModalOpen] = useState(false);
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
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
                <ContentCard data={data} key={data.id} />
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
                <ContentCard data={data} key={data.id} />
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
                <ContentCard data={data} key={data.id} />
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
    </div>
  );
}
