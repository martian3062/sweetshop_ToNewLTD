import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useDashboardData() {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/sweets/").then((res) => {
      setInventory(res.data);

      const grouped = {};
      res.data.forEach((s) => {
        grouped[s.category] = (grouped[s.category] || 0) + s.quantity;
      });

      setCategories(
        Object.keys(grouped).map((k) => ({
          name: k,
          value: grouped[k],
        }))
      );
    });
  }, []);

  return { inventory, categories };
}
