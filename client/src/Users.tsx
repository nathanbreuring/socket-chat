import React from "react";
import { InputLabel, Button } from "@material-ui/core";
import { IUser } from "./interfaces";

interface IProps {
  users: IUser[];
  user: IUser | null;
  openPrivateChat: (open: boolean) => void;
  updateSelectedUser: (user: IUser) => void;
}

const Users: React.FC<IProps> = props => {
  return (
    <main style={{ width: "20%", paddingTop: "4em" }}>
      <header style={{ marginLeft: "1em" }}>
        <InputLabel>Users</InputLabel>
      </header>
      <section
        style={{
          border: "2px solid black",
          height: "540px",
          margin: "1em",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          {props.users &&
            props.users.map((u: IUser) => (
              <Button
                key={u.id}
                style={{ marginTop: "1em" }}
                onClick={() => {
                  props.updateSelectedUser(u);
                  props.openPrivateChat(true);
                }}
                disabled={
                  // User cannot start private chat with self
                  !!props.user &&
                  u.userName === props.user.userName &&
                  u.id === props.user.id
                }
              >
                {u.userName}
              </Button>
            ))}
        </div>
      </section>
    </main>
  );
};

export default Users;
