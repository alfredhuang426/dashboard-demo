import { FC, useContext, useEffect, useState } from "react";
import { Coupon } from "../../adminPages/AdminCoupons/adminCoupons.type";
import { Controller, useForm } from "react-hook-form";
import { MessageContext } from "../../../../store/MessageContext";
import {
  formLabel as couponModalFormLabel,
  formKeys as couponModalFormKeys,
  errorTips,
} from "./coupon-modal-config";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-tw";
import axios from "axios";
import { Methods } from "../../../../shared/shared.type";
import {
  handleErrorMessage,
  handleSuccessMessage,
} from "../../../../store/MessageReducer";

type CouponModalProps = {
  open?: boolean;
  modalTitle?: string;
  handleClose?: () => void;
  mode?: number;
  editCoupon?: Coupon | null;
  getCoupons?: (page: number, resfreshDataAnyWay: boolean) => void;
  currentPage?: number;
};

export const CouponModal: FC<CouponModalProps> = ({
  open = false,
  modalTitle = "",
  handleClose = () => {},
  mode = 0, // 0 : add, 1 : edit
  editCoupon = null,
  getCoupons = (page = 1, resfreshDataAnyWay: boolean) => {},
  currentPage = 1,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Coupon>();

  const [isLoading, setIsLoadinging] = useState<boolean>(false);
  const { dispatch } = useContext(MessageContext);

  useEffect(() => {
    reset();
    if (open) {
      if (mode === 0) {
        setValue(couponModalFormKeys.title, "");
        setValue(couponModalFormKeys.percent, 0);
        setValue(couponModalFormKeys.due_date, dayjs());
        setValue(couponModalFormKeys.code, "");
        setValue(couponModalFormKeys.is_enabled, 0);
      } else if (mode === 1) {
        setValue(couponModalFormKeys.title, editCoupon?.title || "");
        setValue(couponModalFormKeys.percent, editCoupon?.percent || 0);
        setValue(
          couponModalFormKeys.due_date,
          editCoupon?.due_date ? dayjs(editCoupon?.due_date) : dayjs()
        );
        setValue(couponModalFormKeys.code, editCoupon?.code || "");
        setValue(couponModalFormKeys.is_enabled, editCoupon?.is_enabled || 0);
        setValue(couponModalFormKeys.id, editCoupon?.id || "");
      }
    }
  }, [open]);

  const onSubmit = async (data: Coupon) => {
    data.percent = +data.percent;
    data.is_enabled = !!data.is_enabled ? 1 : 0;
    data.due_date = (data.due_date as Dayjs).valueOf();
    setIsLoadinging(true);
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method: Methods = "post";
      if (mode === 1) {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${data.id}`;
        method = "put";
      }
      const result = await axios[method](api, {
        data,
      });
      if (result.data.success) {
        handleSuccessMessage(dispatch, result);
        setIsLoadinging(false);
        handleClose();
        getCoupons(mode === 1 ? currentPage : 1, true);
      } else {
        handleErrorMessage(dispatch, {
          response: {
            data: {
              message: result.data.message,
            },
          },
        });
        setIsLoadinging(false);
      }
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
      setIsLoadinging(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { width: "60%", minWidth: "300px" } }}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
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
          <Grid item={true} xs={12}>
            <Controller
              name={couponModalFormKeys.title}
              control={control}
              rules={{ required: errorTips?.title }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={couponModalFormLabel.title}
                  error={!!errors.title}
                  helperText={errors?.title?.message?.toString()}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <Controller
              name={couponModalFormKeys.percent}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={couponModalFormLabel.percent}
                  error={!!errors.percent}
                  helperText={errors?.percent?.message?.toString()}
                  variant="standard"
                  type="number"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="zh-tw"
            >
              <Controller
                control={control}
                name={couponModalFormKeys.due_date}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <DatePicker
                      label={couponModalFormLabel.due_date}
                      value={field.value}
                      inputRef={field.ref}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                    />
                  );
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item={true} xs={6}>
            <Controller
              name={couponModalFormKeys.code}
              control={control}
              rules={{ required: errorTips?.code }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={couponModalFormLabel.code}
                  error={!!errors.code}
                  helperText={errors?.code?.message?.toString()}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={12}>
            <Controller
              name={couponModalFormKeys.is_enabled}
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      onChange={onChange} // send value to hook form
                      checked={!!value}
                    />
                  }
                  label={couponModalFormLabel.is_enabled}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>關閉</Button>
        <LoadingButton type="submit" loading={isLoading}>
          儲存
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
