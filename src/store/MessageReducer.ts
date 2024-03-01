import { Dispatch } from "react";
import { MessageAction, MessageState } from "../shared/shared.type";

export const MessageReducer = (
  state: MessageState,
  action: MessageAction
): MessageState => {
  switch (action.type) {
    case "POST_MESSAGE":
    case "CLEAR_MESSAGE":
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

export const handleSuccessMessage = (
  dispatch: Dispatch<MessageAction>,
  result: any
) => {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "success",
      title: "更新成功",
      text: result.data.message,
    },
  });
  setTimeout(() => {
    clearMessage(dispatch);
  }, 3000);
};

export const handleErrorMessage = (
  dispatch: Dispatch<MessageAction>,
  error: any
) => {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "danger",
      title: "更新失敗",
      text: Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join("，")
        : error?.response?.data?.message,
    },
  });
  setTimeout(() => {
    clearMessage(dispatch);
  }, 3000);
};

export const clearMessage = (dispatch: Dispatch<MessageAction>) => {
  dispatch({
    type: "CLEAR_MESSAGE",
    payload: {
      type: "",
      title: "",
      text: "",
    },
  });
};
