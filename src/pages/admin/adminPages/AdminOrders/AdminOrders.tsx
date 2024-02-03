import axios from "axios";
import { useEffect } from "react";

export const AdminOrders = () => {
  useEffect(() => {
    getOrders();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    getOrders(page);
  };

  const getOrders = async (page = 1) => {
    try {
      const ordersResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
      );
      console.log(ordersResult);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>AdminOrders</div>;
};
