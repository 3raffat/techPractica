import { CookiesService, useAuthQuery } from "./imports.ts";
import {
  IFieldsResponse,
  ISystemsResponse,
  ITechnologyResponse,
} from "./interfaces.ts";

export const token = CookiesService.get("UserToken");

//Tech
export const useTechnologies = () =>
  useAuthQuery<ITechnologyResponse>({
    queryKey: ["technologiesData"],
    url: "/admin/technologies/",
  });
//systems
export const useSystems = () =>
  useAuthQuery<ISystemsResponse>({
    queryKey: ["SystemsData"],
    url: "/admin/systems/",
  });
//Field
export const useFields = () =>
  useAuthQuery<IFieldsResponse>({
    queryKey: ["FieldsData"],
    url: "/admin/fields/",
  });
