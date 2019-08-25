import React from "react";
import { IPrivateChat, IUser } from "./interfaces";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import Chat from "./Chat";

interface IProps {
  handler: any;
  privChatPair: IPrivateChat;
  updateSelectedUser: (user: IUser | null) => void;
  open: boolean;
  selectedUser: IUser | null;
  user: IUser | null;
  updateIsPrivateChatOpen: (v: boolean) => void;
}

const PrivateChatDialog: React.FC<IProps> = props => {
  return (
    <Dialog open={props.open} onClose={props.updateIsPrivateChatOpen}>
      <DialogTitle
        onClick={() => props.updateIsPrivateChatOpen(false)}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        Private chat
        <Button
          onClick={() => {
            props.updateIsPrivateChatOpen(false);
          }}
        >
          X
        </Button>
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
          chatHistory={
            props.privChatPair ? props.privChatPair.chatHistory : []
            // [
            //   // TODO: base on prop
            //   {
            //     userName: !!props.user ? props.user.userName : "noName",
            //     message: "blah"
            //   }
            // ]
          }
          user={props.user}
          selectedUser={props.selectedUser}
        />
        <Button
          onClick={() => {
            props.updateSelectedUser(null);
            props.updateIsPrivateChatOpen(false);
          }}
        >
          CLOSE
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateChatDialog;
