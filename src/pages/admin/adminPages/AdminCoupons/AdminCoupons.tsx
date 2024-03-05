import { useContext, useEffect, useState } from "react";
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
  Button,
  Stack,
} from "@mui/material";
import { Pagination as CouponPagination } from "../../../../shared/shared.type";
import axios from "axios";
import { Coupon, CouponData } from "./adminCoupons.type";
import { CouponModal } from "../../adminComponents/CouponModal/CouponModal";
import { DeleteModal } from "../../adminComponents/DeleteModal/DeleteModal";
import {
  handleErrorMessage,
  handleSuccessMessage,
} from "../../../../store/MessageReducer";
import { MessageContext } from "../../../../store/MessageContext";

export const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [allCouponData, setAllCouponData] = useState<CouponData[]>([]);
  const [pagination, setPagination] = useState<CouponPagination>({});
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMode, setModalMode] = useState<number>(0);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [deleteModalText, setDeleteModalText] = useState<string>("");
  const [deleteCouponId, setDeleteCouponId] = useState<string>("");

  const { dispatch } = useContext(MessageContext);

  useEffect(() => {
    getCoupons();
  }, []);

  const handleClickOpen = (
    title: string,
    mode: number = 0,
    editCoupon: Coupon | null = null
  ) => {
    setModalTitle(title);
    setModalMode(mode); // 0 : add, 1 : edit
    setEditCoupon(editCoupon);
    setIsOpenModal(true);
  };

  const handleClose = (
    event?: React.FormEvent<HTMLFormElement>,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") return;
    setIsOpenModal(false);
    setIsOpenDeleteModal(false);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    getCoupons(page);
  };

  const getCoupons = async (page = 1, resfreshDataAnyWay = false) => {
    setIsTableLoading(true);
    const couponData = allCouponData.filter(
      (product) => product.pagination?.current_page === page
    )?.[0];
    if (couponData && !resfreshDataAnyWay) {
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

  const handleDeleteModalOpen = (text: string, id: string) => {
    setIsOpenDeleteModal(true);
    setDeleteModalText(text);
    setDeleteCouponId(id);
  };

  const deleteProduct = async (id: string) => {
    try {
      const result = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
      if (result.data.success) {
        handleSuccessMessage(dispatch, result);
        setIsOpenDeleteModal(false);
        getCoupons(1, true);
      }
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
    }
  };

  return (
    <>
      <CouponModal
        open={isOpenModal}
        modalTitle={modalTitle}
        handleClose={handleClose}
        mode={modalMode}
        editCoupon={editCoupon}
        getCoupons={getCoupons}
        currentPage={pagination.current_page}
      />
      <DeleteModal
        open={isOpenDeleteModal}
        text={deleteModalText}
        id={deleteCouponId}
        handleClose={handleClose}
        handleDelete={deleteProduct}
      />
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
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            mb={2}
          >
            <Button
              variant="contained"
              onClick={() => handleClickOpen("建立新優惠券")}
            >
              建立新優惠券
            </Button>
          </Stack>
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
                    key={coupon?.id || coupon?.code}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {coupon?.title}
                    </TableCell>
                    <TableCell align="right">{coupon?.percent}%</TableCell>
                    <TableCell align="right">
                      {formatDate(coupon?.due_date as number)}
                    </TableCell>
                    <TableCell align="right">{coupon?.code}</TableCell>
                    <TableCell align="right">
                      {coupon?.is_enabled ? "啟用" : "未啟用"}
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={1}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleClickOpen("編輯商品", 1, coupon)}
                        >
                          編輯
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            handleDeleteModalOpen(
                              coupon?.title || "",
                              coupon?.id || ""
                            )
                          }
                        >
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
