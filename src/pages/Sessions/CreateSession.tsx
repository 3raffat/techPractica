import { useNavigate } from "react-router-dom";
import { IoSaveOutline } from "react-icons/io5";
import { LuArrowLeft } from "react-icons/lu";
import { ErrorMsg, Inputs, MultiSelectField, SelectField } from "../../imports";
import type { IErrorResponse, IField, ISystem } from "../../interfaces";
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
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { SessionSchema } from "../../validation";
import { InferType } from "yup";
import { useSessionStorage } from "usehooks-ts";

const CreateSession = () => {
  const Navigate = useNavigate();
  /* ------------------ Form & State ------------------ */
  const queryClient = useQueryClient();
  type CrateSession = InferType<typeof SessionSchema>;

  const methods = useForm<CrateSession>({
    resolver: yupResolver(SessionSchema),
  });

  const [token] = useSessionStorage("token", null);

  /* ------------------ Fetch Data ------------------ */
  const Systems = useSystems().data?.data.systems;
  const Fields = useFields().data?.data;
  const Technology = useTechnologies().data?.data.technologies ?? [];

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
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;

      toast.error(`${err.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };
  return (
    <>
      <div className=" bg-gray-50">
        <section className="bg-gradient-to-r from-[#42D5AE] to-[#022639] py-12">
          <div className="max-w-4xl mx-50 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 text-white"
            >
              <button
                onClick={() => Navigate("/workspace")}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <LuArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Create New Project
                </h1>
                <p className="text-[#42D5AE]/80">
                  Start building your next amazing project
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Form Section */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            {/* Session Info */}
            <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
              <div>
                <label
                  htmlFor="SessionName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Session Name
                </label>
                <Inputs
                  id="SessionName"
                  type="text"
                  placeholder="Session Name"
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all text-gray-900"
                  {...methods.register("name")}
                />
                {methods.formState.errors.name && (
                  <ErrorMsg Msg={methods.formState.errors.name?.message} />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...methods.register("description")}
                  rows={4}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all resize-none text-gray-900"
                  placeholder="Describe your project"
                />
                {methods.formState.errors.description && (
                  <ErrorMsg
                    Msg={methods.formState.errors.description?.message}
                  />
                )}
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category */}
                <div>
                  {Systems?.length! > 0 && (
                    <SelectField<ISystem>
                      options={Systems!}
                      label="Systems"
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

              {FilterTech?.length! > 0 && (
                <MultiSelectField<IField>
                  options={FilterTech!}
                  label="Technology"
                  name={`technologies`}
                  getLabel={(x) => x.name}
                  getValue={(x) => x.id}
                />
              )}

              {/* Visibility */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Project Visibility *
                </label>
                <Controller
                  name="isPrivate"
                  control={methods.control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Public", "Private"].map((type, idx) => {
                        const isPrivate = type === "Private";
                        return (
                          <label
                            key={idx}
                            className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer hover:border-[#42D5AE]/40 transition-all shadow-sm ${
                              field.value === isPrivate
                                ? "border-[#42D5AE] bg-[#f0fdfa]"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              checked={field.value === isPrivate}
                              onChange={() => field.onChange(isPrivate)}
                              className="mr-4 text-[#42D5AE] focus:ring-[#42D5AE]"
                            />
                            <div>
                              <div className="font-semibold text-gray-900 text-lg">
                                {type}
                              </div>
                              <div className="text-sm text-gray-500">
                                {isPrivate
                                  ? "Only you can view this project"
                                  : "Anyone can view this project"}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                />
                {methods.formState.errors.isPrivate && (
                  <ErrorMsg Msg={methods.formState.errors.isPrivate?.message} />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-2xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <IoSaveOutline className="w-5 h-5" />
                Create Project
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default CreateSession;
