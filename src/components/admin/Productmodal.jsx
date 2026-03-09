import { useState } from "react";

export default function ProductModal({ product, onClose }) {

    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || "");

    function saveProduct() {

        console.log({
            name,
            price
        });

        onClose();
    }

    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

            <div className="bg-white p-6 rounded w-96">

                <h2 className="text-xl mb-4">
                    Product
                </h2>

                <input
                    className="border p-2 w-full mb-3"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Product name"
                />

                <input
                    className="border p-2 w-full mb-3"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    placeholder="Price"
                />

                <div className="flex gap-2">

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={saveProduct}
                    >
                        Save
                    </button>

                    <button
                        className="border px-4 py-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
}