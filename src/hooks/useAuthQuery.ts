import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";
interface IQuery<T> {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
  options?: UseQueryOptions<T>; // optional extra options
}
const useAuthQuery = <T>({ queryKey, url, config, options }: IQuery<T>) => {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(url, config);
      return data;
    },
    ...options,
  });
};
export default useAuthQuery;
