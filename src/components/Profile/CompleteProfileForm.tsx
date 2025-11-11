import {
  useForm,
  useFieldArray,
  FormProvider,
  type UseFormReturn,
  Controller,
} from "react-hook-form";
import Inputs from "../ui/Input";
import ErrorMsg from "../ui/ErrorMsg";
import MultiSelectField from "../ui/muiltselect";
import { IoSaveOutline, IoTrashOutline } from "react-icons/io5";
import { LuArrowLeft } from "react-icons/lu";
import type { IErrorResponse, IField } from "../../interfaces";
import { useTechnologies } from "../../api";
import { PiPlus } from "react-icons/pi";
import axiosInstance from "../../config/axios.config";
import { PLATFORM_OPTIONS } from "../../data/data";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  type IUserProfileRequestType,
  userProfileSchema,
} from "../../validation";
import { getToken } from "../../helpers/helpers";
import { motion } from "framer-motion";

const UserProfileForm = () => {
  const token = getToken();
  const Technology = useTechnologies().data?.data.technologies ?? [];
  const Skills = Technology.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const Navigate = useNavigate();
  const methods: UseFormReturn<IUserProfileRequestType> =
    useForm<IUserProfileRequestType>({
      resolver: yupResolver(userProfileSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        brief: "",
        skillsIds: [],
        socialAccountRequests: [{ platformName: "LINKEDIN", profileUrl: "" }],
      },
    });

  const { control, register, handleSubmit, watch } = methods;

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
    try {
      await axiosInstance.post("/profile/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      methods.reset();
      Navigate("/profile");
      toast.success("Profile completed successfully", {
        position: "top-right",
        duration: 1000,
      });
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;

      toast.error(`${err.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <section className="relative bg-gradient-to-br from-[#42D5AE] via-[#38b28d] to-[#022639] py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#42D5AE] rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/30 rounded-full blur-2xl" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => Navigate(-1)}
              className="mb-10 group flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/30"
            >
              <LuArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
              <span className="text-white font-medium">Back</span>
            </button>
            <div className="max-w-3xl">
              <h3 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Complete Your Profile
              </h3>
              <p className="text-xl text-white/90 leading-relaxed">
                Tell us about yourself to get started on your journey
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="py-10 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#42D5AE] to-[#38b28d] text-white font-bold text-xl shadow-lg shadow-[#42D5AE]/20">
                      1
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="text-gray-600 mt-1">Tell us who you are</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10">
                  <div className="space-y-8">
                    {/* Name Fields Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* First Name */}
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-base font-bold text-gray-900 mb-3"
                        >
                          First Name <span className="text-[#42D5AE]">*</span>
                        </label>
                        <Inputs
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] focus:bg-white outline-none transition-all text-gray-900 placeholder:text-gray-400 hover:border-gray-300 text-lg"
                          {...register("firstName")}
                        />
                        {methods.formState.errors.firstName && (
                          <ErrorMsg
                            Msg={methods.formState.errors.firstName?.message}
                          />
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-base font-bold text-gray-900 mb-3"
                        >
                          Last Name <span className="text-[#42D5AE]">*</span>
                        </label>
                        <Inputs
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] focus:bg-white outline-none transition-all text-gray-900 placeholder:text-gray-400 hover:border-gray-300 text-lg"
                          {...register("lastName")}
                        />
                        {methods.formState.errors.lastName && (
                          <ErrorMsg
                            Msg={methods.formState.errors.lastName?.message}
                          />
                        )}
                      </div>
                    </div>

                    {/* Brief */}
                    <div>
                      <label className="block text-base font-bold text-gray-900 mb-3">
                        Brief Introduction{" "}
                        <span className="text-[#42D5AE]">*</span>
                      </label>
                      <textarea
                        {...register("brief")}
                        rows={7}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] focus:bg-white outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400 hover:border-gray-300 text-base leading-relaxed"
                        placeholder="Share your story, experience, and what drives you..."
                      />
                      {methods.formState.errors.brief && (
                        <ErrorMsg
                          Msg={methods.formState.errors.brief?.message}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {Skills.length > 0 && (
            <section className="py-10 bg-gradient-to-br from-gray-50 to-white relative">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#42D5AE] to-[#38b28d] text-white font-bold text-xl shadow-lg shadow-[#42D5AE]/20">
                        2
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                          Skills & Expertise
                        </h2>
                        <p className="text-gray-600 mt-1">
                          Select your technical skills
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10">
                    <MultiSelectField<IField>
                      options={Skills}
                      label="Select Your Skills"
                      name="skillsIds"
                      getLabel={(x) => x.name}
                      getValue={(x) => x.id}
                    />
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          <section className="py-10 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#42D5AE] to-[#38b28d] text-white font-bold text-xl shadow-lg shadow-[#42D5AE]/20">
                      3
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        Social Accounts
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Connect your professional profiles
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10">
                  <div className="space-y-8">
                    {/* Add Account Button */}
                    {socialAccounts.length < PLATFORM_OPTIONS.length && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            append({
                              platformName: PLATFORM_OPTIONS.find(
                                (p) =>
                                  !socialAccounts.some(
                                    (a) => a.platformName === p.value
                                  )
                              )!.value,
                              profileUrl: "",
                            })
                          }
                          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#42D5AE] hover:text-white hover:bg-[#42D5AE] rounded-xl transition-all border-2 border-[#42D5AE]"
                        >
                          <PiPlus className="w-5 h-5" />
                          Add Account
                        </button>
                      </div>
                    )}

                    {/* Social Account Items */}
                    <div className="space-y-6">
                      {fields.map((field, index) => (
                        <div
                          key={field.key}
                          className="flex gap-4 items-start p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl hover:border-[#42D5AE] transition-all"
                        >
                          <Controller
                            name={`socialAccountRequests.${index}.platformName`}
                            control={control}
                            render={({ field }) => (
                              <select
                                {...field}
                                className="w-48 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] outline-none transition-all text-gray-900 font-bold"
                              >
                                {getAvailablePlatforms(index).map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          />

                          <div className="flex-1">
                            <Inputs
                              placeholder="https://..."
                              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                              {...register(
                                `socialAccountRequests.${index}.profileUrl`
                              )}
                            />
                            {methods.formState.errors.socialAccountRequests?.[
                              index
                            ]?.profileUrl && (
                              <ErrorMsg
                                Msg={
                                  methods.formState.errors
                                    .socialAccountRequests[index]?.profileUrl
                                    ?.message
                                }
                              />
                            )}
                          </div>

                          {fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              aria-label="Remove social account"
                            >
                              <IoTrashOutline className="w-6 h-6" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 pt-10 border-t border-gray-100">
                      <button
                        type="submit"
                        className="w-full px-8 py-5 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-2xl transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-[#42D5AE]/20 hover:shadow-2xl hover:shadow-[#42D5AE]/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <IoSaveOutline className="w-6 h-6" />
                        Complete Profile
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserProfileForm;
