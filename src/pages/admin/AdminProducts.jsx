import { useState } from "react";
import ProductTable from "../../components/admin/ProductTable";
import ProductModal from "../../components/admin/ProductModal";

const mockProducts = [
    {
        id:1,
        name:"Nike Air",
        price:120,
        stock:10,
        image:"https://via.placeholder.com/100"
    }
];

export default function Products(){

    const [editing,setEditing] = useState(null);

    return(

        <div>

            <div className="flex justify-between mb-4">

                <h1 className="text-xl font-bold">
                    Products
                </h1>

                <button
                    onClick={()=>setEditing({})}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>

            </div>

            <ProductTable
                products={mockProducts}
                onEdit={setEditing}
            />

            {editing && (

                <ProductModal
                    product={editing}
                    onClose={()=>setEditing(null)}
                />

            )}

        </div>

    );
}