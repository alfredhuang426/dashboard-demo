import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC } from "react";

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
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent dividers>
        <TextField
          error
          id="title"
          required
          label="標題"
          helperText="Incorrect entry."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>關閉</Button>
        <Button type="submit">儲存</Button>
      </DialogActions>
    </Dialog>
  );
};
