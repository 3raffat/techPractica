import { FaSave, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { IErrorResponse, IField, ITechnology } from "../../interfaces";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Inputs from "../ui/Input";
import Select from "../ui/SelectName";
import axiosInstance from "../../config/axios.config";
import { getToken } from "../../helpers/helpers";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface ITechRec {
  name: string;
  fieldNames: string[];
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  Fields: IField[];
  technology?: ITechnology | null; // if provided → edit mode
}

export function TechnologyModal({ Fields, isOpen, onClose, technology }: IProps) {
  const queryClient = useQueryClient();
  const token = getToken();
  
  const methods = useForm<ITechRec>({
    defaultValues: { name: "", fieldNames: [] },
  });

  const { reset } = methods;
  const isEditMode = !!technology;

  // 🔹 When modal opens or technology changes → update form values
  useEffect(() => {
    if (isOpen) {
      if (technology) {
        // Convert technology.fields to fieldNames array
        const fieldNames = technology.fields?.map((field) => field.name) || [];
        reset({ 
          name: technology.name,
          fieldNames: fieldNames
        });
      } else {
        reset({ name: "", fieldNames: [] });
      }
    }
  }, [isOpen, technology, reset]);

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<ITechRec> = async (data) => {
    // Ensure fieldNames is always an array
    const fieldNamesArray = Array.isArray(data.fieldNames) 
      ? data.fieldNames 
      : [data.fieldNames as unknown as string];
    
    const payload = {
      name: data.name,
      fieldNames: fieldNamesArray,
    };

    try {
      if (isEditMode && technology?.id) {
        await axiosInstance.put(`/admin/technologies/${technology.id}/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Technology updated successfully", {
          position: "top-right",
          duration: 1000,
        });
      } else {
        await axiosInstance.post("/admin/technologies/", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Technology created successfully", {
          position: "top-right",
          duration: 1000,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["technologiesData"] });
      onClose();
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl"
      >
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isEditMode ? "Edit Technology" : "Create Technology"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {isEditMode
                  ? "Update technology details below"
                  : "Configure technology details"}
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
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Technology Name
              </label>
              <Inputs
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/20 focus:border-[#42D5AE] outline-none transition-all text-sm"
                placeholder="Enter technology name"
                {...methods.register("name")}
              />
            </div>

            <div>
              <div>
                <div>
                  {Fields?.length! > 0 && (
                    <Select<IField>
                      options={Fields!}
                      label="Field"
                      name="fieldNames"
                      getLabel={(x) => x.name}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:shadow-lg hover:shadow-[#42D5AE]/25 text-white rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <FaSave className="w-4 h-4" />
                {isEditMode ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
}
