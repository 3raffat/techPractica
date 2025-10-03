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
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
export function SystemModal({ isOpen, onClose }: IProps) {
  const queryClient = useQueryClient();
  const token = getToken();
  interface ISystemRec {
    name: string;
  }
  const methods = useForm<ISystemRec>();
  const onSubmit: SubmitHandler<ISystemRec> = async (data) => {
    console.log(data);
    try {
      await axiosInstance.post("/admin/systems/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("System created successfully", {
        position: "top-right",
        duration: 1000,
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["SystemsData"] });
      }, 500);
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;

      toast.error(`${err.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };
  if (!isOpen) return null;

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
              <p className="text-sm text-gray-600 mt-1">
                Configure System details
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
                System Name
              </label>
              <Inputs
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/20 focus:border-[#42D5AE] outline-none transition-all text-sm"
                placeholder="Enter System name"
                {...methods.register("name")}
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
                {"Create"}
              </button>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
}
