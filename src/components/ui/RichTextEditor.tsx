import { Controller, get, useFormContext } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import ErrorMsg from "./ErrorMsg";
interface IProps {
  name: string;
}
const TinyMCEWithForm = ({ name }: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = get(errors, name)?.message as string | undefined;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              value={field.value}
              // initialValue="<p>This is the default text</p>"
              onEditorChange={(content: string) => field.onChange(content)}
              init={{
                height: 300,
                menubar: false,
                plugins: ["lists"],
                toolbar:
                  "undo redo | styleselect | bold italic underline | bullist numlist",
                content_style: `
    ul { list-style-type: disc; margin-left: 1.5rem; padding-left: 1rem; }
    ol { list-style-type: decimal; margin-left: 1.5rem; padding-left: 1rem; }
    li { margin-bottom: 0.25rem; }
  `,
              }}
            />

            {errors && <ErrorMsg Msg={errorMessage} />}
          </div>
        )}
      />
    </div>
  );
};

export default TinyMCEWithForm;
