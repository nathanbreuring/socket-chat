import React, { useState } from "react";
import { Button, Input, InputLabel } from "@material-ui/core";
import { IPayload } from "./App";

interface IProps {
  handler: any;
  chatHistory: IPayload[];
}

const Chat: React.FC<IProps> = props => {
  const [userMsg, setUserMsg] = useState("");
  const [userName, setUserName] = useState("");

  const keyPress = e => {
    if (e.key === "Enter") {
      if (userName !== "" || userMsg !== "") {
        props.handler.message(userName, userMsg);
      }
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "2em"
      }}
    >
      <InputLabel>Username</InputLabel>
      <Input
        style={{ marginTop: "1em" }}
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <InputLabel style={{ marginTop: "2em" }}>Chat</InputLabel>
      <div
        style={{
          height: 540,
          border: "2px solid black",
          marginTop: "1em"
        }}
      >
        <div style={{ padding: "1em" }}>
          {props.chatHistory.map((line: IPayload, i) => (
            <InputLabel key={`${line.userName}:${i}`}>
              {line.userName}: {line.message}
            </InputLabel>
          ))}
        </div>
      </div>
      <InputLabel style={{ marginTop: "2em" }}>Message</InputLabel>
      <Input
        style={{ marginTop: "1em" }}
        onChange={e => setUserMsg(e.target.value)}
        onKeyPress={keyPress}
        value={userMsg}
      />
      <Button
        onClick={() => {
          props.handler.message(userName, userMsg);
          setUserMsg("");
        }}
        disabled={userName === "" || userMsg === ""}
      >
        Send
      </Button>
    </main>
  );
};

export default Chat;
