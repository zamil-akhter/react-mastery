import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";
import { useThemeContext } from "../context/ThemeContextProvider";

export default function RealTimeEditor({ name, control, label, defaultValue = "" }) {
  const { theme } = useThemeContext();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            key={theme}
            apiKey={config.tinymceApiKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              skin: theme === "dark" ? "oxide-dark" : "oxide",
              content_css: theme === "dark" ? "dark" : "default",
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
