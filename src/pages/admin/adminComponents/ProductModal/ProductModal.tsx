import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  formLabel as productModalFormLabel,
  formKeys as productModalFormKeys,
  errorTips,
} from "./product-modal-config";
import { ProductData } from "./productModal.type";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../../adminPages/AdminProducts/adminProducts.type";
import axios from "axios";
import { Methods } from "../../../../shared/shared.type";
import LoadingButton from "@mui/lab/LoadingButton";

type ProductModalProps = {
  open?: boolean;
  modalTitle?: string;
  handleClose?: () => void;
  mode?: number;
  editProduct?: Product | null;
  getProducts?: (page: number, resfreshDataAnyWay: boolean) => void;
  currentPage?: number;
};

export const ProductModal: FC<ProductModalProps> = ({
  open = false,
  modalTitle = "",
  handleClose = () => {},
  mode = 0, // 0 : add, 1 : edit
  editProduct = null,
  getProducts = (page: number, resfreshDataAnyWay: boolean) => {},
  currentPage = 1,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductData>();
  const [isLoading, setIsLoadinging] = useState<boolean>(false);
  useEffect(() => {
    reset();
    if (open) {
      if (mode === 0) {
        setValue(productModalFormKeys.title, "");
        setValue(productModalFormKeys.imageUrl, "");
        setValue(productModalFormKeys.category, "");
        setValue(productModalFormKeys.unit, "");
        setValue(productModalFormKeys.price, 0);
        setValue(productModalFormKeys.origin_price, 0);
        setValue(productModalFormKeys.description, "");
        setValue(productModalFormKeys.content, "");
      } else if (mode === 1) {
        setValue(productModalFormKeys.title, editProduct?.title || "");
        setValue(productModalFormKeys.imageUrl, editProduct?.imageUrl || "");
        setValue(productModalFormKeys.category, editProduct?.category || "");
        setValue(productModalFormKeys.unit, editProduct?.unit || "");
        setValue(productModalFormKeys.price, editProduct?.price || 0);
        setValue(productModalFormKeys.id, editProduct?.id || "");
        setValue(
          productModalFormKeys.origin_price,
          editProduct?.origin_price || 0
        );
        setValue(
          productModalFormKeys.description,
          editProduct?.description || ""
        );
        setValue(productModalFormKeys.content, editProduct?.content || "");
      }
    }
  }, [open]);

  const onSubmit = async (data: ProductData) => {
    try {
      data.price = +data.price;
      data.origin_price = +data.origin_price;
      setIsLoadinging(true);
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method: Methods = "post";
      if (mode === 1) {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${data.id}`;
        method = "put";
      }
      const result = await axios[method](api, {
        data,
      });
      setIsLoadinging(false);
      handleClose();
      // 如果是編輯，編輯完後回到原本的那頁，如果是新增，則回到第一頁
      getProducts(mode === 1 ? currentPage : 1, true);
    } catch (error) {
      console.log(error);
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
          <Grid item={true} xs={6}>
            <Controller
              name={productModalFormKeys.title}
              control={control}
              rules={{ required: errorTips?.title }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={productModalFormLabel.title}
                  error={!!errors.title}
                  helperText={errors?.title?.message?.toString()}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <Controller
              name={productModalFormKeys.imageUrl}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={productModalFormLabel.imageUrl}
                  error={!!errors.imageUrl}
                  helperText={errors?.imageUrl?.message?.toString()}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <Controller
              name={productModalFormKeys.category}
              control={control}
              rules={{ required: errorTips?.category }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={productModalFormLabel.category}
                  error={!!errors.category}
                  helperText={errors?.category?.message?.toString()}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <Controller
              name={productModalFormKeys.unit}
              control={control}
              rules={{ required: errorTips?.unit }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={productModalFormLabel.unit}
                  error={!!errors.unit}
                  helperText={errors?.unit?.message?.toString()}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <Controller
              name={productModalFormKeys.origin_price}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={productModalFormLabel.origin_price}
                  error={!!errors.origin_price}
                  helperText={errors?.origin_price?.message?.toString()}
                  variant="standard"
                  type="number"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <Controller
              name={productModalFormKeys.price}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={productModalFormLabel.price}
                  error={!!errors.price}
                  helperText={errors?.price?.message?.toString()}
                  variant="standard"
                  type="number"
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={12}>
            <Controller
              name={productModalFormKeys.description}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={productModalFormLabel.description}
                  error={!!errors.description}
                  helperText={errors?.description?.message?.toString()}
                  multiline
                  rows={3}
                />
              )}
            />
          </Grid>
          <Grid item={true} xs={12}>
            <Controller
              name={productModalFormKeys.content}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={productModalFormLabel.content}
                  error={!!errors.content}
                  helperText={errors?.content?.message?.toString()}
                  multiline
                  rows={3}
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
