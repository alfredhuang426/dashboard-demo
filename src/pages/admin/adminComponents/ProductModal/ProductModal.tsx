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
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  formLabel as productModalFormLabel,
  formKeys as productModalFormKeys,
  errorTips,
} from "./product-modal-config";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Product } from "../../adminPages/AdminProducts/adminProducts.type";
import axios from "axios";
import { Methods } from "../../../../shared/shared.type";
import LoadingButton from "@mui/lab/LoadingButton";
import { MessageContext } from "../../../../store/MessageContext";
import {
  handleErrorMessage,
  handleSuccessMessage,
} from "../../../../store/MessageReducer";

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
  } = useForm<Product>();
  const [isLoading, setIsLoadinging] = useState<boolean>(false);
  const { dispatch } = useContext(MessageContext);
  useEffect(() => {
    if (open) {
      reset();
      if (mode === 0) {
        setValue(productModalFormKeys.title, "");
        setValue(productModalFormKeys.imageUrl, "");
        setValue(productModalFormKeys.category, "");
        setValue(productModalFormKeys.unit, "");
        setValue(productModalFormKeys.price, 0);
        setValue(productModalFormKeys.origin_price, 0);
        setValue(productModalFormKeys.description, "");
        setValue(productModalFormKeys.content, "");
        setValue(productModalFormKeys.is_enabled, 0);
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
        setValue(productModalFormKeys.is_enabled, editProduct?.is_enabled || 0);
      }
    }
  }, [open]);

  const onSubmit = async (data: Product) => {
    try {
      data.price = +data.price;
      data.origin_price = +data.origin_price;
      data.is_enabled = !!data.is_enabled ? 1 : 0;
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
      handleSuccessMessage(dispatch, result);
      setIsLoadinging(false);
      handleClose();
      // 如果是編輯，編輯完後回到原本的那頁，如果是新增，則回到第一頁
      getProducts(mode === 1 ? currentPage : 1, true);
    } catch (error) {
      console.log(error);
      setIsLoadinging(false);
      handleErrorMessage(dispatch, error);
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event?.target?.files?.[0];
      console.log(file);
      const formData = new FormData();
      formData.append("file-to-upload", file as File);
      const url = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`;
      const result = await axios.post(url, formData);
      if (result.data.success) {
        setValue(productModalFormKeys.imageUrl, result?.data?.imageUrl);
      }
    } catch (error) {
      console.log(error);
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
          <Grid item={true} xs={12} mb={2}>
            <Grid container>
              <Grid
                item={true}
                xs={3}
                sx={{ display: "flex" }}
                alignItems="flex-end"
              >
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  上傳圖片
                  <input hidden type="file" onChange={handleFileUpload} />
                </Button>
              </Grid>
              <Grid item={true} xs={9}>
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
            </Grid>
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
          <Grid item={true} xs={12}>
            <Controller
              name={productModalFormKeys.is_enabled}
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
                  label={productModalFormLabel.is_enabled}
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
