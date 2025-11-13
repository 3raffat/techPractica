import { motion } from "framer-motion";
import { FaSave, FaTimes } from "react-icons/fa";
import Inputs from "../ui/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interfaces";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios.config";
import { getToken } from "../../helpers/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface IField {
  id?: string;
  name: string;
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  field?: IField | null; // if provided → edit mode
}

export function FieldModel({ isOpen, onClose, field }: IProps) {
  const queryClient = useQueryClient();
  const token = getToken();

  const methods = useForm<IField>({
    defaultValues: { name: "" },
  });

  const { reset } = methods;
  const isEditMode = !!field;

  // 🔹 When modal opens or field changes → update form values
  useEffect(() => {
    if (isOpen) {
      if (field) {
        reset({ name: field.name }); // fill values for edit mode
      } else {
        reset({ name: "" }); // clear values for create mode
      }
    }
  }, [isOpen, field, reset]);

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<IField> = async (data) => {
    try {
      if (isEditMode && field?.id) {
        await axiosInstance.put(`/admin/fields/${field.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Field updated successfully", {
          position: "top-right",
          duration: 1000,
        });
      } else {
        await axiosInstance.post("/admin/fields/", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Field created successfully", {
          position: "top-right",
          duration: 1000,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["FieldsData"] });
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
                {isEditMode ? "Edit Field" : "Create Field"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {isEditMode
                  ? "Update field details below"
                  : "Configure field details"}
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

        {/* Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Field Name
              </label>
              <Inputs
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/20 focus:border-[#42D5AE] outline-none transition-all text-sm"
                placeholder="Enter field name"
                {...methods.register("name", { required: true })}
              />
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
