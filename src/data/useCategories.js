import { useEffect, useState } from "react";
import axios from "axios";

export function useCategories() {
        const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/categories")
            .then((res) => {
                if (res.data && res.data.success === true) {
                    console.log("API response:", res.data);
                    const name = res.data.data;
                    setCategory(name || []);
                } else {
                    console.error("Unexpected response structure:", res.data);
                }
            })
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, []);
    return category;
}