import React from "react";

function ProductTable({ products, onEdit }) {
    return (
        <table border="1" width="100%">
            <thead>
            <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            {products.map((p) => (
                <tr key={p.id}>
                    <td>{p.id}</td>

                    <td>
                        <img src={p.image} width="50" />
                    </td>

                    <td>{p.name}</td>

                    <td>${p.price}</td>

                    <td>{p.stock}</td>

                    <td>
                        <button onClick={() => onEdit(p)}>Edit</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ProductTable;