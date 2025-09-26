import { CookiesService, useAuthQuery } from "./imports.ts";
import { IFieldsResponse, ISystemsResponse } from "./interfaces.ts";

export const token = CookiesService.get("UserToken");
//Field
export const useCategories = () =>
  useAuthQuery({
    queryKey: ["CategoryData"],
    url: "/tech-skills/categories",
  });
//systems
export const useSystems = () =>
  useAuthQuery({
    queryKey: ["SystemsData"],
    url: "/admin/systems/",
  });

export const useTechnologies = () =>
  useAuthQuery({
    queryKey: ["technologiesData"],
    url: "/tech-skills/technologies",
  });

//Field
export const useCategoriesx = () =>
  useAuthQuery({
    queryKey: ["CategoryData"],
    url: "/tech-skills/categories",
  });
//systems
export const useSystemsx = () =>
  useAuthQuery<ISystemsResponse>({
    queryKey: ["SystemsData"],
    url: "/admin/systems/",
  });

export const useFieldsx = () =>
  useAuthQuery<IFieldsResponse>({
    queryKey: ["FieldsData"],
    url: "/admin/fields/",
  });
