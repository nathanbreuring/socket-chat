import React, { useState } from "react";
import { Button, Input, InputLabel } from "@material-ui/core";

interface IProps {
  handler: any;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

const SignIn: React.FC<IProps> = props => {
  const [name, setName] = useState("");
  const { handler, setIsSignedIn } = props;

  const enter = () => {
    handler.enter(name);
    if (name !== "") setIsSignedIn(true);
  };

  return (
    <form style={{ padding: "8em" }} onSubmit={enter}>
      <InputLabel style={{ marginTop: "2em" }}>Username</InputLabel>
      <Input
        autoFocus
        style={{ marginTop: "1em" }}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button
        onClick={() => {
          enter();
        }}
        disabled={name === ""}
      >
        Enter chat
      </Button>
    </form>
  );
};

export default SignIn;
