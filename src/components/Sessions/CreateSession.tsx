import { useNavigate } from "react-router-dom";
import { IoSaveOutline } from "react-icons/io5";
import { LuArrowLeft } from "react-icons/lu";
import {
  ErrorMsg,
  Inputs,
  MultiSelectField,
  SelectField,
  useAuthQuery,
} from "../../imports";
import type {
  ApiError,
  IField,
  IProfileResponse,
  ISystem,
} from "../../interfaces";
import {
  Controller,
  FormProvider,
  type SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { useFields, useSystems, useTechnologies } from "../../api";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { SessionSchema } from "../../validation";
import type { InferType } from "yup";
import CompleteProfileCard from "../Profile/CompletePofileCard";
import { getToken } from "../../helpers/helpers";
import { SessionVisible } from "../../data/data";

const CreateSession = () => {
  const Navigate = useNavigate();
  /* ------------------ Form & State ------------------ */
  const queryClient = useQueryClient();
  type CrateSession = InferType<typeof SessionSchema>;

  const methods = useForm<CrateSession>({
    resolver: yupResolver(SessionSchema),
  });

  const token = getToken();
  /* ------------------ Fetch Data ------------------ */
  const Systems = useSystems().data?.data.systems;
  const Fields = useFields().data?.data;
  const Technology = useTechnologies().data?.data.technologies ?? [];
  const { isSuccess } = useAuthQuery<IProfileResponse>({
    queryKey: [`profile-data-${token}`],
    url: "/profile/",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  /* ------------------ Watch Fields & Technologies ------------------ */
  const selectedFields =
    useWatch({ control: methods.control, name: "field" }) || [];
  const selectedTechs =
    useWatch({ control: methods.control, name: "technologies" }) || [];

  /* ------------------ Filter Technologies ------------------ */
  const FilterTech = useMemo(() => {
    if (!selectedFields.length) return [];
    return Technology.filter((tech) =>
      tech.fields.some((f) => selectedFields.includes(f.id))
    );
  }, [selectedFields, Technology]);

  /* ------------------ Keep Selected Technologies Valid ------------------ */
  useEffect(() => {
    const allowedIds = FilterTech.map((t) => t.id);
    const updatedTech = selectedTechs.filter((id) => allowedIds.includes(id!));

    if (updatedTech.length !== selectedTechs.length) {
      methods.setValue("technologies", updatedTech, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [FilterTech, selectedTechs, methods]);

  /*-------------------------------------------------------------------------------*/
  const onSubmit: SubmitHandler<CrateSession> = async (data) => {
    const { name, description, system, isPrivate } = data;
    const requirements = data.field.map((fieldId) => {
      const techForField = Technology.filter(
        (tech) =>
          data.technologies.includes(tech.id) &&
          tech.fields.some((f) => f.id === fieldId)
      ).map((t) => t.id);

      return {
        field: fieldId,
        technologies: techForField,
      };
    });

    const payload = {
      name,
      description,
      system,
      isPrivate,
      requirements,
    };

    try {
      await axiosInstance.post("/sessions/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      methods.reset();

      Navigate("/workspace");
      toast.success("Session created successfully", {
        position: "top-right",
        duration: 1000,
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["SessionData-All"] });
      }, 500);
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.log(error.response?.data.message);
      toast.error(`${error.response?.data.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };
  return (
    <>
      {isSuccess ? (
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
                  onClick={() => Navigate("/workspace")}
                  className="mb-10 group flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/30"
                >
                  <LuArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                  <span className="text-white font-medium">
                    Back to Workspace
                  </span>
                </button>
                <div className="max-w-3xl">
                  <h3 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    Create Your Next Session
                  </h3>
                </div>
              </motion.div>
            </div>
          </section>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                            Basic Information
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Tell us about your project vision
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10">
                      <div className="space-y-8">
                        {/* Session Name */}
                        <div>
                          <label
                            htmlFor="SessionName"
                            className="block text-base font-bold text-gray-900 mb-3"
                          >
                            Project Name{" "}
                            <span className="text-[#42D5AE]">*</span>
                          </label>
                          <Inputs
                            id="SessionName"
                            type="text"
                            placeholder="e.g., E-commerce Platform, Mobile App, AI Chatbot"
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] focus:bg-white outline-none transition-all text-gray-900 placeholder:text-gray-400 hover:border-gray-300 text-lg"
                            {...methods.register("name")}
                          />
                          {methods.formState.errors.name && (
                            <ErrorMsg
                              Msg={methods.formState.errors.name?.message}
                            />
                          )}
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-base font-bold text-gray-900 mb-3">
                            Description{" "}
                            <span className="text-[#42D5AE]">*</span>
                          </label>
                          <textarea
                            {...methods.register("description")}
                            rows={7}
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE]/30 focus:border-[#42D5AE] focus:bg-white outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400 hover:border-gray-300 text-base leading-relaxed"
                            placeholder="Describe your project in detail... What problem does it solve? What are the key features? Who is the target audience?"
                          />
                          {methods.formState.errors.description && (
                            <ErrorMsg
                              Msg={
                                methods.formState.errors.description?.message
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

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
                            Technical Requirements
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Define the technical stack and expertise needed
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10">
                      <div className="space-y-8">
                        {/* System and Fields Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* System */}
                          <div>
                            {Systems?.length! > 0 && (
                              <SelectField<ISystem>
                                options={Systems!}
                                label="System"
                                name="system"
                                getLabel={(x) => x.name}
                                getValue={(x) => x.id}
                              />
                            )}
                          </div>

                          {/* Fields */}
                          <div>
                            {Fields?.length! > 0 && (
                              <MultiSelectField<IField>
                                options={Fields!}
                                label="Fields"
                                name="field"
                                getLabel={(x) => x.name}
                                getValue={(x) => x.id}
                              />
                            )}
                          </div>
                        </div>

                        {/* Technologies */}
                        {FilterTech?.length! > 0 && (
                          <div className="pt-4 border-t border-gray-100">
                            <MultiSelectField<IField>
                              options={FilterTech!}
                              label="Technologies"
                              name={`technologies`}
                              getLabel={(x) => x.name}
                              getValue={(x) => x.id}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

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
                            Project Visibility
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Control who can discover and view your project
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10">
                      <div className="space-y-8">
                        <Controller
                          name="isPrivate"
                          control={methods.control}
                          defaultValue={false}
                          render={({ field }) => (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {SessionVisible.map((option, idx) => (
                                <label
                                  key={idx}
                                  className={`relative flex items-start p-8 bg-gradient-to-br border-2 rounded-2xl cursor-pointer transition-all duration-300 group ${
                                    field.value === option.isPrivate
                                      ? "border-[#42D5AE] from-[#42D5AE]/5 to-[#42D5AE]/10 shadow-xl shadow-[#42D5AE]/10"
                                      : "border-gray-200 from-gray-50 to-white hover:border-[#42D5AE]/50 hover:shadow-lg"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    checked={field.value === option.isPrivate}
                                    onChange={() =>
                                      field.onChange(option.isPrivate)
                                    }
                                    className="mt-1.5 mr-5 w-5 h-5 text-[#42D5AE] focus:ring-[#42D5AE] focus:ring-2 border-gray-300 cursor-pointer"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                      <div
                                        className={`p-2 rounded-lg transition-colors ${
                                          field.value === option.isPrivate
                                            ? "bg-[#42D5AE]/10"
                                            : "bg-gray-100 group-hover:bg-[#42D5AE]/5"
                                        }`}
                                      >
                                        <option.icon
                                          className={`w-6 h-6 transition-colors ${
                                            field.value === option.isPrivate
                                              ? "text-[#42D5AE]"
                                              : "text-gray-600"
                                          }`}
                                        />
                                      </div>
                                      <div className="font-bold text-gray-900 text-xl">
                                        {option.type}
                                      </div>
                                    </div>
                                    <div className="text-base text-gray-600 leading-relaxed">
                                      {option.description}
                                    </div>
                                  </div>
                                  {field.value === option.isPrivate && (
                                    <div className="absolute top-6 right-6">
                                      <div className="relative">
                                        <div className="w-3 h-3 bg-[#42D5AE] rounded-full animate-pulse" />
                                        <div className="absolute inset-0 w-3 h-3 bg-[#42D5AE] rounded-full animate-ping" />
                                      </div>
                                    </div>
                                  )}
                                </label>
                              ))}
                            </div>
                          )}
                        />
                        {methods.formState.errors.isPrivate && (
                          <ErrorMsg
                            Msg={methods.formState.errors.isPrivate?.message}
                          />
                        )}

                        <div className="mt-10 pt-10 border-t border-gray-100">
                          <button
                            type="submit"
                            className="w-full px-8 py-5 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-2xl transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-[#42D5AE]/20 hover:shadow-2xl hover:shadow-[#42D5AE]/30 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <IoSaveOutline className="w-6 h-6" />
                            Create Project
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
      ) : (
        <CompleteProfileCard route="/profile/complete" />
      )}
    </>
  );
};
export default CreateSession;
