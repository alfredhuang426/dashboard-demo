import { useEffect, useState } from "react";
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
import { Pagination as CouponPagination } from "../../../../shared/shared.type";
import axios from "axios";
import { Coupon, CouponData } from "./adminCoupons.type";

export const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [allCouponData, setAllCouponData] = useState<CouponData[]>([]);
  const [pagination, setPagination] = useState<CouponPagination>({});
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  useEffect(() => {
    getCoupons();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    getCoupons(page);
  };

  const getCoupons = async (page = 1) => {
    setIsTableLoading(true);
    const couponData = allCouponData.filter(
      (product) => product.pagination?.current_page === page
    )?.[0];
    if (couponData) {
      setCoupons(couponData.coupons || []);
      setPagination(couponData.pagination || {});
    } else {
      try {
        const couponsResult = await axios.get(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
        );
        setAllCouponData((originalAllCouponData) => [
          ...originalAllCouponData,
          {
            coupons: couponsResult.data.coupons,
            pagination: couponsResult.data.pagination,
          },
        ]);
        setCoupons(couponsResult.data.coupons);
        setPagination(couponsResult.data.pagination);
      } catch (error) {
        console.log(error);
      }
    }
    setIsTableLoading(false);
  };

  const formatDate = (date: number | undefined) => {
    if (date) {
      let d = new Date(date),
        month = ("" + (d.getMonth() + 1)).padStart(2, "0"),
        day = ("" + d.getDate()).padStart(2, "0"),
        year = d.getFullYear();

      return [year, month, day].join("-");
    } else {
      return "";
    }
  };

  return (
    <>
      <Typography variant="h6" mb={2}>
        優惠券列表
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
            <Table sx={{ minWidth: 650 }} aria-label="coupons table">
              <TableHead>
                <TableRow>
                  <TableCell>標題</TableCell>
                  <TableCell align="right">折扣</TableCell>
                  <TableCell align="right">到期日</TableCell>
                  <TableCell align="right">優惠碼</TableCell>
                  <TableCell align="right">啟用狀態</TableCell>
                  <TableCell align="right">編輯</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow
                    key={coupon?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {coupon?.title}
                    </TableCell>
                    <TableCell align="right">{coupon?.percent}%</TableCell>
                    <TableCell align="right">
                      {formatDate(coupon?.due_date)}
                    </TableCell>
                    <TableCell align="right">{coupon?.code}</TableCell>
                    <TableCell align="right">
                      {coupon?.is_enabled ? "啟用" : "未啟用"}
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
