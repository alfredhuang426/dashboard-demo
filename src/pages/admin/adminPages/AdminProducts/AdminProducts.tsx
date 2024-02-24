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
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product, ProductData } from "./adminProducts.type";
import { Pagination as ProductPagination } from "../../../../shared/shared.type";
import { ProductModal } from "../../adminComponents/ProductModal/ProductModal";

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProductData, setAllProductData] = useState<ProductData[]>([]);
  const [pagination, setPagination] = useState<ProductPagination>({});
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMode, setModalMode] = useState<number>(0);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleClickOpen = (
    title: string,
    mode: number = 0,
    editProduct: Product | null = null
  ) => {
    setModalTitle(title);
    setModalMode(mode); // 0 : add, 1 : edit
    setEditProduct(editProduct);
    setIsOpenModal(true);
  };

  const handleClose = (
    event?: React.FormEvent<HTMLFormElement>,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") return;
    setIsOpenModal(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    getProducts(page);
  };

  const getProducts = async (page = 1) => {
    setIsTableLoading(true);
    const productData = allProductData.filter(
      (product) => product.pagination?.current_page === page
    )?.[0];
    if (productData) {
      setProducts(productData.products || []);
      setPagination(productData.pagination || {});
    } else {
      try {
        const productsResult = await axios.get(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
        );
        setAllProductData((originalAllProductData) => [
          ...originalAllProductData,
          {
            products: productsResult.data.products,
            pagination: productsResult.data.pagination,
          },
        ]);
        setProducts(productsResult.data.products);
        setPagination(productsResult.data.pagination);
      } catch (error) {
        console.log(error);
      }
    }
    setIsTableLoading(false);
  };

  return (
    <>
      <ProductModal
        open={isOpenModal}
        modalTitle={modalTitle}
        handleClose={handleClose}
        mode={modalMode}
        editProduct={editProduct}
      />
      <Typography variant="h6" mb={2}>
        產品列表
      </Typography>
      <Divider sx={{ mb: 2 }} />
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
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            mb={2}
          >
            <Button
              variant="contained"
              onClick={() => handleClickOpen("建立新商品")}
            >
              建立新商品
            </Button>
          </Stack>
          <TableContainer sx={{ mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="products table">
              <TableHead>
                <TableRow>
                  <TableCell>分類</TableCell>
                  <TableCell align="right">名稱</TableCell>
                  <TableCell align="right">售價</TableCell>
                  <TableCell align="center">啟用狀態</TableCell>
                  <TableCell align="center" width="20%">
                    編輯
                  </TableCell>
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
                    <TableCell align="center">
                      {product?.is_enabled ? "啟用" : "未啟用"}
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={1}
                      >
                        <Button
                          variant="contained"
                          onClick={() =>
                            handleClickOpen("編輯商品", 1, product)
                          }
                        >
                          編輯
                        </Button>
                        <Button variant="outlined" color="error">
                          刪除
                        </Button>
                      </Stack>
                    </TableCell>
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
