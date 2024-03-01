import { useContext } from "react";
import { MessageContext } from "../store/MessageContext";
import { Alert, AlertTitle } from "@mui/material";
import { clearMessage } from "../store/MessageReducer";

export const Message = () => {
  const { message, dispatch } = useContext(MessageContext);
  return (
    <>
      {message?.title && (
        <Alert
          severity={message?.type === "success" ? "success" : "error"}
          sx={{
            position: "absolute",
            top: "64px",
            right: "15px",
            zIndex: "1301",
          }}
          onClose={() => {
            clearMessage(dispatch);
          }}
        >
          <AlertTitle>{message?.title}</AlertTitle>
          {message?.text}
        </Alert>
      )}
    </>
  );
};
