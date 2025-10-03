import {
  useForm,
  useFieldArray,
  FormProvider,
  UseFormReturn,
  Controller,
} from "react-hook-form";
import Inputs from "../ui/Input";
import ErrorMsg from "../ui/ErrorMsg";
import MultiSelectField from "../ui/muiltselect";
import { IoSaveOutline, IoTrashOutline } from "react-icons/io5";
import { IErrorResponse, IField } from "../../interfaces";
import { useTechnologies } from "../../api";
import { PiPlus } from "react-icons/pi";
import axiosInstance from "../../config/axios.config";
import { PLATFORM_OPTIONS } from "../../data/data";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserProfileRequestType, userProfileSchema } from "../../validation";
import { getToken } from "../../helpers/helpers";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all text-gray-900"
                {...register("firstName")}
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
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all text-gray-900"
                {...register("lastName")}
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
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all resize-none text-gray-900"
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
                        className="w-35 px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
                    {...register(`socialAccountRequests.${index}.profileUrl`)}
                  />
                  <div>
                    {" "}
                    {methods.formState.errors.socialAccountRequests?.[index]
                      ?.profileUrl && (
                      <ErrorMsg
                        Msg={
                          methods.formState.errors.socialAccountRequests[index]
                            ?.profileUrl?.message
                        }
                      />
                    )}
                  </div>
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
                      platformName: PLATFORM_OPTIONS.find(
                        (p) =>
                          !socialAccounts.some(
                            (a) => a.platformName === p.value
                          )
                      )!.value,
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-[#42D5AE] to-[#38b28d] hover:from-[#38b28d] hover:to-[#42D5AE] text-white rounded-2xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <IoSaveOutline className="w-5 h-5" />
              Complete Profile
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserProfileForm;
