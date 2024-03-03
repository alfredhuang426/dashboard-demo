import { FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

type DeleteModalProps = {
  open?: boolean;
  text?: string;
  id?: string;
  handleClose?: () => void;
  handleDelete?: (id: string) => void;
};

export const DeleteModal: FC<DeleteModalProps> = ({
  open = false,
  text = "",
  id = "",
  handleClose = () => {},
  handleDelete = (id: string) => {},
}) => {
  const [isLoading, setIsLoadinging] = useState<boolean>(false);
  const submit = async (id: string) => {
    setIsLoadinging(true);
    await handleDelete(id);
    setIsLoadinging(false);
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
          <span>刪除確認</span>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>刪除 {text}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <LoadingButton onClick={() => submit(id)} loading={isLoading}>
          確認刪除
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
