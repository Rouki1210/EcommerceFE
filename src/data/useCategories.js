import { useEffect, useState } from "react";
import axios from "axios";

export function useCategories() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => {
        // Nếu backend trả thẳng array:
        if (Array.isArray(res.data)) {
          setCategory(res.data);
        } else if (res.data?.success === true) {
          setCategory(res.data.data || []);
        } else {
          console.error("Unexpected response structure:", res.data);
        }
        /*if (res.data && res.data.success === true) {
                    console.log("API response:", res.data);
                    const name = res.data.data;
                    setCategory(name || []);
                } else {
                    console.error("Unexpected response structure:", res.data);
                }*/
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);
  return category;
}
