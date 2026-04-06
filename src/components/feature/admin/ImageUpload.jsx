import { useEffect, useMemo, useState } from "react";

const getObjectUrl = (file) => {
  if (!(file instanceof File)) {
    return "";
  }
  return URL.createObjectURL(file);
};

export default function ImageUpload({
  id = "admin-image-upload",
  label = "Upload image",
  value,
  onChange,
  accept = "image/*",
  helperText,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (value instanceof File) {
      setSelectedFile(value);
      return;
    }
    if (!value) {
      setSelectedFile(null);
    }
  }, [value]);

  const objectPreview = useMemo(
    () => getObjectUrl(selectedFile),
    [selectedFile],
  );

  useEffect(
    () => () => {
      if (objectPreview) {
        URL.revokeObjectURL(objectPreview);
      }
    },
    [objectPreview],
  );

  const previewSrc = objectPreview || (typeof value === "string" ? value : "");

  const handleChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onChange?.(file);
  };

  return (
    <div className="space-y-2.5">
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-[1.4px] text-slate-500"
      >
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-xs text-slate-600"
      />
      {previewSrc ? (
        <img
          src={previewSrc}
          alt="Selected preview"
          className="h-24 w-24 rounded-xl border border-black/[0.08] object-cover"
        />
      ) : null}
      {helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
}
