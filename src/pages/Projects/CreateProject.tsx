import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CookiesService,
  ErrorMsg,
  Inputs,
  MultiSelectField,
  SelectField,
} from "../../imports";
import type {
  ICreateSessionRequest,
  IErrorResponse,
  IField,
  ISessionRequest,
  ISystem,
} from "../../interfaces";
import {
  Controller,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { useFields, useSystems, useTechnologies } from "../../api";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const CreateProject = () => {
  const Navigate = useNavigate();
  /* ------------------ Form & State ------------------ */
  const queryClient = useQueryClient();

  const methods = useForm<ICreateSessionRequest>();
  const [fieldTechState, setFieldTechState] = useState<
    { field: string; technologies: string[] }[]
  >([]);

  const token = CookiesService.get("UserToken");

  /* ------------------ Fetch Data ------------------ */
  const Systems = useSystems().data?.data.systems;
  const Fields = useFields().data?.data;
  const Technology = useTechnologies().data?.data.technologies ?? [];

  /* ------------------ Helper: Watch Fields ------------------ */
  const SelectedFields = useMemo(
    () => (methods.watch("field") || []).map(String),
    [methods.watch("field")]
  );

  /* ------------------ Filter Technologies ------------------ */
  const FilterTech = useMemo(() => {
    if (!SelectedFields.length) return [];
    return Technology.filter((tech) =>
      tech.fields.some((f) => SelectedFields.includes(f.id))
    );
  }, [SelectedFields, Technology]);

  /* ------------------ Keep Selected Technologies Valid ------------------ */
  useEffect(() => {
    const selectedTech = (methods.watch("technologies") || []) as string[];
    const allowedIds = FilterTech.map((t) => t.id);
    const updatedTech = selectedTech.filter((id) => allowedIds.includes(id));

    if (updatedTech.length !== selectedTech.length) {
      methods.setValue("technologies", updatedTech, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [FilterTech, methods, methods.watch("technologies")]);

  /* ------------------ Update fieldTechState ------------------ */
  const project = methods.getValues();
  useEffect(() => {
    if (!project.field || !project.technologies) {
      setFieldTechState([]);
      return;
    }

    const formatted = project.field.map((fieldId) => {
      // find all techs linked to this field
      const techsForField = project.technologies.filter((tid) =>
        FilterTech.some(
          (t) => t.id === tid && t.fields.some((f) => f.id === fieldId)
        )
      );
      return { field: fieldId, technologies: techsForField };
    });

    setFieldTechState(formatted);
  }, [project.field, project.technologies, FilterTech]);

  /*-------------------------------------------------------------------------------*/
  const onSubmit: SubmitHandler<ICreateSessionRequest> = async (data) => {
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

    console.log(payload);
    try {
      await axiosInstance.post("/sessions/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      methods.reset();
      Navigate("/dashboard");
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="mb-10">
          <button
            onClick={() => Navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Project
          </h1>
        </div>

        {/* Form Section */}
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
            </div>

            {/* Project Details */}
            <div className="bg-white shadow-sm rounded-xl p-6 space-y-6">
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
                <Save className="w-4 h-4" />
                Create Project
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default CreateProject;
