import { motion } from "framer-motion";
import { BsX } from "react-icons/bs";
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
import { ApiError, IField, ISystem, SessionResponse } from "../../interfaces";
import { useEffect, useMemo } from "react";
import { useFields, useSystems, useTechnologies } from "../../api";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { SessionSchema } from "../../validation";
import { InferType } from "yup";
import { IoSaveOutline } from "react-icons/io5";
import { getToken } from "../../helpers/helpers";
import { SessionVisible } from "../../data/data";

interface EditSessionModalProps {
  open: boolean;
  onClose: () => void;
  sessionId: string | undefined;
}

type EditSessionForm = InferType<typeof SessionSchema>;

export default function EditSessionModal({
  open,
  onClose,
  sessionId,
}: EditSessionModalProps) {
  const token = getToken();
  const queryClient = useQueryClient();

  const Systems = useSystems().data?.data.systems;
  const Fields = useFields().data?.data;
  const Technology = useTechnologies().data?.data.technologies ?? [];

  const UserSession = useAuthQuery<SessionResponse>({
    queryKey: [`UserSession-${sessionId}`],
    url: `/sessions/by-id/${sessionId}`,
    config: {
      enabled: open && !!sessionId,
    } as any,
  });
  const SessionData = UserSession?.data?.data;

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

  const methods = useForm<EditSessionForm>({
    resolver: yupResolver(SessionSchema),
    values: {
      description: SessionData?.description ?? "",
      name: SessionData?.name ?? "",
      system: SessionData?.system.id ?? "",
      isPrivate: SessionData?.private ?? false,
      field: fieldIds,
      technologies: techIds,
    },
  });

  const selectedFields =
    useWatch({ control: methods.control, name: "field" }) || [];
  const selectedTechs =
    useWatch({ control: methods.control, name: "technologies" }) || [];

  const FilterTech = useMemo(() => {
    if (!selectedFields.length) return [];
    return Technology.filter((tech) =>
      tech.fields.some((f) => selectedFields.includes(f.id))
    );
  }, [selectedFields, Technology]);

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

  const onSubmit: SubmitHandler<EditSessionForm> = async (data) => {
    if (!sessionId) return;
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
      await axiosInstance.put(`/sessions/${sessionId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Session updated successfully", {
        position: "top-right",
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["SessionData-All"] });
      queryClient.invalidateQueries({ queryKey: [`SessionData-1`] });
      queryClient.invalidateQueries({ queryKey: [`SessionData-all`] });
      queryClient.invalidateQueries({ queryKey: [`SessionData-${sessionId}`] });
      onClose();
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      toast.error(`${error.response?.data.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border-2 border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#42D5AE] via-[#3fc9a0] to-[#38b28d] p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Edit Session</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 text-white hover:scale-110 active:scale-95"
          >
            <BsX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 bg-gradient-to-b from-white to-gray-50/50 max-h-[80vh] overflow-y-auto">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="SessionName"
                      className="block text-sm font-bold text-gray-900 mb-2"
                    >
                      Project Name <span className="text-[#42D5AE]">*</span>
                    </label>
                    <Inputs
                      id="SessionName"
                      type="text"
                      placeholder="e.g., E-commerce Platform, Mobile App, AI Chatbot"
                      {...methods.register("name")}
                    />
                    {methods.formState.errors.name && (
                      <ErrorMsg Msg={methods.formState.errors.name?.message} />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Description <span className="text-[#42D5AE]">*</span>
                    </label>
                    <textarea
                      {...methods.register("description")}
                      rows={6}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl outline-none"
                      placeholder="Describe your project..."
                    />
                    {methods.formState.errors.description && (
                      <ErrorMsg
                        Msg={methods.formState.errors.description?.message}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <div className="pt-2 border-t border-gray-100">
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

              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-6">
                <Controller
                  name="isPrivate"
                  control={methods.control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {SessionVisible.map((option, idx) => (
                        <label
                          key={idx}
                          className={`relative flex items-start p-5 bg-gradient-to-br border-2 rounded-xl cursor-pointer transition-all duration-300 group ${
                            field.value === option.isPrivate
                              ? "border-[#42D5AE] from-[#42D5AE]/5 to-[#42D5AE]/10"
                              : "border-gray-200 from-gray-50 to-white hover:border-[#42D5AE]/50"
                          }`}
                        >
                          <input
                            type="radio"
                            checked={field.value === option.isPrivate}
                            onChange={() => field.onChange(option.isPrivate)}
                            className="mt-1 mr-4 w-5 h-5 text-[#42D5AE]"
                          />
                          <div className="flex-1">
                            <div className="font-bold text-gray-900">
                              {option.type}
                            </div>
                            <div className="text-sm text-gray-600">
                              {option.description}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {methods.formState.errors.isPrivate && (
                  <ErrorMsg Msg={methods.formState.errors.isPrivate?.message} />
                )}

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <IoSaveOutline className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </motion.div>
    </div>
  );
}
