import React, { useState } from "react";
import { Button, Input, InputLabel } from "@material-ui/core";

interface IProps {
  handler: any;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

const SignIn: React.FC<IProps> = props => {
  const [name, setName] = useState("");
  const { handler, setIsSignedIn } = props;
  return (
    <div style={{ padding: "8em" }}>
      <InputLabel style={{ marginTop: "2em" }}>Username</InputLabel>
      <Input
        style={{ marginTop: "1em" }}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button
        onClick={() => {
          handler.enter(name);
          setIsSignedIn(true);
        }}
        disabled={name === ""}
      >
        Enter chat
      </Button>
    </div>
  );
};

export default SignIn;
