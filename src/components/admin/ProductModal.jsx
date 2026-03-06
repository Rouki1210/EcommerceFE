import { useState } from "react";

function ProductModal({ product, onClose }) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);

    function handleSave() {
        console.log("Updated product:", name, price);
        onClose();
    }

    return (
        <div
            style={{
                position: "fixed",
                top: "30%",
                left: "40%",
                background: "white",
                padding: "20px",
                border: "1px solid #ccc",
            }}
        >
            <h2>Edit Product</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br />

            <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <br />

            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default ProductModal;