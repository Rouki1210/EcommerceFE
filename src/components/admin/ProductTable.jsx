export default function ProductTable({ products, onEdit }) {

    return (
        <div className="bg-white rounded shadow">

            <table className="w-full">

                <thead className="bg-gray-100">
                <tr>

                    <th className="p-3">Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th></th>

                </tr>
                </thead>

                <tbody>

                {products.map(p => (

                    <tr key={p.id} className="border-t">

                        <td className="p-3">
                            <img src={p.image} className="w-12"/>
                        </td>

                        <td>{p.name}</td>

                        <td>${p.price}</td>

                        <td>{p.stock}</td>

                        <td>
                            <button
                                onClick={() => onEdit(p)}
                                className="text-blue-500"
                            >
                                Edit
                            </button>
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}