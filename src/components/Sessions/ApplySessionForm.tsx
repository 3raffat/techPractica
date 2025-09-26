import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, CookiesService, SelectField } from "../../imports";
import TinyMCEWithForm from "./../ui/RichTextEditor";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios.config";
import { IErrorResponse } from "../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApplySchema } from "../../validation";
import { InferType } from "yup";
interface IProps {
  closeModal: () => void;
  SessionDet?: {
    SessionId: number;
    categories: string[];
  };
}

const ApplySessionForm = ({ closeModal, SessionDet }: IProps) => {
  const token = CookiesService.get("UserToken");
  type ApplySession = InferType<typeof ApplySchema>;

  const methods = useForm<ApplySession>({
    resolver: yupResolver(ApplySchema),
  });
  const sessionId = SessionDet?.SessionId;
  const onSubmit: SubmitHandler<ApplySession> = async (data) => {
    const Data = {
      ...data,
      sessionId: sessionId,
    };

    try {
      const response = await axiosInstance.put(`/sessions/request`, Data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data, { position: "top-center" });
      closeModal();
    } catch (error) {
      const ErrorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${ErrorObj.response?.data.message}`, {
        position: "top-center",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Introduction message
            </label>
            <TinyMCEWithForm name="brief" />
          </div>
          {SessionDet?.categories?.length ? (
            <SelectField<string>
              label="System"
              name="categoryName"
              options={SessionDet.categories}
              getLabel={(item) => item}
            />
          ) : (
            ""
          )}

          <div className="flex mt-6 gap-4">
            <Button
              className="bg-[#42D5AE] hover:bg-[#38b28d] text-white font-medium transition-colors duration-200 cursor-pointer"
              type="submit"
              width="w-full"
            >
              Submit
            </Button>
            <Button
              className="bg-white border border-gray-300 !text-[#022639] hover:bg-gray-50 font-medium transition-colors duration-200 cursor-pointer"
              type="button"
              width="w-full"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
export default ApplySessionForm;
