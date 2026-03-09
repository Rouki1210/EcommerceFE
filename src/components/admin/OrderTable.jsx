function OrderTable({ orders }) {

    return (
        <table>

            <thead>
            <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
            </thead>

            <tbody>

            {orders.map(order => (

                <tr key={order.id}>

                    <td>{order.id}</td>

                    <td>{order.user}</td>

                    <td>${order.total}</td>

                    <td>{order.status}</td>

                </tr>

            ))}

            </tbody>

        </table>
    )

}

export default OrderTable