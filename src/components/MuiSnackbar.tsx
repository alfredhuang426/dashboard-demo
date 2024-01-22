import { Snackbar, Button, Alert, AlertProps } from "@mui/material";
import { useState, forwardRef, useEffect } from "react";

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />;
  }
);

export const MuiSnackbar = ({
  loginState,
  isOpen,
  handleSnackbarClose,
}: {
  loginState: any;
  isOpen: boolean;
  handleSnackbarClose: (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarAlert onClose={handleSnackbarClose} severity="error">
          {loginState?.message}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};
