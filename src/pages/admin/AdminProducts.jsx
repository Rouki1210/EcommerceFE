import { useState } from "react";
import ProductTable from "../../components/admin/ProductTable";
import ProductModal from "../../components/admin/ProductModal";

const mockProducts = [
    {
        id: 1,
        name: "Nike Air",
        price: 120,
        stock: 10,
        image: "https://via.placeholder.com/50",
    },
    {
        id: 2,
        name: "Adidas Boost",
        price: 150,
        stock: 8,
        image: "https://via.placeholder.com/50",
    },
];

function AdminProducts() {
    const [products] = useState(mockProducts);

    const [editing, setEditing] = useState(null);

    return (
        <div>
            <h2>Products</h2>

            <ProductTable
                products={products}
                onEdit={(p) => setEditing(p)}
            />

            {editing && (
                <ProductModal
                    product={editing}
                    onClose={() => setEditing(null)}
                />
            )}
        </div>
    );
}

export default AdminProducts;