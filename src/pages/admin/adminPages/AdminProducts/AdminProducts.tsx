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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination as ProductPagination, Product } from "./adminProducts.type";

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<ProductPagination>({});

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    getProducts(page);
  };

  const getProducts = async (page = 1) => {
    try {
      const productsResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
      );
      console.log(productsResult.data);
      setProducts(productsResult.data.products);
      setPagination(productsResult.data.pagination);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Typography variant="h6" mb={2}>
        產品列表
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <TableContainer sx={{ mb: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>分類</TableCell>
              <TableCell align="right">名稱</TableCell>
              <TableCell align="right">售價</TableCell>
              <TableCell align="right">啟用狀態</TableCell>
              <TableCell align="right">編輯</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product?.category}
                </TableCell>
                <TableCell align="right">{product?.title}</TableCell>
                <TableCell align="right">{product?.price}</TableCell>
                <TableCell align="right">
                  {product?.is_enabled ? "啟用" : "未啟用"}
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={pagination?.total_pages}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </>
  );
};
