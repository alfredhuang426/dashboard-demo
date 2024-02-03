import {
  Divider,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Order, OrderData } from "./adminOrders.type";
import { Pagination as OrderPagination } from "../../../../shared/shared.type";

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [allOrderData, setAllOrderData] = useState<OrderData[]>([]);
  const [pagination, setPagination] = useState<OrderPagination>({});
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  useEffect(() => {
    getOrders();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    getOrders(page);
  };

  const getOrders = async (page = 1) => {
    setIsTableLoading(true);
    const orderData = allOrderData.filter(
      (order) => order.pagination?.current_page === page
    )?.[0];
    if (orderData) {
      setOrders(orderData.orders || []);
      setPagination(orderData.pagination || {});
    } else {
      try {
        const ordersResult = await axios.get(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
        );
        setAllOrderData((originalAllOrderData) => [
          ...originalAllOrderData,
          {
            orders: ordersResult.data.orders,
            pagination: ordersResult.data.pagination,
          },
        ]);
        setOrders(ordersResult.data.orders);
        setPagination(ordersResult.data.pagination);
      } catch (error) {
        console.log(error);
      }
    }
    setIsTableLoading(false);
  };

  return (
    <>
      <Typography variant="h6" mb={2}>
        訂單列表
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {isTableLoading ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <TableContainer sx={{ mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell>訂單 id</TableCell>
                  <TableCell>購買用戶</TableCell>
                  <TableCell align="right">訂單金額</TableCell>
                  <TableCell align="right">付款狀態</TableCell>
                  <TableCell align="right">留言訊息</TableCell>
                  <TableCell align="right">編輯</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order?.id}
                    </TableCell>
                    <TableCell align="right">{order?.user?.name}</TableCell>
                    <TableCell align="right">${order.total}</TableCell>
                    <TableCell align="right">
                      {order.is_paid ? (
                        <Typography color="success.main">已付款</Typography>
                      ) : (
                        <Typography color="warning.main">未付款</Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">{order.message}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center">
            <Pagination
              count={pagination?.total_pages}
              page={pagination?.current_page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Box>
        </>
      )}
    </>
  );
};
