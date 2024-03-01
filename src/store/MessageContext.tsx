import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
} from "react";
import { MessageAction, MessageState } from "../shared/shared.type";
import { MessageReducer } from "./MessageReducer";

type MessageContextProviderProps = {
  children: ReactNode;
};

const messageInitState: MessageState = {
  type: "",
  title: "",
  text: "",
};

type MessageContextType = {
  message: MessageState;
  dispatch: Dispatch<MessageAction>;
};

export const MessageContext = createContext<MessageContextType>(
  {} as MessageContextType
);

export const MessageContextProvider = ({
  children,
}: MessageContextProviderProps) => {
  const [message, dispatch] = useReducer(MessageReducer, messageInitState);
  return (
    <MessageContext.Provider value={{ message, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};
