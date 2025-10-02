import { useNavigate, useParams } from "react-router-dom";
import {
  ErrorMsg,
  Inputs,
  MultiSelectField,
  SelectField,
  useAuthQuery,
} from "../../imports";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  IErrorResponse,
  IField,
  ISystem,
  SessionResponse,
} from "../../interfaces";
import { useEffect, useMemo } from "react";
import { useFields, useSystems, useTechnologies } from "../../api";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { SessionSchema } from "../../validation";
import { InferType } from "yup";
import { LuArrowLeft } from "react-icons/lu";
import { IoSaveOutline } from "react-icons/io5";
import { getToken } from "../../helpers/helpers";
const EditSession = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  /* ------------------ Fetch Data ------------------ */
  const Systems = useSystems().data?.data.systems;
  const Fields = useFields().data?.data;
  const Technology = useTechnologies().data?.data.technologies ?? [];

  /* ------------------ Form & State ------------------ */
  const token = getToken();
  const queryClient = useQueryClient();
  const UserSession = useAuthQuery<SessionResponse>({
    queryKey: [`UserSession`],
    url: `/sessions/by-id/${id}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const session = UserSession ?? [];
  const SessionData = session?.data?.data;
  const fieldName = SessionData?.requirements.map((x) => x.field);
  const TechNames = SessionData?.requirements.map((x) => x.technologies).join();

  const fieldIds = Array.from(
    new Set(
      Technology.flatMap((tech) => tech.fields)
        .filter((field) => fieldName?.includes(field.name))
        .map((field) => field.id)
    )
  );
  const techIds = Array.from(
    new Set(
      Technology.filter((tech) => TechNames?.includes(tech.name)).map(
        (tech) => tech.id
      )
    )
  );

  type EdiitSession = InferType<typeof SessionSchema>;

  const methods = useForm<EdiitSession>({
    resolver: yupResolver(SessionSchema),
    defaultValues: {
      description: SessionData?.description ?? "",
      name: SessionData?.name ?? "",
      system: SessionData?.system.id ?? "",
      isPrivate: SessionData?.private ?? false,
      field: fieldIds,
      technologies: techIds,
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

  /*-------------------------------------------------------------------------------*/

  const onSubmit: SubmitHandler<EdiitSession> = async (data) => {
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
      await axiosInstance.put(`/sessions/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      methods.reset();
      Navigate("/workspace");
      toast.success("Session Update successfully", {
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
                  Edit Project
                </h1>
                <p className="text-[#42D5AE]/80">
                  Update your project details and manage its requirements easily
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            {/* Session Info */}
            <div className="bg-white shadow-sm rounded-xl p-6 space-y-6">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Describe your project"
                />
                {methods.formState.errors.description && (
                  <ErrorMsg
                    Msg={methods.formState.errors.description?.message}
                  />
                )}
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer hover:border-[#42D5AE]/30 transition-colors ${
                              field.value === isPrivate
                                ? "border-[#42D5AE] bg-[#f0fdfa]"
                                : "border-gray-200"
                            }`}
                          >
                            <input
                              type="radio"
                              checked={field.value === isPrivate}
                              onChange={() => field.onChange(isPrivate)}
                              className="mr-3 text-[#42D5AE] focus:ring-[#42D5AE]"
                            />
                            <div>
                              <div className="font-semibold text-gray-900">
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
                className="w-full px-6 py-3 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md"
              >
                <IoSaveOutline className="w-4 h-4" />
                Edit Project
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default EditSession;
