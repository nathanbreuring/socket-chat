import React from "react";
import { IPrivateChat, IUser } from "./interfaces";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import Chat from "./Chat";

interface IProps {
  handler: any;
  chatHistory: IPrivateChat;
  updateSelectedUser: (user: IUser | null) => void;
  open: boolean;
  onClose: (v: boolean) => void;
  selectedUser: IUser | null;
  user: IUser | null;
}

const PrivateChatDialog: React.FC<IProps> = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle
        onClick={() => props.onClose(false)}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        Private chat
      </DialogTitle>
      <DialogContent
        style={{
          height: "100%",
          width: "540px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Chat
          isPrivate
          handler={props.handler}
          chatHistory={props.chatHistory ? props.chatHistory.chatHistory : []}
          user={props.user}
          selectedUser={props.selectedUser}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PrivateChatDialog;
