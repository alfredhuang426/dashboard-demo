import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  formLabel as productModalFormLabel,
  formKeys as productModalFormKeys,
  errorTips,
} from "./product-modal-config";
import { ProductData } from "./productModal.type";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../../adminPages/AdminProducts/adminProducts.type";

type ProductModalProps = {
  open?: boolean;
  modalTitle?: string;
  handleClose?: () => void;
  mode?: number;
  editProduct?: Product | null;
};

export const ProductModal: FC<ProductModalProps> = ({
  open = false,
  modalTitle = "",
  handleClose = () => {},
  mode = 0, // 0 : add, 1 : edit
  editProduct = null,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductData>();

  useEffect(() => {
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
    } else {
      setValue(productModalFormKeys.title, editProduct?.title || "");
      setValue(productModalFormKeys.imageUrl, editProduct?.imageUrl || "");
      setValue(productModalFormKeys.category, editProduct?.category || "");
      setValue(productModalFormKeys.unit, editProduct?.unit || "");
      setValue(productModalFormKeys.price, editProduct?.price || 0);
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
  }, [open]);

  const onSubmit = (data: ProductData) => {
    console.log(data);
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit">儲存</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
