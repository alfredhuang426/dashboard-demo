import { Order } from "../../adminPages/AdminOrders/adminOrders.type";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";

type CouponModalProps = {
  open?: boolean;
  modalTitle?: string;
  handleClose?: () => void;
  orderData?: Order | null;
};

export const OrderModal: FC<CouponModalProps> = ({
  open = false,
  modalTitle = "",
  handleClose = () => {},
  orderData = null,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { width: "60%", minWidth: "300px" } }}
    >
      <DialogTitle>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span>{modalTitle}</span>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            Email
          </Grid>
          <Grid item xs={8}>
            {orderData?.user?.email}
          </Grid>
          <Grid item xs={4}>
            訂購者
          </Grid>
          <Grid item xs={8}>
            {orderData?.user?.name}
          </Grid>
          <Grid item xs={4}>
            地址
          </Grid>
          <Grid item xs={8}>
            {orderData?.user?.address}
          </Grid>
          <Grid item xs={4}>
            留言
          </Grid>
          <Grid item xs={8}>
            {orderData?.message}
          </Grid>
          <Grid item xs={4}>
            付款狀態
          </Grid>
          <Grid item xs={8}>
            {orderData?.is_paid ? (
              <Typography color="success.main">已付款</Typography>
            ) : (
              <Typography color="error.main">未付款</Typography>
            )}
          </Grid>
        </Grid>
        <TableContainer sx={{ mt: 3 }}>
          <Table aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ paddingLeft: "0px" }}>品項名稱</TableCell>
                <TableCell>單價</TableCell>
                <TableCell>數量</TableCell>
                <TableCell>金額</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(orderData?.products || {}).map(
                ([productId, product]) => {
                  return (
                    <TableRow key={productId}>
                      <TableCell sx={{ paddingLeft: "0px" }}>
                        {product?.product?.title}
                      </TableCell>
                      <TableCell>{product?.product?.price}</TableCell>
                      <TableCell>{product?.qty}</TableCell>
                      <TableCell>{product?.final_total}</TableCell>
                    </TableRow>
                  );
                }
              )}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" colSpan={3}>
                  總金額
                </TableCell>
                <TableCell>{orderData?.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
};
