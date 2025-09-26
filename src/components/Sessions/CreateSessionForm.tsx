import {
  Inputs,
  SelectField,
  MultiSelectField,
  Button,
  ErrorMsg,
  CookiesService,
} from "../../imports.ts";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { System, IErrorResponse } from "../../interfaces.ts";
import axiosInstance from "../../config/axios.config.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useCategories, useSystems, useTechnologies } from "../../api.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { sessionSchema } from "../../validation/index.ts";
import { InferType } from "yup";
import TinyMCEWithForm from "./../ui/RichTextEditor.tsx";
import { useQueryClient } from "@tanstack/react-query";
interface IProps {
  closeModal: () => void;
}

const CreateSessionForm = ({ closeModal }: IProps) => {
  const token = CookiesService.get("UserToken");
  const queryClient = useQueryClient();

  /*______SelectData______*/

  const { data: DataCategoryies } = useCategories();
  const { data: DataTech } = useTechnologies();
  const { data: SystemData } = useSystems();
  const systemName = SystemData?.map(
    (tech: { systemName: string }) => tech.systemName
  );
  const categoryName = DataCategoryies?.map(
    (tech: { categoryName: string }) => tech.categoryName
  );
  const technologyName = DataTech?.map(
    (tech: { technologyName: string }) => tech.technologyName
  );
  /*______onSubmit______*/
  type CreateSession = InferType<typeof sessionSchema>;

  const methods = useForm<CreateSession>({
    resolver: yupResolver(sessionSchema),
  });
  const onSubmit: SubmitHandler<CreateSession> = async (data) => {
    const formattedData = {
      ...data,
      privateSession: false,
    };
    console.log(formattedData);
    try {
      await axiosInstance.post("/sessions/", formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Session created successfully", {
        position: "top-center",
        duration: 1000,
      });
      setTimeout(() => {
        closeModal();
        queryClient.invalidateQueries({ queryKey: ["SessionData-All"] });
      }, 500);
    } catch (error) {
      const ErrorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${ErrorObj.response?.data.message}`, {
        position: "top-center",
        duration: 2000,
      });
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="SessionName"
            className="block text-sm font-medium text-gray-700"
          >
            Session Name
          </label>
          <Inputs
            id="SessionName"
            type="text"
            placeholder="Session Name"
            {...methods.register("nameSession")}
          />
          {methods.formState.errors && (
            <ErrorMsg Msg={methods.formState.errors.nameSession?.message} />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Description
          </label>
          <TinyMCEWithForm name="descriptionSession" />
        </div>

        {systemName?.length > 0 && (
          <SelectField<System>
            label="Category"
            name="system"
            options={SystemData}
            getLabel={(item) => item.systemName}
          />
        )}

        {categoryName?.length > 0 && (
          <MultiSelectField<string>
            label="Fields"
            name="categories"
            options={categoryName}
            getLabel={(item) => item}
          />
        )}
        {technologyName?.length > 0 && (
          <MultiSelectField<string>
            label="Technologies"
            name="technologies"
            options={technologyName}
            getLabel={(item) => item}
          />
        )}
        <SelectField<string>
          label="Sesseion State"
          name="privateSession"
          options={["Public Session", "Private Session"]}
          getLabel={(item) => item}
        />
        <div className="flex mt-6 gap-4">
          <Button
            className="bg-[#42D5AE] hover:bg-[#38b28d] text-white font-medium transition-colors duration-200"
            width="w-full"
            type="submit"
          >
            Create Session
          </Button>
          <Button
            className="bg-white border border-gray-300 !text-gray-600    hover:bg-gray-100 font-medium transition-colors duration-200"
            width="w-full"
            type="button"
            onClick={() => {
              closeModal();
              methods.reset();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateSessionForm;
