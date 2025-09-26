import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Controller, get, useFormContext } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { RiExpandUpDownLine } from "react-icons/ri";
import ErrorMsg from "./ErrorMsg";

type SelectFieldProps<T> = {
  name: string;
  label: string;
  options: T[];
  getLabel: (option: T) => string;
  rules?: object;
};

export default function SelectField<T>({
  name,
  label,
  options,
  getLabel,
  rules = {},
}: SelectFieldProps<T>) {
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
      render={({ field }) => {
        const selectedOption =
          options.find((opt) => getLabel(opt) === field.value) ?? null;

        return (
          <Listbox
            value={selectedOption}
            onChange={(val: T) => {
              field.onChange(getLabel(val));
            }}
          >
            <Label className="text-sm font-medium text-gray-700">{label}</Label>

            <div className="relative mt-1">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm sm:text-sm">
                <span className="block truncate text-gray-600">
                  {selectedOption
                    ? getLabel(selectedOption)
                    : `Select ${label}`}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <RiExpandUpDownLine
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm">
                {options.map((option, idx) => (
                  <ListboxOption
                    key={idx}
                    value={option}
                    className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 hover:text-black"
                  >
                    <span className="block truncate">{getLabel(option)}</span>
                    {getLabel(option) === field.value && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-red-600">
                        <FaCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
              {errorMessage && <ErrorMsg Msg={errorMessage} />}
            </div>
          </Listbox>
        );
      }}
    />
  );
}
