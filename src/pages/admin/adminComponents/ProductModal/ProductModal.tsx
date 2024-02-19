import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  formLabel as productModalFormLabel,
  formKeys as productModalFormKeys,
  errorTips,
} from "./product-modal-config";
import { ProductData } from "./productModal.type";

type ProductModalProps = {
  open?: boolean;
  modalTitle?: string;
  handleClose?: () => void;
};

export const ProductModal: FC<ProductModalProps> = ({
  open = false,
  modalTitle = "",
  handleClose = () => {},
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductData>();

  const onSubmit = (data: ProductData) => {
    console.log(data);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: "80%" } }}
    >
      <DialogTitle>{modalTitle}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item={true} xs={6}>
              <Controller
                name={productModalFormKeys.title}
                control={control}
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue={0}
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
                defaultValue={0}
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
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={productModalFormLabel.description}
                    error={!!errors.description}
                    helperText={errors?.description?.message?.toString()}
                    variant="standard"
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
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={productModalFormLabel.content}
                    error={!!errors.content}
                    helperText={errors?.content?.message?.toString()}
                    variant="standard"
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
