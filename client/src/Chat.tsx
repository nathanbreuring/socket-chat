import React, { useState } from "react";
import { Button, Input, InputLabel } from "@material-ui/core";
import { IPayload, IUser } from "./interfaces";

interface IProps {
  isPrivate?: boolean;
  handler: any;
  user: IUser | null;
  selectedUser?: IUser | null;
  chatHistory?: IPayload[];
}

const Chat: React.FC<IProps> = props => {
  const [userMsg, setUserMsg] = useState("");

  const keyPress = e => {
    if (e.key === "Enter") {
      if (userMsg !== "" && props.user) {
        sendMessage();
        setUserMsg("");
      }
    }
  };

  const sendMessage = () => {
    if (props.user) {
      props.isPrivate
        ? props.handler.privateMessage({
            userPair: { user1: props.user, user2: props.selectedUser },
            user: props.user,
            userMsg
          })
        : props.handler.message(props.user.userName, userMsg);
      setUserMsg("");
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "2em",
        width: "80%"
      }}
    >
      {!props.isPrivate && (
        <InputLabel style={{ marginTop: "2em" }}>Chat</InputLabel>
      )}
      <section
        style={{
          height: 540,
          border: "2px solid black",
          marginTop: "1em",
          overflowY: "auto"
        }}
      >
        <div style={{ padding: "1em" }}>
          {props.chatHistory &&
            props.chatHistory.map((line: IPayload, i) => (
              <InputLabel key={`${line.userName}:${i}`}>
                {line.userName}: {line.message}
              </InputLabel>
            ))}
        </div>
      </section>
      <InputLabel style={{ marginTop: "2em" }}>Message</InputLabel>
      <Input
        autoFocus
        style={{ marginTop: "1em" }}
        onChange={e => setUserMsg(e.target.value)}
        onKeyPress={keyPress}
        value={userMsg}
      />
      <Button
        onClick={() => {
          sendMessage();
          setUserMsg("");
        }}
        disabled={userMsg === ""}
      >
        Send
      </Button>
    </main>
  );
};

export default Chat;
