import OrderTable from "../../components/admin/OrderTable";
import Header from "../../components/admin/Header";

const orders = [
    { id: "#ORD-8821", customer: "Nguyen Van A", product: "Nike Air Max", amount: "$240", status: "Delivered",  date: "09 Mar 2026", avatar: "N" },
    { id: "#ORD-8820", customer: "Tran Thi B",   product: "Adidas Ultra",  amount: "$180", status: "Pending",    date: "08 Mar 2026", avatar: "T" },
    { id: "#ORD-8819", customer: "Le Van C",      product: "Puma RS-X",     amount: "$150", status: "Processing", date: "08 Mar 2026", avatar: "L" },
    { id: "#ORD-8818", customer: "Pham Thi D",    product: "New Balance",   amount: "$210", status: "Delivered",  date: "07 Mar 2026", avatar: "P" },
    { id: "#ORD-8817", customer: "Hoang Van E",   product: "Converse All",  amount: "$90",  status: "Cancelled",  date: "07 Mar 2026", avatar: "H" },
    { id: "#ORD-8816", customer: "Dinh Van F",    product: "Vans Old Skool",amount: "$75",  status: "Delivered",  date: "06 Mar 2026", avatar: "D" },
];

export default function Adminorders() {
    return (
        <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
            <Header title="Orders" subtitle="Management" />
            <OrderTable orders={orders} />
        </div>
    );
}