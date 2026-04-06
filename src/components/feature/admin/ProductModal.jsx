import { useEffect, useRef, useState } from "react";
import { useDismissibleLayer } from "../../../hooks/useDismissibleLayer";
import AdminForm from "./AdminForm";
import ImageUpload from "./ImageUpload";

const getInitialForm = (product) => ({
  id: product?.id,
  name: product?.name || "",
  price: product?.price ?? "",
  stock: product?.stock ?? "",
  category: product?.category || "",
  description: product?.description || "",
  image: product?.image || "",
});

export default function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(() => getInitialForm(product));
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  useDismissibleLayer({
    isOpen: true,
    onDismiss: onClose,
    closeOnEscape: true,
    closeOnOutsidePress: true,
    outsidePressRef: [panelRef],
    lockBodyScroll: true,
    initialFocusRef: closeButtonRef,
  });

  useEffect(() => {
    setForm(getInitialForm(product));
    setImageFile(null);
  }, [product]);

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleImageChange = (selectedFile) => {
    setImageFile(selectedFile || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave?.({
        ...form,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        imageFile,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div
        ref={panelRef}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-[2px] text-slate-400">
              Product
            </div>
            <h3 className="m-0 text-lg font-bold text-slate-900">
              {form.id ? "Edit Product" : "Add Product"}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close product modal"
          >
            ✕
          </button>
        </div>

        <AdminForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitLabel={form.id ? "Save Changes" : "Create Product"}
          isSubmitting={isSaving}
          className="rounded-none border-0 p-5 shadow-none"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 md:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-[1.4px] text-slate-500">
                Product name
              </label>
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-yellow-500"
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[11px] font-semibold uppercase tracking-[1.4px] text-slate-500">
                Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-yellow-500"
                placeholder="0"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[11px] font-semibold uppercase tracking-[1.4px] text-slate-500">
                Stock
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(event) => updateField("stock", event.target.value)}
                className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-yellow-500"
                placeholder="0"
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-[1.4px] text-slate-500">
                Category
              </label>
              <input
                value={form.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-yellow-500"
                placeholder="Sneakers, Running, Lifestyle..."
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-[1.4px] text-slate-500">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                rows={3}
                className="w-full resize-none rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-yellow-500"
                placeholder="Optional short description"
              />
            </div>

            <div className="md:col-span-2">
              <ImageUpload
                id="product-modal-image"
                label="Product image"
                value={imageFile || form.image}
                onChange={handleImageChange}
                helperText="PNG, JPG or WEBP. Leave unchanged to keep current image."
              />
            </div>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
