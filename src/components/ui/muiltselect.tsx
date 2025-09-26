import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Controller, get, useFormContext } from "react-hook-form";
import { RiExpandUpDownLine } from "react-icons/ri";
import ErrorMsg from "./ErrorMsg";

type MultiSelectFieldProps<T> = {
  name: string;
  label: string;
  options: T[];
  rules?: object;
  getLabel: (item: T) => string;
};
export default function MultiSelectField<T>({
  name,
  label,
  options,
  rules = {},
  getLabel,
}: MultiSelectFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = get(errors, name)?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value = [], onChange } }) => (
        <Listbox value={value} onChange={onChange} multiple>
          <Label className="block text-sm font-medium text-gray-700">
            {label}
          </Label>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm sm:text-sm min-h-[42px]">
              <span className="flex flex-wrap gap-2 items-center">
                {value.length > 0 ? (
                  value.map((item: T, idx: number) => (
                    <span
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(
                          value.filter((v: T) => getLabel(v) !== getLabel(item))
                        );
                      }}
                      className=" text-xs px-2 py-1 rounded-full bg-[#42D5AE]/10 text-[#022639] transition cursor-pointer"
                    >
                      {getLabel(item)}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Select {label}</span>
                )}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <RiExpandUpDownLine
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <ListboxOptions className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm">
              {options
                .filter(
                  (option) =>
                    !value.some((v: T) => getLabel(v) === getLabel(option))
                )
                .map((option, idx) => (
                  <ListboxOption
                    key={idx}
                    value={option}
                    className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {getLabel(option)}
                      </span>
                    )}
                  </ListboxOption>
                ))}
            </ListboxOptions>
            {errors[name] && <ErrorMsg Msg={errorMessage} />}
          </div>
        </Listbox>
      )}
    />
  );
}
