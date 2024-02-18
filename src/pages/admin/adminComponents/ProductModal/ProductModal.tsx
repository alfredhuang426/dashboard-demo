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

  const onSubmit = (data: any) => {
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
