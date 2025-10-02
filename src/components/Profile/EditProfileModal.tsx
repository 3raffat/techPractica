import { motion } from "framer-motion";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { BsSave, BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios.config";
import { AxiosError } from "axios";

import Inputs from "../ui/Input";
import ErrorMsg from "../ui/ErrorMsg";
import MultiSelectField from "../ui/muiltselect";
import { IoTrashOutline } from "react-icons/io5";
import { PiPlus } from "react-icons/pi";

import { IUserProfileRequestType, userProfileSchema } from "../../validation";
import { useTechnologies } from "../../api";
import { getToken } from "../../helpers/helpers";
import { PLATFORM_OPTIONS } from "../../data/data";
import {
  IField,
  IUser,
  IErrorResponse,
  SocialPlatform,
} from "../../interfaces";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
  onUpdated: () => void;
}

const EditProfileModal = ({ isOpen, onClose, user, onUpdated }: IProps) => {
  const token = getToken();
  const Navigate = useNavigate();

  const Technology = useTechnologies().data?.data.technologies ?? [];
  const Skills = Technology.map((item) => ({ id: item.id, name: item.name }));

  const UserSkill = user.skills.map((x) => x.id);

  const methods: UseFormReturn<IUserProfileRequestType> =
    useForm<IUserProfileRequestType>({
      resolver: yupResolver(userProfileSchema),
      defaultValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        brief: user.brief,
        skillsIds: UserSkill,
        socialAccountRequests:
          user.socialAccounts.length > 0
            ? user.socialAccounts.map((acc) => {
                const platform = PLATFORM_OPTIONS.find(
                  (p) => p.value === acc.platform
                )?.value as SocialPlatform;
                return {
                  platformName: platform,
                  profileUrl: acc.profileUrl || "",
                };
              })
            : [{ platformName: "LINKEDIN" as SocialPlatform, profileUrl: "" }],
      },
    });

  const { control, register, handleSubmit, watch, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialAccountRequests",
    keyName: "key",
  });

  const socialAccounts = watch("socialAccountRequests");

  const getAvailablePlatforms = (currentIndex: number) => {
    const selectedPlatforms = socialAccounts
      .filter((_, i) => i !== currentIndex)
      .map((acc) => acc.platformName);

    return PLATFORM_OPTIONS.filter(
      (opt) => !selectedPlatforms.includes(opt.value)
    );
  };

  const onSubmit = async (data: IUserProfileRequestType) => {
    console.log(data);
    try {
      await axiosInstance.put("/profile/", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdated?.();
      toast.success("Profile updated successfully", { duration: 1000 });
      Navigate("/profile");
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      toast.error(err.message, { duration: 2000 });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <BsX className="w-6 h-6" />
            </button>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            id="myForm"
          >
            <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <Inputs
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
                />
                {methods.formState.errors.firstName && (
                  <ErrorMsg Msg={methods.formState.errors.firstName?.message} />
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <Inputs
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
                />
                {methods.formState.errors.lastName && (
                  <ErrorMsg Msg={methods.formState.errors.lastName?.message} />
                )}
              </div>

              {/* Brief */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brief
                </label>
                <textarea
                  {...register("brief")}
                  rows={4}
                  placeholder="Brief"
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none resize-none"
                />
                {methods.formState.errors.brief && (
                  <ErrorMsg Msg={methods.formState.errors.brief?.message} />
                )}
              </div>

              {/* Skills */}
              {Skills.length > 0 && (
                <MultiSelectField<IField>
                  options={Skills}
                  label="Skills"
                  name="skillsIds"
                  getLabel={(x) => x.name}
                  getValue={(x) => x.id}
                />
              )}

              {/* Social Accounts */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Social Accounts
                </label>
                {fields.map((field, index) => (
                  <div key={field.key} className="flex gap-2 mb-2">
                    <Controller
                      name={`socialAccountRequests.${index}.platformName`}
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-35 px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
                        >
                          {getAvailablePlatforms(index).map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <Inputs
                      placeholder="Profile URL"
                      className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none"
                      {...register(`socialAccountRequests.${index}.profileUrl`)}
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        <IoTrashOutline />
                      </button>
                    )}
                  </div>
                ))}
                {socialAccounts.length < PLATFORM_OPTIONS.length && (
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        platformName:
                          PLATFORM_OPTIONS.find(
                            (p) =>
                              !socialAccounts.some(
                                (a) => a.platformName === p.value
                              )
                          )?.value || "LINKEDIN",
                        profileUrl: "",
                      })
                    }
                    className="mt-2 text-[#42D5AE]"
                  >
                    <PiPlus />
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="myForm"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2"
            >
              <BsSave className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
